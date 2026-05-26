import Select from "react-select";

import {
  X,
  Trash2,
} from "lucide-react";

import {
  etapas,
  paises,
} from "./constants";

export default function AlunosModal({

  isModalOpen,

  setIsModalOpen,

  nome,

  setNome,

  etapa,

  setEtapa,

  turma,

  setTurma,

  novaTurma,

  setNovaTurma,

  turmasDisponiveis,

  handleAddTurma,

  handleRemoveTurma,

  responsavelPrincipalId,

  setResponsavelPrincipalId,

  responsavelSecundarioId,

  setResponsavelSecundarioId,

  responsaveisDisponiveis,

  ddi,

  setDdi,

  ddd,

  setDdd,

  telefone,

  setTelefone,

  nascimento,

  setNascimento,

  turno,

  setTurno,

  status,

  setStatus,

  handleSubmit,

}) {

  if (!isModalOpen) {
    return null;
  }

  const selectStyles = {

    control: (base) => ({
      ...base,

      backgroundColor:
        "#27272a",

      borderColor:
        "#3f3f46",

      minHeight:
        "56px",

      borderRadius:
        "12px",
    }),

    menu: (base) => ({
      ...base,

      backgroundColor:
        "#18181b",
    }),

    singleValue: (base) => ({
      ...base,

      color:
        "#ffffff",
    }),

    input: (base) => ({
      ...base,

      color:
        "#ffffff",
    }),

    option: (
      base,
      state
    ) => ({
      ...base,

      backgroundColor:
        state.isFocused

          ? "#3f3f46"

          : "#18181b",

      color:
        "#ffffff",

      cursor:
        "pointer",
    }),
  };

  return (

    <div className="
      fixed inset-0
      bg-black/70
      backdrop-blur-sm

      flex
      items-center
      justify-center

      z-50
    ">

      <div className="
        bg-zinc-900

        border border-zinc-800

        rounded-3xl

        w-full
        max-w-6xl

        max-h-[90vh]

        overflow-y-auto

        p-8
      ">

        <div className="
          flex
          justify-between
          items-center

          mb-8
        ">

          <div>

            <h2 className="
              text-3xl
              font-black
            ">

              Novo Aluno

            </h2>

            <p className="
              text-zinc-400
              mt-2
            ">

              Cadastro institucional do aluno.

            </p>

          </div>

          <button
            onClick={() =>
              setIsModalOpen(false)
            }
            className="
              p-3

              rounded-xl

              bg-zinc-800
              hover:bg-zinc-700

              transition
            "
          >

            <X size={22} />

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          <input
            type="text"
            placeholder="Nome do aluno"
            value={nome}
            onChange={(e) =>
              setNome(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
            "
          />

          <input
            type="date"
            value={nascimento}
            onChange={(e) =>
              setNascimento(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
            "
          />

          <select
            value={etapa}
            onChange={(e) =>
              setEtapa(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
            "
          >

            {etapas.map(
              (item) => (

                <option
                  key={item}
                  value={item}
                >

                  {item}

                </option>
              )
            )}

          </select>

          <select
            value={turno}
            onChange={(e) =>
              setTurno(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
            "
          >

            <option value="Integral">
              Integral
            </option>

            <option value="Manhã">
              Manhã
            </option>

            <option value="Tarde">
              Tarde
            </option>

          </select>

          <div className="
            md:col-span-2
          ">

            <div className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-3
            ">

              <select
                value={turma}
                onChange={(e) =>
                  setTurma(
                    e.target.value
                  )
                }
                className="
                  bg-zinc-800
                  border border-zinc-700
                  rounded-xl
                  px-4 py-4
                "
              >

                <option value="">
                  Selecione a turma
                </option>

                {turmasDisponiveis.map(
                  (item) => (

                    <option
                      key={item}
                      value={item}
                    >

                      {item}

                    </option>
                  )
                )}

              </select>

              <input
                type="text"
                placeholder="Nova turma"
                value={novaTurma}
                onChange={(e) =>
                  setNovaTurma(
                    e.target.value
                  )
                }
                className="
                  bg-zinc-800
                  border border-zinc-700
                  rounded-xl
                  px-4 py-4
                "
              />

              <button
                type="button"
                onClick={handleAddTurma}
                className="
                  bg-blue-600
                  hover:bg-blue-500

                  transition

                  rounded-xl

                  font-bold
                "
              >

                Adicionar Turma

              </button>

            </div>

            <div className="
              flex
              flex-wrap
              gap-2
              mt-4
            ">

              {turmasDisponiveis.map(
                (item) => (

                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-2

                      bg-zinc-800

                      border border-zinc-700

                      rounded-full

                      px-4 py-2
                    "
                  >

                    <span>
                      {item}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveTurma(
                          item
                        )
                      }
                      className="
                        text-red-400
                        hover:text-red-300
                      "
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>
                )
              )}

            </div>

          </div>

          <select
            value={responsavelPrincipalId}
            onChange={(e) =>
              setResponsavelPrincipalId(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
            "
          >

            <option value="">
              Responsável Principal
            </option>

            {responsaveisDisponiveis.map(
              (responsavel) => (

                <option
                  key={responsavel.id}
                  value={responsavel.id}
                >

                  {responsavel.nome}

                </option>
              )
            )}

          </select>

          <select
            value={responsavelSecundarioId}
            onChange={(e) =>
              setResponsavelSecundarioId(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
            "
          >

            <option value="">
              Responsável Secundário
            </option>

            {responsaveisDisponiveis.map(
              (responsavel) => (

                <option
                  key={responsavel.id}
                  value={responsavel.id}
                >

                  {responsavel.nome}

                </option>
              )
            )}

          </select>

          <div className="
            md:col-span-2

            grid
            grid-cols-1
            md:grid-cols-3
            gap-3
          ">

            <Select
              options={paises}
              value={
                paises.find(
                  (pais) =>
                    pais.value === ddi
                )
              }
              onChange={(selected) =>
                setDdi(
                  selected.value
                )
              }
              styles={selectStyles}
            />

            <input
              type="text"
              placeholder="DDD"
              value={ddd}
              onChange={(e) =>
                setDdd(
                  e.target.value
                )
              }
              className="
                bg-zinc-800
                border border-zinc-700
                rounded-xl
                px-4 py-4
              "
            />

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) =>
                setTelefone(
                  e.target.value
                )
              }
              className="
                bg-zinc-800
                border border-zinc-700
                rounded-xl
                px-4 py-4
              "
            />

          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
            "
          >

            <option value="Ativo">
              Ativo
            </option>

            <option value="Inativo">
              Inativo
            </option>

          </select>

          <div className="
            md:col-span-2
          ">

            <button
              type="submit"
              className="
                w-full

                bg-blue-600
                hover:bg-blue-500

                transition

                rounded-xl

                px-6 py-4

                font-bold
              "
            >

              Salvar Aluno

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}