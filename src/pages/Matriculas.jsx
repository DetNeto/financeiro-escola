import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import {
  useFinance,
} from "../context/FinanceContext";

import {
  loadStudents,
} from "../services/alunosService";

import {
  loadResponsaveis,
} from "../services/responsaveisService";

import {
  loadMatriculas,
  createMatricula,
  deleteMatricula,
  toggleMatriculaStatus,
} from "../services/matriculasService";

export default function Matriculas() {

  const {
    setContas,
  } = useFinance();

  const [
    matriculas,
    setMatriculas,
  ] = useState(() =>
    loadMatriculas()
  );

  const [students] =
    useState(() =>
      loadStudents()
    );

  const [responsaveis] =
    useState(() =>
      loadResponsaveis()
    );

  const [search, setSearch] =
    useState("");

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const initialFormData = {

  alunoId: "",

  responsavelFinanceiroId:
    "",

  responsavelContratualId:
    "",

  anoLetivo: "2026",

  tipoMatricula:
    "Nova",

  etapa: "",

  turma: "",

  turno: "Integral",

  valorMensalidade: "",

  percentualBolsa: "",

  valorDesconto: "",

  diaVencimento: "10",

  dataInicio:
    new Date()
      .toISOString()
      .split("T")[0],

  dataFim: "",

  observacoes: "",

  status: "Ativa",
};

  const [formData, setFormData] =
    useState(initialFormData);

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

  const filteredMatriculas =
    useMemo(() => {

      return matriculas.filter(
        (matricula) => {

          return (

            matricula.alunoNome
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            matricula
              .responsavelFinanceiroNome
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }
      );

    }, [
      matriculas,
      search,
    ]);

  function resetForm() {

    setFormData(
      initialFormData
    );
  }

  function generateMonthlyRevenue(
  matriculaData
) {

  const startDate =
  new Date(
    matriculaData.dataInicio
  );

const endDate =
  matriculaData.dataFim

    ? new Date(
        matriculaData.dataFim
      )

    : new Date(
        startDate.getFullYear(),
        11,
        31
      );

const startYear =
  startDate.getFullYear();

const startMonth =
  startDate.getMonth();

const endYear =
  endDate.getFullYear();

const endMonth =
  endDate.getMonth();
  const generatedRevenues =
    [];

  const mensalidadeBase =
    Number(
      matriculaData
        .valorMensalidade
    ) || 0;

  const bolsa =
    Number(
      matriculaData
        .percentualBolsa
    ) || 0;

  const desconto =
    Number(
      matriculaData
        .valorDesconto
    ) || 0;

  const valorComBolsa =
    mensalidadeBase -

    (
      mensalidadeBase *
      bolsa
    ) / 100;

  const valorFinal =
    valorComBolsa -
    desconto;

for (

  let year =
    startYear;

  year <= endYear;

  year++

) {

  const initialMonth =

    year === startYear

      ? startMonth

      : 0;

  const finalMonth =

    year === endYear

      ? endMonth

      : 11;

  for (

    let month =
      initialMonth;

    month <= finalMonth;

    month++

  ) {

    const dueDate =
      new Date(
        year,
        month,
        Number(
          matriculaData
            .diaVencimento
        )
      );

    generatedRevenues.push({

      id:
        crypto.randomUUID(),

      description:
        `Mensalidade ${month + 1}/${year} - ${matriculaData.alunoNome}`,

      category:
        "Mensalidades",

      dueDate:
        dueDate.toISOString(),

      value:
        Number(
          valorFinal
            .toFixed(2)
        ),

      type:
        "Receita",

      priority:
        "Média",

      status:
        "Pendente",

      isRecurring:
        true,

      recurrenceType:
        "Mensal",

      source:
        "Matricula",

      matriculaId:
        matriculaData.id,

      alunoId:
        matriculaData.alunoId,

      responsavelFinanceiroId:
        matriculaData
          .responsavelFinanceiroId,

      createdAt:
        new Date().toISOString(),
    });
  }
  }

  setContas((prev) => [

    ...prev,

    ...generatedRevenues,
  ]);
}

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !formData.alunoId ||
      !formData
        .responsavelFinanceiroId
    ) {

      alert(
        "Selecione aluno e responsável financeiro."
      );

      return;
    }

    const aluno =
      students.find(
        (student) =>
          student.id ===
          formData.alunoId
      );

    const responsavel =
      responsaveis.find(
        (
          responsavel
        ) =>

          responsavel.id ===
          formData
            .responsavelFinanceiroId
      );

    const matriculaData = {

      ...formData,

      alunoNome:
        aluno?.nome || "",

      responsavelFinanceiroNome:
        responsavel?.nome || "",
    };

    const updatedMatriculas =
      createMatricula(
        matriculaData
      );

    const createdMatricula =
      updatedMatriculas[
        updatedMatriculas.length - 1
      ];

    generateMonthlyRevenue(
      createdMatricula
    );

    setMatriculas(
      updatedMatriculas
    );

    resetForm();

    setIsModalOpen(false);
  }

  function handleRemoveMatricula(
    id,
    alunoNome
  ) {

    const confirmDelete =
      window.confirm(
        `Deseja remover a matrícula de ${alunoNome}?`
      );

    if (!confirmDelete) {
      return;
    }

    const updatedMatriculas =
      deleteMatricula(id);

    setMatriculas(
      updatedMatriculas
    );
  }

  function handleToggleStatus(id) {

    const updatedMatriculas =
      toggleMatriculaStatus(
        id
      );

    setMatriculas(
      updatedMatriculas
    );
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

            Matrículas

          </h1>

          <p className="
            text-zinc-400
            mt-2
            text-lg
          ">

            Gestão institucional de vínculos acadêmicos e financeiros.

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

          Nova Matrícula

        </button>

      </div>

      <div className="
        bg-zinc-900

        border border-zinc-800

        rounded-3xl

        p-6
      ">

        <input
          type="text"
          placeholder="Pesquisar matrícula..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full

            bg-zinc-950

            border border-zinc-800

            rounded-2xl

            px-4 py-3

            outline-none

            focus:border-blue-500
          "
        />

      </div>

      <div className="
        bg-zinc-900

        border border-zinc-800

        rounded-3xl

        overflow-hidden
      ">

        <table className="
          w-full
        ">

          <thead className="
            bg-zinc-950
          ">

            <tr>

              <th className="text-left p-4">
                Código
              </th>

              <th className="text-left p-4">
                Aluno
              </th>

              <th className="text-left p-4">
                Responsável Financeiro
              </th>

              <th className="text-left p-4">
                Turma
              </th>

              <th className="text-left p-4">
                Mensalidade
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-right p-4">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredMatriculas.map(
                (
                  matricula
                ) => (

                  <tr
                    key={
                      matricula.id
                    }
                    className="
                      border-t
                      border-zinc-800
                    "
                  >

                    <td className="p-4">
                      {
                        matricula.codigo
                      }
                    </td>

                    <td className="p-4">
                      {
                        matricula.alunoNome
                      }
                    </td>

                    <td className="p-4">
                      {
                        matricula
                          .responsavelFinanceiroNome
                      }
                    </td>

                    <td className="p-4">
                      {
                        matricula.turma
                      }
                    </td>

                    <td className="p-4">
                      R$ {
                        Number(
                          matricula.valorMensalidade
                        ).toFixed(2)
                      }
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleToggleStatus(
                            matricula.id
                          )
                        }
                        className={`
                          px-3
                          py-1

                          rounded-full

                          text-sm
                          font-bold

                          ${
                            matricula.status ===
                            "Ativa"

                              ? "bg-emerald-500/20 text-emerald-400"

                              : "bg-red-500/20 text-red-400"
                          }
                        `}
                      >

                        {
                          matricula.status
                        }

                      </button>

                    </td>

                    <td className="
                      p-4
                      text-right
                    ">

                      <button
                        onClick={() =>
                          handleRemoveMatricula(
                            matricula.id,
                            matricula.alunoNome
                          )
                        }
                        className="
                          text-red-400
                          hover:text-red-300
                        "
                      >

                        Remover

                      </button>

                    </td>

                  </tr>
                )
              )
            }

          </tbody>

        </table>

      </div>

      {
        isModalOpen && (

          <div className="
            fixed inset-0

            bg-black/70

            backdrop-blur-sm

            flex
            items-center
            justify-center

            z-50

            p-4
          ">

                <div className="
            bg-zinc-900

            border border-zinc-800

            rounded-3xl

            w-full
            max-w-4xl

            max-h-[90vh]

            overflow-y-auto

            p-8
            ">

              <div className="
                flex
                items-center
                justify-between

                mb-8
              ">

                <div>

                  <h2 className="
                    text-3xl
                    font-black
                  ">

                    Nova Matrícula

                  </h2>

                  <p className="
                    text-zinc-400
                    mt-1
                  ">

                    Vínculo acadêmico e financeiro do aluno.

                  </p>

                </div>

                <button
                  onClick={() =>
                    setIsModalOpen(
                      false
                    )
                  }
                >

                  Fechar

                </button>

              </div>

              <form
                onSubmit={
                  handleSubmit
                }
                className="
                  space-y-6
                "
              >

                <select
                  value={
                    formData.alunoId
                  }
                  onChange={(e) =>
                    handleChange(
                      "alunoId",
                      e.target.value
                    )
                  }
                  className="
                    w-full

                    bg-zinc-950

                    border border-zinc-800

                    rounded-2xl

                    px-4 py-3
                  "
                >

                  <option value="">
                    Selecione o aluno
                  </option>

                  {
                    students.map(
                      (
                        student
                      ) => (

                        <option
                          key={
                            student.id
                          }
                          value={
                            student.id
                          }
                        >

                          {
                            student.nome
                          }

                        </option>
                      )
                    )
                  }

                </select>

                <select
                  value={
                    formData
                      .responsavelFinanceiroId
                  }
                  onChange={(e) =>
                    handleChange(
                      "responsavelFinanceiroId",
                      e.target.value
                    )
                  }
                  className="
                    w-full

                    bg-zinc-950

                    border border-zinc-800

                    rounded-2xl

                    px-4 py-3
                  "
                >

                  <option value="">
                    Responsável Financeiro
                  </option>

                  {
                    responsaveis.map(
                      (
                        responsavel
                      ) => (

                        <option
                          key={
                            responsavel.id
                          }
                          value={
                            responsavel.id
                          }
                        >

                          {
                            responsavel.nome
                          }

                        </option>
                      )
                    )
                  }

                </select>

                <select
                value={
                    formData
                    .responsavelContratualId
                }
                onChange={(e) =>
                    handleChange(
                    "responsavelContratualId",
                    e.target.value
                    )
                }
                className="
                    w-full

                    bg-zinc-950

                    border border-zinc-800

                    rounded-2xl

                    px-4 py-3
                "
                >

                <option value="">
                    Responsável Contratual
                </option>

                {
                    responsaveis.map(
                    (
                        responsavel
                    ) => (

                        <option
                        key={
                            responsavel.id
                        }
                        value={
                            responsavel.id
                        }
                        >

                        {
                            responsavel.nome
                        }

                        </option>
                    )
                    )
                }

                </select>

                <div className="
                  grid
                  grid-cols-2
                  gap-6
                ">

                  <input
                    type="text"
                    placeholder="Turma"
                    value={
                      formData.turma
                    }
                    onChange={(e) =>
                      handleChange(
                        "turma",
                        e.target.value
                      )
                    }
                    className="
                      w-full

                      bg-zinc-950

                      border border-zinc-800

                      rounded-2xl

                      px-4 py-3
                    "
                  />

                  <input
                    type="text"
                    placeholder="Etapa"
                    value={
                      formData.etapa
                    }
                    onChange={(e) =>
                      handleChange(
                        "etapa",
                        e.target.value
                      )
                    }
                    className="
                      w-full

                      bg-zinc-950

                      border border-zinc-800

                      rounded-2xl

                      px-4 py-3
                    "
                  />

                </div>

                <div className="
                  grid
                  grid-cols-2
                  gap-6
                ">

                  <input
                    type="number"
                    placeholder="Valor da Mensalidade"
                    value={
                      formData.valorMensalidade
                    }
                    onChange={(e) =>
                      handleChange(
                        "valorMensalidade",
                        e.target.value
                      )
                    }
                    className="
                      w-full

                      bg-zinc-950

                      border border-zinc-800

                      rounded-2xl

                      px-4 py-3
                    "
                  />

                  <input
                    type="number"
                    placeholder="Dia vencimento"
                    value={
                      formData.diaVencimento
                    }
                    onChange={(e) =>
                      handleChange(
                        "diaVencimento",
                        e.target.value
                      )
                    }
                    className="
                      w-full

                      bg-zinc-950

                      border border-zinc-800

                      rounded-2xl

                      px-4 py-3
                    "
                  />

                </div>

                <div className="
                    grid
                    grid-cols-2
                    gap-6
                    ">

                    <input
                        type="number"
                        placeholder="Bolsa (%)"
                        value={
                        formData
                            .percentualBolsa
                        }
                        onChange={(e) =>
                        handleChange(
                            "percentualBolsa",
                            e.target.value
                        )
                        }
                        className="
                        w-full

                        bg-zinc-950

                        border border-zinc-800

                        rounded-2xl

                        px-4 py-3
                        "
                    />

                    <input
                        type="number"
                        placeholder="Desconto (R$)"
                        value={
                        formData
                            .valorDesconto
                        }
                        onChange={(e) =>
                        handleChange(
                            "valorDesconto",
                            e.target.value
                        )
                        }
                        className="
                        w-full

                        bg-zinc-950

                        border border-zinc-800

                        rounded-2xl

                        px-4 py-3
                        "
                    />

                    </div>

                <div className="
                    grid
                    grid-cols-2
                    gap-6
                    ">

                    <select
                        value={
                        formData.tipoMatricula
                        }
                        onChange={(e) =>
                        handleChange(
                            "tipoMatricula",
                            e.target.value
                        )
                        }
                        className="
                        w-full

                        bg-zinc-950

                        border border-zinc-800

                        rounded-2xl

                        px-4 py-3
                        "
                    >

                        <option>
                        Nova
                        </option>

                        <option>
                        Rematrícula
                        </option>

                        <option>
                        Transferência
                        </option>

                    </select>

                    <select
                        value={
                        formData.status
                        }
                        onChange={(e) =>
                        handleChange(
                            "status",
                            e.target.value
                        )
                        }
                        className="
                        w-full

                        bg-zinc-950

                        border border-zinc-800

                        rounded-2xl

                        px-4 py-3
                        "
                    >

                        <option>
                        Ativa
                        </option>

                        <option>
                        Pendente
                        </option>

                        <option>
                        Trancada
                        </option>

                        <option>
                        Cancelada
                        </option>

                    </select>

                    </div>

                    <div className="
                        grid
                        grid-cols-2
                        gap-6
                        ">

                        <input
                            type="date"
                            value={
                            formData.dataInicio
                            }
                            onChange={(e) =>
                            handleChange(
                                "dataInicio",
                                e.target.value
                            )
                            }
                            className="
                            w-full

                            bg-zinc-950

                            border border-zinc-800

                            rounded-2xl

                            px-4 py-3
                            "
                        />

                        <input
                            type="date"
                            value={
                            formData.dataFim
                            }
                            onChange={(e) =>
                            handleChange(
                                "dataFim",
                                e.target.value
                            )
                            }
                            className="
                            w-full

                            bg-zinc-950

                            border border-zinc-800

                            rounded-2xl

                            px-4 py-3
                            "
                        />

                    </div>

                    <textarea
  placeholder="Observações institucionais"
  value={
    formData.observacoes
  }
  onChange={(e) =>
    handleChange(
      "observacoes",
      e.target.value
    )
  }
  rows={4}
  className="
    w-full

    bg-zinc-950

    border border-zinc-800

    rounded-2xl

    px-4 py-3
  "
/>

                <button
                  type="submit"
                  className="
                    w-full

                    bg-blue-600
                    hover:bg-blue-500

                    transition

                    py-4

                    rounded-2xl

                    font-bold
                  "
                >

                  Criar Matrícula

                </button>

              </form>

            </div>

          </div>
        )
      }

    </div>
  );
}