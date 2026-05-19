import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FinanceChart({
  totalPago,
  totalPendente,
}) {

  const data = [
    {
      name: "Pago",
      valor: totalPago,
    },

    {
      name: "Pendente",
      valor: totalPendente,
    },
  ];

  return (

    <div className="bg-slate-800 p-6 rounded-2xl mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Resumo Financeiro
      </h2>

      <div className="w-full h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="valor"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}