import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import AlunosCards from "../components/alunos/AlunosCards";

import AlunosTable from "../components/alunos/AlunosTable";

import AlunosModal from "../components/alunos/AlunosModal";

export default function Alunos() {

  const [responsaveisDisponiveis] =
    useState([

      {
        id: crypto.randomUUID(),
        nome: "Mariana Silva",
      },

      {
        id: crypto.randomUUID(),
        nome: "Carlos Souza",
      },

      {
        id: crypto.randomUUID(),
        nome: "Ana Oliveira",
      },
    ]);

  const [
    turmasDisponiveis,
    setTurmasDisponiveis,
  ] = useState([

    "Turma do Sol",

    "Turma Arco-Íris",

    "Turma da Floresta",
  ]);

  const [students, setStudents] =
    useState([
      {
        id:
          crypto.randomUUID(),

        nome:
          "João Pedro",

        etapa:
          "Berçário I",

        turma:
          "Turma do Sol",

        responsavelPrincipalId:
          responsaveisDisponiveis[0].id,

        responsavelPrincipalNome:
          "Mariana Silva",

        responsavelSecundarioId:
          responsaveisDisponiveis[1].id,

        responsavelSecundarioNome:
          "Carlos Souza",

        ddi:
          "+55",

        ddd:
          "55",

        telefone:
          "99999-9999",

        nascimento:
          "2022-03-10",

        turno:
          "Integral",

        status:
          "Ativo",
      },
    ]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [nome, setNome] =
    useState("");

  const [etapa, setEtapa] =
    useState("Berçário I");

  const [turma, setTurma] =
    useState("");

  const [novaTurma, setNovaTurma] =
    useState("");

  const [
    responsavelPrincipalId,
    setResponsavelPrincipalId,
  ] = useState("");

  const [
    responsavelSecundarioId,
    setResponsavelSecundarioId,
  ] = useState("");

  const [ddi, setDdi] =
    useState("+55");

  const [ddd, setDdd] =
    useState("");

  const [telefone, setTelefone] =
    useState("");

  const [nascimento, setNascimento] =
    useState("");

  const [turno, setTurno] =
    useState("Integral");

  const [status, setStatus] =
    useState("Ativo");

  const [search, setSearch] =
    useState("");

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

  function calculateAge(date) {

    if (!date) {
      return "-";
    }

    const today =
      new Date();

    const birthDate =
      new Date(date);

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDiff =
      today.getMonth() -
      birthDate.getMonth();

    if (

      monthDiff < 0 ||

      (
        monthDiff === 0 &&
        today.getDate() <
          birthDate.getDate()
      )
    ) {

      age--;
    }

    return `${age} anos`;
  }

  function resetForm() {

    setNome("");

    setEtapa("Berçário I");

    setTurma("");

    setNovaTurma("");

    setResponsavelPrincipalId("");

    setResponsavelSecundarioId("");

    setDdi("+55");

    setDdd("");

    setTelefone("");

    setNascimento("");

    setTurno("Integral");

    setStatus("Ativo");
  }

  function handleAddTurma() {

    if (!novaTurma) {
      return;
    }

    const alreadyExists =
      turmasDisponiveis.some(
        (item) =>

          item.toLowerCase() ===
          novaTurma.toLowerCase()
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
        novaTurma,
      ]
    );

    setTurma(novaTurma);

    setNovaTurma("");
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

    if (turma === turmaNome) {
      setTurma("");
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

    setStudents(
      (prev) =>
        prev.filter(
          (student) =>
            student.id !== id
        )
    );
  }

  function toggleStatus(id) {

    setStudents(
      (prev) =>

        prev.map(
          (student) => {

            if (
              student.id !== id
            ) {

              return student;
            }

            return {

              ...student,

              status:
                student.status ===
                "Ativo"

                  ? "Inativo"

                  : "Ativo",
            };
          }
        )
    );
  }

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !nome ||
      !etapa ||
      !turma ||
      !responsavelPrincipalId ||
      !ddi ||
      !ddd ||
      !telefone ||
      !nascimento
    ) {

      alert(
        "Preencha todos os campos."
      );

      return;
    }

    const responsavelPrincipal =
      responsaveisDisponiveis.find(
        (item) =>
          item.id ===
          responsavelPrincipalId
      );

    const responsavelSecundario =
      responsaveisDisponiveis.find(
        (item) =>
          item.id ===
          responsavelSecundarioId
      );

    const newStudent = {

      id:
        crypto.randomUUID(),

      nome,

      etapa,

      turma,

      responsavelPrincipalId,

      responsavelPrincipalNome:
        responsavelPrincipal?.nome || "",

      responsavelSecundarioId,

      responsavelSecundarioNome:
        responsavelSecundario?.nome || "",

      ddi,

      ddd,

      telefone,

      nascimento,

      turno,

      status,
    };

    setStudents(
      (prev) => [
        ...prev,
        newStudent,
      ]
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
          onClick={() =>
            setIsModalOpen(true)
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
          toggleStatus
        }

        handleRemoveStudent={
          handleRemoveStudent
        }
      />

      <AlunosModal

        isModalOpen={
          isModalOpen
        }

        setIsModalOpen={
          setIsModalOpen
        }

        nome={nome}

        setNome={setNome}

        etapa={etapa}

        setEtapa={setEtapa}

        turma={turma}

        setTurma={setTurma}

        novaTurma={novaTurma}

        setNovaTurma={
          setNovaTurma
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

        responsavelPrincipalId={
          responsavelPrincipalId
        }

        setResponsavelPrincipalId={
          setResponsavelPrincipalId
        }

        responsavelSecundarioId={
          responsavelSecundarioId
        }

        setResponsavelSecundarioId={
          setResponsavelSecundarioId
        }

        responsaveisDisponiveis={
          responsaveisDisponiveis
        }

        ddi={ddi}

        setDdi={setDdi}

        ddd={ddd}

        setDdd={setDdd}

        telefone={telefone}

        setTelefone={setTelefone}

        nascimento={nascimento}

        setNascimento={
          setNascimento
        }

        turno={turno}

        setTurno={setTurno}

        status={status}

        setStatus={setStatus}

        handleSubmit={
          handleSubmit
        }
      />

    </div>
  );
}