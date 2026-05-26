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

  editingId,

  form,

  setForm,

  handleSubmit,

  resetForm,

  selectStyles,

}) {

  if (!isModalOpen) {
    return null;
  }

  function handleChange(
    field,
    value
  ) {

    setForm(
      (prev) => ({
        ...prev,
        [field]: value,
      })
    );
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
                editingId

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

              resetForm();

              setIsModalOpen(false);
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
            value={form.nome}
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
            value={form.tipo}
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
            value={form.cpf}
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
            value={form.rg}
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
            value={form.estadoCivil}
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
            value={form.nacionalidade}
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
            value={form.profissao}
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
            value={form.email}
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
              form.responsavelSecundario
            }

            onChange={(e) =>
              handleChange(
                "responsavelSecundario",
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

            {responsaveis.map(
              (responsavel) => (

                <option
                  key={responsavel.id}
                  value={responsavel.nome}
                >

                  {responsavel.nome}

                </option>
              )
            )}

          </select>

          <select
            value={form.autorizadoRetirada}
            onChange={(e) =>
              handleChange(
                "autorizadoRetirada",
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

            <option value="Sim">
              Autorizado Retirada
            </option>

            <option value="Não">
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
                    form.ddiTelefone
                )
              }
              onChange={(selected) =>
                handleChange(
                  "ddiTelefone",
                  selected.value
                )
              }
              styles={selectStyles}
            />

            <input
              type="text"
              placeholder="DDD"
              value={form.dddTelefone}
              onChange={(e) =>
                handleChange(
                  "dddTelefone",
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
              value={form.telefone}
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
              placeholder="WhatsApp"
              value={form.whatsapp}
              onChange={(e) =>
                handleChange(
                  "whatsapp",
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
            value={form.endereco}
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
            value={form.numero}
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
            value={form.bairro}
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
            value={form.cidade}
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
            value={form.cep}
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
            placeholder="Plano de Saúde"
            value={form.planoSaude}
            onChange={(e) =>
              handleChange(
                "planoSaude",
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
            value={
              editingId

                ? form.carteirinha

                : "Gerado automaticamente"
            }

            disabled

            className="
              bg-zinc-900
              border border-zinc-700
              rounded-xl
              px-4 py-4
              text-zinc-400
              cursor-not-allowed
            "
          />

          <textarea
            placeholder="Observações"
            value={form.observacoes}
            onChange={(e) =>
              handleChange(
                "observacoes",
                e.target.value
              )
            }
            rows={4}
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
            value={form.status}
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

                rounded-xl

                px-6 py-4

                font-bold
              "
            >

              {
                editingId

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