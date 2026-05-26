import Select from "react-select";

import {
  X,
} from "lucide-react";

import {

  paises,

  estadosCivis,

  tiposResponsavel,

} from "./constants";

export default function ResponsaveisModal({

  responsaveis,

  isModalOpen,

  setIsModalOpen,

  editingResponsavelId,

  formData,

  setFormData,

  handleSubmit,

}) {

  if (!isModalOpen) {
    return null;
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

  const selectStyles = {

    control: (base) => ({

      ...base,

      backgroundColor:
        "#27272a",

      borderColor:
        "#3f3f46",

      borderRadius:
        "0.75rem",

      minHeight:
        "58px",

      boxShadow:
        "none",

      color:
        "white",
    }),

    menu: (base) => ({

      ...base,

      backgroundColor:
        "#18181b",

      border:
        "1px solid #3f3f46",

      overflow:
        "hidden",
    }),

    option: (
      base,
      state
    ) => ({

      ...base,

      backgroundColor:
        state.isFocused

          ? "#2563eb"

          : "#18181b",

      color:
        "white",

      cursor:
        "pointer",
    }),

    singleValue: (
      base
    ) => ({

      ...base,

      color:
        "white",
    }),

    input: (base) => ({

      ...base,

      color:
        "white",
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
        max-w-7xl

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

              {
                editingResponsavelId

                  ? "Editar Responsável"

                  : "Novo Responsável"
              }

            </h2>

            <p className="
              text-zinc-400
              mt-2
            ">

              Cadastro institucional.

            </p>

          </div>

          <button
            onClick={() => {

              setIsModalOpen(
                false
              );
            }}
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
            md:grid-cols-3
            gap-5
          "
        >

          <input
            type="text"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={(e) =>
              handleChange(
                "nome",
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
            value={formData.tipo}
            onChange={(e) =>
              handleChange(
                "tipo",
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

            {tiposResponsavel.map(
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
            placeholder="CPF"
            value={formData.cpf}
            onChange={(e) =>
              handleChange(
                "cpf",
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
            placeholder="RG"
            value={formData.rg}
            onChange={(e) =>
              handleChange(
                "rg",
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
            value={formData.estadoCivil}
            onChange={(e) =>
              handleChange(
                "estadoCivil",
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

            {estadosCivis.map(
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
            placeholder="Nacionalidade"
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
              bg-zinc-800
              border border-zinc-700

              rounded-xl

              px-4 py-4
            "
          />

          <input
            type="text"
            placeholder="Profissão"
            value={formData.profissao}
            onChange={(e) =>
              handleChange(
                "profissao",
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
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) =>
              handleChange(
                "email",
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
            value={
              formData.autorizacao
            }
            onChange={(e) =>
              handleChange(
                "autorizacao",
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

            <option value="
              Autorizado Retirada
            ">
              Autorizado Retirada
            </option>

            <option value="
              Não Autorizado
            ">
              Não Autorizado
            </option>

          </select>

          <div className="
            md:col-span-3

            grid
            grid-cols-1
            md:grid-cols-4

            gap-3
          ">

            <Select
              options={paises}
              value={
                paises.find(
                  (pais) =>
                    pais.value ===
                    formData.ddi
                )
              }
              onChange={(selected) =>
                handleChange(
                  "ddi",
                  selected.value
                )
              }
              styles={selectStyles}
            />
            <input
              type="text"
              placeholder="DDD"
              value={formData.ddd}
              onChange={(e) =>
                handleChange(
                  "ddd",
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
                bg-zinc-800
                border border-zinc-700

                rounded-xl

                px-4 py-4
              "
            />

            <input
              type="text"
              placeholder="Telefone secundário"
              value={
                formData.telefone2
              }
              onChange={(e) =>
                handleChange(
                  "telefone2",
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

          <input
            type="text"
            placeholder="Endereço"
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
              bg-zinc-800
              border border-zinc-700

              rounded-xl

              px-4 py-4
            "
          />

          <input
            type="text"
            placeholder="Número"
            value={
              formData.numero
            }
            onChange={(e) =>
              handleChange(
                "numero",
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
            placeholder="Bairro"
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
              bg-zinc-800
              border border-zinc-700

              rounded-xl

              px-4 py-4
            "
          />

          <input
            type="text"
            placeholder="Cidade"
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
              bg-zinc-800
              border border-zinc-700

              rounded-xl

              px-4 py-4
            "
          />

          <input
            type="text"
            placeholder="CEP"
            value={
              formData.cep
            }
            onChange={(e) =>
              handleChange(
                "cep",
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
            placeholder="Convênio"
            value={
              formData.convenio
            }
            onChange={(e) =>
              handleChange(
                "convenio",
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

          <textarea
            placeholder="
              Observações institucionais
            "
            value={
              formData.observacoes
            }
            onChange={(e) =>
              handleChange(
                "observacoes",
                e.target.value
              )
            }
            rows={5}
            className="
              md:col-span-3

              bg-zinc-800
              border border-zinc-700

              rounded-xl

              px-4 py-4

              resize-none
            "
          />

          <select
            value={formData.status}
            onChange={(e) =>
              handleChange(
                "status",
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
            md:col-span-3
          ">

            <button
              type="submit"
              className="
                w-full

                bg-blue-600
                hover:bg-blue-500

                transition

                py-5

                rounded-2xl

                font-bold
                text-lg
              "
            >

              {
                editingResponsavelId

                  ? "Salvar Alterações"

                  : "Salvar Responsável"
              }

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}            