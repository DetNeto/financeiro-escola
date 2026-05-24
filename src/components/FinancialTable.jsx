import formatCurrency
  from "../utils/formatCurrency";

export default function FinancialTable({
  data,
  onDelete,
  onEdit,
  onToggleStatus,
}) {

  function getDueStatus(date) {

    const today =
      new Date();

    const dueDate =
      new Date(date);

    today.setHours(
      0, 0, 0, 0
    );

    dueDate.setHours(
      0, 0, 0, 0
    );

    const diffTime =
      dueDate - today;

    const diffDays =
      diffTime /
      (
        1000 *
        60 *
        60 *
        24
      );

    if (diffDays < 0) {
      return "vencida";
    }

    if (diffDays === 0) {
      return "hoje";
    }

    if (diffDays === 1) {
      return "amanha";
    }

    return "futura";
  }

  function formatRecurrence(type) {

    const labels = {
      mensal: "Mensal",
      semanal: "Semanal",
      anual: "Anual",
    };

    return (
      labels[type] || type
    );
  }

  return (

    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">

      <table className="w-full">

        <thead className="bg-zinc-800 border-b border-zinc-700">

          <tr>

            <th className="text-left p-4 text-zinc-300 font-semibold">
              Descrição
            </th>

            <th className="text-left p-4 text-zinc-300 font-semibold">
              Categoria
            </th>

            <th className="text-left p-4 text-zinc-300 font-semibold">
              Vencimento
            </th>

            <th className="text-left p-4 text-zinc-300 font-semibold">
              Valor
            </th>

            <th className="text-left p-4 text-zinc-300 font-semibold">
              Status
            </th>

            <th className="text-left p-4 text-zinc-300 font-semibold">
              Ações
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((item) => {

            const dueStatus =
              getDueStatus(
                item.dueDate
              );

            const isLate =
              item.status ===
                "Pendente" &&
              new Date(
                item.dueDate
              ) < new Date();

            return (

              <tr
                key={item.id}
                className={`
                  border-t border-zinc-800
                  transition-all duration-200
                  hover:bg-zinc-800/40

                  ${
                    isLate
                      ? "bg-red-950/20"
                      : ""
                  }
                `}
              >

                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <span className="font-medium">
                      {item.description}
                    </span>

                    {item.isRecurring && (

                      <span className="
                        bg-purple-500/10
                        border border-purple-500/20
                        text-purple-300
                        text-xs
                        px-2 py-1
                        rounded-full
                      ">

                        🔁 {
                          formatRecurrence(
                            item.recurrenceType
                          )
                        }

                      </span>

                    )}

                  </div>

                </td>

                <td className="p-4 text-zinc-300">

                  {item.category}

                </td>

                <td
                  className={`p-4 font-medium ${
                    dueStatus ===
                    "vencida"

                      ? "text-red-400"

                      : dueStatus ===
                        "hoje"

                      ? "text-yellow-400"

                      : dueStatus ===
                        "amanha"

                      ? "text-blue-400"

                      : "text-zinc-300"
                  }`}
                >

                  {item.dueDate}

                </td>

                <td className="p-4 font-semibold text-red-400">

                  {formatCurrency(
                    item.value
                  )}

                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      onToggleStatus(
                        item.id
                      )
                    }
                    className={`
                      px-3 py-1
                      rounded-full
                      text-sm
                      font-medium
                      border
                      transition-all

                      ${
                        item.status ===
                        "Pago"

                          ? `
                            bg-green-500/10
                            border-green-500/20
                            text-green-400
                          `

                          : `
                            bg-yellow-500/10
                            border-yellow-500/20
                            text-yellow-400
                          `
                      }
                    `}
                  >

                    {item.status}

                  </button>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        onEdit(item)
                      }
                      className="
                        px-4 py-2
                        rounded-lg
                        bg-zinc-800
                        border border-zinc-700
                        hover:bg-zinc-700
                        transition-all
                      "
                    >

                      Editar

                    </button>

                    <button
                      onClick={() =>
                        onDelete(item.id)
                      }
                      className="
                        px-4 py-2
                        rounded-lg
                        bg-red-500/10
                        border border-red-500/20
                        text-red-400
                        hover:bg-red-500/20
                        transition-all
                      "
                    >

                      Excluir

                    </button>

                  </div>

                </td>

              </tr>

            );
          })}

        </tbody>

      </table>

    </div>
  );
}