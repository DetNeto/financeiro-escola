import formatCurrency from "../utils/formatCurrency";
export default function FinancialTable({
  data,
  onDelete,
  onEdit,
  onToggleStatus,
}) {
function getDueStatus(date) {

  const today = new Date();

  const dueDate = new Date(date);

  today.setHours(0, 0, 0, 0);

  dueDate.setHours(0, 0, 0, 0);

  const diffTime =
    dueDate - today;

  const diffDays =
    diffTime /
    (1000 * 60 * 60 * 24);

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
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-700">

          <tr>

            <th className="text-left p-4">
              Descrição
            </th>

            <th className="text-left p-4">
              Categoria
            </th>

            <th className="text-left p-4">
              Vencimento
            </th>

            <th className="text-left p-4">
              Valor
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Ações
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((item) => {

  const dueStatus =
    getDueStatus(item.dueDate);

  return (

            <tr
          key={item.id}
          className={`border-t border-slate-700 hover:bg-slate-700/40 transition ${
          item.status === "Pendente" &&
          new Date(item.dueDate) < new Date()
          ? "bg-red-500/10"   : ""
  }`}
            >

              <td className="p-4">
                {item.description}
              </td>

              <td className="p-4">
                {item.category}
              </td>

              <td
                 className={`p-4 font-medium ${
                dueStatus === "vencida"
                  ? "text-red-400"
                  : dueStatus === "hoje"
                  ? "text-yellow-400"
                  : dueStatus === "amanha"
                  ? "text-blue-400"
                  : "text-white"
              }`}
              >
             {item.dueDate}
              </td>

              <td className="p-4 text-red-400 font-semibold">
              {formatCurrency(item.value)}
              </td>

              <td className="p-4">

                <button
  onClick={() =>
    onToggleStatus(item.id)
  }
  className={`px-3 py-1 rounded-full text-sm font-medium ${
    item.status === "Pago"
      ? "bg-green-500/20 text-green-400"
      : "bg-yellow-500/20 text-yellow-400"
  }`}
>
  {item.status}
</button>

              </td>

              <td className="p-4 flex gap-2">

              <button
              onClick={() => onEdit(item)}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition"
              >
                Editar
              </button>

              <button
              onClick={() => onDelete(item.id)}
              className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg transition"
              >
                Excluir
              </button>

              </td>

            </tr>

            );
            })}

        </tbody>

      </table>

    </div>
  );
}