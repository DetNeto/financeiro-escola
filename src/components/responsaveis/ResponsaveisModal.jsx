import {
  X,
} from "lucide-react";

export default function ResponsavelModal({

  isModalOpen,

  setIsModalOpen,

  formData,

  handleChange,

  handleSubmit,

  editingResponsavelId,

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
        max-w-6xl

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

              {
                editingResponsavelId

                  ? "Editar Responsável"

                  : "Novo Responsável"
              }

            </h2>

            <p className="
              text-zinc-400
              mt-1
            ">

              Dados legais, financeiros e contato institucional.

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

                Nome Completo *

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

                Tipo

              </label>

              <select
                value={formData.tipo}
                onChange={(e) =>

                  handleChange(
                    "tipo",
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
                  Ambos
                </option>

                <option>
                  Financeiro
                </option>

                <option>
                  Pedagógico
                </option>

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

                CPF *

              </label>

              <input
                type="text"
                value={formData.cpf}
                onChange={(e) =>

                  handleChange(
                    "cpf",
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

                RG

              </label>

              <input
                type="text"
                value={formData.rg}
                onChange={(e) =>

                  handleChange(
                    "rg",
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

                Estado Civil

              </label>

              <select
                value={
                  formData.estadoCivil
                }
                onChange={(e) =>

                  handleChange(
                    "estadoCivil",
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
                  Solteiro(a)
                </option>

                <option>
                  Casado(a)
                </option>

                <option>
                  Divorciado(a)
                </option>

                <option>
                  Viúvo(a)
                </option>

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

                Profissão

              </label>

              <input
                type="text"
                value={
                  formData.profissao
                }
                onChange={(e) =>

                  handleChange(
                    "profissao",
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

                Nacionalidade

              </label>

              <input
                type="text"
                value={
                  formData.nacionalidade
                }
                onChange={(e) =>

                  handleChange(
                    "nacionalidade",
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

                E-mail

              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>

                  handleChange(
                    "email",
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
            md:grid-cols-4
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

                Telefone

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

            <div>

              <label className="
                text-sm
                text-zinc-400
              ">

                WhatsApp

              </label>

              <input
                type="text"
                value={
                  formData.whatsapp
                }
                onChange={(e) =>

                  handleChange(
                    "whatsapp",
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
            space-y-6
          ">

            <h3 className="
              text-2xl
              font-bold
            ">

              Endereço

            </h3>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-4
              gap-6
            ">

              <div>

                <label className="
                  text-sm
                  text-zinc-400
                ">

                  CEP

                </label>

                <input
                  type="text"
                  value={formData.cep}
                  onChange={(e) =>

                    handleChange(
                      "cep",
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

              <div className="
                md:col-span-2
              ">

                <label className="
                  text-sm
                  text-zinc-400
                ">

                  Endereço

                </label>

                <input
                  type="text"
                  value={
                    formData.endereco
                  }
                  onChange={(e) =>

                    handleChange(
                      "endereco",
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

                  Número

                </label>

                <input
                  type="text"
                  value={formData.numero}
                  onChange={(e) =>

                    handleChange(
                      "numero",
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
              md:grid-cols-2
              gap-6
            ">

              <div>

                <label className="
                  text-sm
                  text-zinc-400
                ">

                  Bairro

                </label>

                <input
                  type="text"
                  value={
                    formData.bairro
                  }
                  onChange={(e) =>

                    handleChange(
                      "bairro",
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

                  Cidade

                </label>

                <input
                  type="text"
                  value={
                    formData.cidade
                  }
                  onChange={(e) =>

                    handleChange(
                      "cidade",
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

              Salvar Responsável

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}