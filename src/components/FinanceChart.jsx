import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FinanceChart({
  title = "Resumo Financeiro",
  data = [],
  height = "h-52",
}) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-8">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      <div className={`w-full ${height}`}>

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis
              dataKey="name"
              stroke="#a1a1aa"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#a1a1aa"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(63, 63, 70, 0.25)",
              }}
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "12px",
                color: "#ffffff",
              }}
              labelStyle={{
                color: "#ffffff",
              }}
            />

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