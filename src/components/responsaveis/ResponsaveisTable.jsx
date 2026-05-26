import {

  Search,

  Pencil,

  Trash2,

} from "lucide-react";

export default function ResponsaveisTable({

  search,

  setSearch,

  filteredResponsaveis,

  toggleStatus,

  handleEditResponsavel,

  handleRemoveResponsavel,

}) {

  return (

    <div className="
      bg-zinc-900
      border border-zinc-800
      rounded-3xl
      p-6
    ">

      <div className="
        relative
        mb-6
      ">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-zinc-500
          "
        />

        <input
          type="text"
          placeholder="Buscar responsável, CPF ou e-mail..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            bg-zinc-800
            border border-zinc-700
            rounded-xl
            pl-12
            pr-4
            py-4
          "
        />

      </div>

      <div className="overflow-x-auto">

        <table className="
          w-full
          text-left
        ">

          <thead>

            <tr className="
              border-b
              border-zinc-800
            ">

              <th className="pb-4">
                Código
              </th>

              <th className="pb-4">
                Nome
              </th>

              <th className="pb-4">
                Tipo
              </th>

              <th className="pb-4">
                Cidade
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="
                pb-4
                text-center
              ">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredResponsaveis.map(
              (responsavel) => (

                <tr
                  key={responsavel.id}
                  className="
                    border-b
                    border-zinc-800
                    hover:bg-zinc-800/40
                    transition
                  "
                >

                  <td className="
                    py-5
                    font-semibold
                    text-blue-400
                  ">

                    {responsavel.codigo}

                  </td>

                  <td className="
                    py-5
                    font-semibold
                  ">

                    {responsavel.nome}

                  </td>

                  <td className="py-5">

                    {responsavel.tipo}

                  </td>

                  <td className="py-5">

                    {responsavel.cidade}

                  </td>

                  <td className="py-5">

                    <button
                      onClick={() =>
                        toggleStatus(
                          responsavel.id
                        )
                      }
                      className={`
                        px-3 py-1
                        rounded-full
                        text-sm
                        font-medium
                        transition

                        ${
                          responsavel.status ===
                          "Ativo"

                            ? `
                              bg-green-500/10
                              text-green-400
                            `

                            : `
                              bg-red-500/10
                              text-red-400
                            `
                        }
                      `}
                    >

                      {
                        responsavel.status
                      }

                    </button>

                  </td>

                  <td className="
                    py-5
                    text-center
                  ">

                    <div className="
                      flex
                      items-center
                      justify-center
                      gap-2
                    ">

                      <button
                        onClick={() =>
                          handleEditResponsavel(
                            responsavel
                          )
                        }
                        className="
                          p-2

                          rounded-xl

                          bg-blue-500/10
                          hover:bg-blue-500/20

                          text-blue-400

                          transition
                        "
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        onClick={() =>
                          handleRemoveResponsavel(
                            responsavel.id,
                            responsavel.nome
                          )
                        }
                        className="
                          p-2

                          rounded-xl

                          bg-red-500/10
                          hover:bg-red-500/20

                          text-red-400

                          transition
                        "
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}