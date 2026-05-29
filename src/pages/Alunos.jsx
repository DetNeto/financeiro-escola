import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import AlunosCards from "../components/alunos/AlunosCards";

import AlunosTable from "../components/alunos/AlunosTable";

import AlunosModal from "../components/alunos/AlunosModal";

import {
  calculateAge,
} from "../utils/dateUtils";

import {

  loadStudents,

  createStudent,

  updateStudent,

  deleteStudent,

  toggleStudentStatus,

} from "../services/alunosService";

export default function Alunos() {

  const TURMAS_KEY =
    "erp-escolar-turmas";

  const RESPONSAVEIS_KEY =
    "erp-escolar-responsaveis";

  const initialFormData = {

    nome: "",

    etapa: "Berçário I",

    turma: "",

    novaTurma: "",

    responsavelPrincipalId: "",

    responsavelSecundarioId: "",

    ddi: "+55",

    ddd: "",

    telefone: "",

    nascimento: "",

    turno: "Integral",

    status: "Ativo",
  };

  const [editingStudentId, setEditingStudentId] =
    useState(null);

  const [
    responsaveisDisponiveis,
    setResponsaveisDisponiveis,
  ] = useState([]);

  const [
    turmasDisponiveis,
    setTurmasDisponiveis,
  ] = useState(() => {

    const savedTurmas =
      localStorage.getItem(
        TURMAS_KEY
      );

    return savedTurmas

      ? JSON.parse(savedTurmas)

      : [

          "Turma do Sol",

          "Turma Arco-Íris",

          "Turma da Floresta",
        ];
  });

  const [students, setStudents] =
    useState(() =>
      loadStudents()
    );

  const [formData, setFormData] =
    useState(initialFormData);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadResponsaveis();

    function handleStorageChange(
      event
    ) {

      if (
        event.key ===
        RESPONSAVEIS_KEY
      ) {

        loadResponsaveis();
      }
    }

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };

  }, []);

  useEffect(() => {

    localStorage.setItem(
      TURMAS_KEY,
      JSON.stringify(
        turmasDisponiveis
      )
    );

  }, [turmasDisponiveis]);

  function loadResponsaveis() {

    const savedResponsaveis =
      localStorage.getItem(
        RESPONSAVEIS_KEY
      );

    if (!savedResponsaveis) {

      setResponsaveisDisponiveis(
        []
      );

      return;
    }

    setResponsaveisDisponiveis(
      JSON.parse(
        savedResponsaveis
      )
    );
  }

  function handleChange(
    field,
    value
  ) {

    setFormData(
      (prev) => ({

        ...prev,

        [field]: value,
      })
    );
  }

  const filteredStudents =
    useMemo(() => {

      return students.filter(
        (student) => {

          return (

            student.nome
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            student
              .responsavelPrincipalNome
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            student
              .responsavelSecundarioNome
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            student.turma
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            student.etapa
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }
      );

    }, [
      students,
      search,
    ]);

  function resetForm() {

    setEditingStudentId(null);

    setFormData(
      initialFormData
    );
  }

  function openNewStudentModal() {

    loadResponsaveis();

    resetForm();

    setIsModalOpen(true);
  }

  function handleEditStudent(student) {

    loadResponsaveis();

    setEditingStudentId(
      student.id
    );

    setFormData({

      nome:
        student.nome || "",

      etapa:
        student.etapa || "",

      turma:
        student.turma || "",

      novaTurma: "",

      responsavelPrincipalId:
        student.responsavelPrincipalId || "",

      responsavelSecundarioId:
        student.responsavelSecundarioId || "",

      ddi:
        student.ddi || "+55",

      ddd:
        student.ddd || "",

      telefone:
        student.telefone || "",

      nascimento:
        student.nascimento || "",

      turno:
        student.turno || "Integral",

      status:
        student.status || "Ativo",
    });

    setIsModalOpen(true);
  }

  function handleAddTurma() {

    if (!formData.novaTurma) {
      return;
    }

    const alreadyExists =
      turmasDisponiveis.some(
        (item) =>

          item.toLowerCase() ===
          formData.novaTurma.toLowerCase()
      );

    if (alreadyExists) {

      alert(
        "Esta turma já existe."
      );

      return;
    }

    setTurmasDisponiveis(
      (prev) => [
        ...prev,
        formData.novaTurma,
      ]
    );

    handleChange(
      "turma",
      formData.novaTurma
    );

    handleChange(
      "novaTurma",
      ""
    );
  }

  function handleRemoveTurma(turmaNome) {

    const hasStudents =
      students.some(
        (student) =>
          student.turma === turmaNome
      );

    if (hasStudents) {

      alert(
        "Não é possível remover uma turma com alunos vinculados."
      );

      return;
    }

    setTurmasDisponiveis(
      (prev) =>
        prev.filter(
          (item) =>
            item !== turmaNome
        )
    );

    if (
      formData.turma === turmaNome
    ) {

      handleChange(
        "turma",
        ""
      );
    }
  }

  function handleRemoveStudent(
    id,
    nomeAluno
  ) {

    const confirmDelete =
      window.confirm(
        `Deseja realmente remover o aluno ${nomeAluno}?`
      );

    if (!confirmDelete) {
      return;
    }

    const updatedStudents =
      deleteStudent(id);

    setStudents(
      updatedStudents
    );
  }

  function handleToggleStatus(id) {

    const updatedStudents =
      toggleStudentStatus(id);

    setStudents(
      updatedStudents
    );
  }

  function validateForm() {

    if (!formData.nome) {

      return "Informe o nome do aluno.";
    }

    if (!formData.nascimento) {

      return "Informe a data de nascimento.";
    }

    if (
      !formData.responsavelPrincipalId
    ) {

      return "Selecione um responsável principal.";
    }

    return null;
  }

  function handleSubmit(e) {

    e.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {

      alert(
        validationError
      );

      return;
    }

    const responsavelPrincipal =
      responsaveisDisponiveis.find(
        (item) =>
          item.id ===
          formData.responsavelPrincipalId
      );

    const responsavelSecundario =
      responsaveisDisponiveis.find(
        (item) =>
          item.id ===
          formData.responsavelSecundarioId
      );

    const studentData = {

      id:
        editingStudentId,

      ...formData,

      responsavelPrincipalNome:
        responsavelPrincipal?.nome || "",

      responsavelSecundarioNome:
        responsavelSecundario?.nome || "",
    };

    let updatedStudents = [];

    if (editingStudentId) {

      updatedStudents =
        updateStudent(
          studentData
        );

    } else {

      updatedStudents =
        createStudent(
          studentData
        );
    }

    setStudents(
      updatedStudents
    );

    resetForm();

    setIsModalOpen(false);
  }

  return (

    <div className="
      space-y-8
      text-white
    ">

      <div className="
        flex
        justify-between
        items-center
      ">

        <div>

          <h1 className="
            text-5xl
            font-black
          ">

            Alunos

          </h1>

          <p className="
            text-zinc-400
            mt-2
            text-lg
          ">

            Gestão de alunos e responsáveis da instituição.

          </p>

        </div>

        <button
          onClick={
            openNewStudentModal
          }
          className="
            flex items-center gap-3

            bg-blue-600
            hover:bg-blue-500

            transition

            px-6 py-4

            rounded-2xl

            font-bold
          "
        >

          <Plus size={20} />

          Adicionar Aluno

        </button>

      </div>

      <AlunosCards
        students={students}
      />

      <AlunosTable

        search={search}

        setSearch={setSearch}

        filteredStudents={
          filteredStudents
        }

        calculateAge={
          calculateAge
        }

        toggleStatus={
          handleToggleStatus
        }

        handleRemoveStudent={
          handleRemoveStudent
        }

        handleEditStudent={
          handleEditStudent
        }
      />

      <AlunosModal

        isModalOpen={
          isModalOpen
        }

        setIsModalOpen={
          setIsModalOpen
        }

        formData={formData}

        handleChange={
          handleChange
        }

        turmasDisponiveis={
          turmasDisponiveis
        }

        handleAddTurma={
          handleAddTurma
        }

        handleRemoveTurma={
          handleRemoveTurma
        }

        responsaveisDisponiveis={
          responsaveisDisponiveis
        }

        handleSubmit={
          handleSubmit
        }
      />

    </div>
  );
}