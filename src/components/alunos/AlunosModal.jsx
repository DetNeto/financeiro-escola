import {

  X,

  Plus,

  Trash2,

} from "lucide-react";

export default function AlunosModal({

  isModalOpen,

  setIsModalOpen,

  formData,

  handleChange,

  turmasDisponiveis,

  handleAddTurma,

  handleRemoveTurma,

  responsaveisDisponiveis,

  handleSubmit,

}) {

  if (!isModalOpen) {
    return null;
  }

  return (

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
        max-w-5xl

        max-h-[95vh]

        overflow-y-auto
      ">

        <div className="
          flex
          items-center
          justify-between

          p-8

          border-b
          border-zinc-800
        ">

          <div>

            <h2 className="
              text-3xl
              font-black
            ">

              Cadastro de Aluno

            </h2>

            <p className="
              text-zinc-400
              mt-1
            ">

              Informações acadêmicas e responsáveis.

            </p>

          </div>

          <button
            onClick={() =>
              setIsModalOpen(false)
            }
            className="
              text-zinc-400
              hover:text-white

              transition
            "
          >

            <X size={28} />

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="
            p-8
            space-y-8
          "
        >

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          ">

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Nome do Aluno *

              </label>

              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>

                  handleChange(
                    "nome",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              />

            </div>

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Data de Nascimento *

              </label>

              <input
                type="date"
                value={
                  formData.nascimento
                }
                onChange={(e) =>

                  handleChange(
                    "nascimento",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              />

            </div>

          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          ">

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Etapa

              </label>

              <select
                value={formData.etapa}
                onChange={(e) =>

                  handleChange(
                    "etapa",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              >

                <option>
                  Berçário I
                </option>

                <option>
                  Berçário II
                </option>

                <option>
                  Maternal
                </option>

                <option>
                  Jardim
                </option>

              </select>

            </div>

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Turno

              </label>

              <select
                value={formData.turno}
                onChange={(e) =>

                  handleChange(
                    "turno",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              >

                <option>
                  Integral
                </option>

                <option>
                  Manhã
                </option>

                <option>
                  Tarde
                </option>

              </select>

            </div>

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Status

              </label>

              <select
                value={formData.status}
                onChange={(e) =>

                  handleChange(
                    "status",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              >

                <option>
                  Ativo
                </option>

                <option>
                  Inativo
                </option>

              </select>

            </div>

          </div>

          <div className="
            space-y-4
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <h3 className="
                text-xl
                font-bold
              ">

                Turma

              </h3>

            </div>

            <div className="
              flex
              gap-3
            ">

              <input
                type="text"
                placeholder="Nova turma"
                value={
                  formData.novaTurma
                }
                onChange={(e) =>

                  handleChange(
                    "novaTurma",
                    e.target.value
                  )
                }
                className="
                  flex-1

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              />

              <button
                type="button"
                onClick={
                  handleAddTurma
                }
                className="
                  bg-blue-600
                  hover:bg-blue-500

                  transition

                  px-5

                  rounded-2xl
                "
              >

                <Plus size={20} />

              </button>

            </div>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
            ">

              {
                turmasDisponiveis.map(
                  (item) => (

                    <div
                      key={item}
                      className="
                        flex
                        items-center
                        justify-between

                        bg-zinc-950

                        border
                        border-zinc-800

                        rounded-2xl

                        px-4
                        py-3
                      "
                    >

                      <button
                        type="button"
                        onClick={() =>

                          handleChange(
                            "turma",
                            item
                          )
                        }
                        className={`
                          text-left
                          flex-1

                          transition

                          ${
                            formData.turma === item

                              ? "text-blue-400 font-bold"

                              : "text-white"
                          }
                        `}
                      >

                        {item}

                      </button>

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

                        <Trash2
                          size={18}
                        />

                      </button>

                    </div>
                  )
                )
              }

            </div>

          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          ">

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Responsável Principal *

              </label>

              <select
                value={
                  formData.responsavelPrincipalId
                }
                onChange={(e) =>

                  handleChange(
                    "responsavelPrincipalId",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              >

                <option value="">
                  Selecione
                </option>

                {
                  responsaveisDisponiveis.map(
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

            </div>

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Responsável Secundário

              </label>

              <select
                value={
                  formData.responsavelSecundarioId
                }
                onChange={(e) =>

                  handleChange(
                    "responsavelSecundarioId",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              >

                <option value="">
                  Nenhum
                </option>

                {
                  responsaveisDisponiveis.map(
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

            </div>

          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          ">

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                DDI

              </label>

              <input
                type="text"
                value={formData.ddi}
                onChange={(e) =>

                  handleChange(
                    "ddi",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              />

            </div>

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                DDD

              </label>

              <input
                type="text"
                value={formData.ddd}
                onChange={(e) =>

                  handleChange(
                    "ddd",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              />

            </div>

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                Telefone / WhatsApp

              </label>

              <input
                type="text"
                value={
                  formData.telefone
                }
                onChange={(e) =>

                  handleChange(
                    "telefone",
                    e.target.value
                  )
                }
                className="
                  w-full
                  mt-2

                  bg-zinc-950

                  border
                  border-zinc-800

                  rounded-2xl

                  px-4
                  py-3

                  outline-none

                  focus:border-blue-500
                "
              />

            </div>

          </div>

          <div className="
            flex
            justify-end
            gap-4
            pt-4
          ">

            <button
              type="button"
              onClick={() =>
                setIsModalOpen(false)
              }
              className="
                px-6
                py-3

                rounded-2xl

                bg-zinc-800
                hover:bg-zinc-700

                transition
              "
            >

              Cancelar

            </button>

            <button
              type="submit"
              className="
                px-6
                py-3

                rounded-2xl

                bg-blue-600
                hover:bg-blue-500

                transition

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