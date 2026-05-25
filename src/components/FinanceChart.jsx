import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function FinanceChart({

  title = "Resumo Financeiro",

  data = [],

  height = "h-72",

  dataKeys = [
    {
      key: "valor",
      color: "#3b82f6",
      name: "Valor",
    },
  ],

}) {

  return (

    <div className="
      bg-zinc-900
      border border-zinc-800
      p-6
      rounded-3xl
      mt-8
    ">

      <div className="mb-6">

        <h2 className="
          text-2xl
          font-bold
          text-white
        ">

          {title}

        </h2>

      </div>

      <div className={`w-full ${height}`}>

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
            />

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
                fill:
                  "rgba(63,63,70,0.15)",
              }}

              contentStyle={{
                backgroundColor:
                  "#18181b",

                border:
                  "1px solid #3f3f46",

                borderRadius:
                  "16px",

                color:
                  "#ffffff",
              }}

              labelStyle={{
                color:
                  "#ffffff",
              }}
            />

            <Legend />

            {dataKeys.map(
              (item) => (

                <Bar
                  key={item.key}
                  dataKey={item.key}
                  fill={item.color}
                  name={item.name}
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                />

              )
            )}

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}