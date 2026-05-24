import {
  useMemo,
} from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  useFinance,
} from "../context/FinanceContext";

export default function AnaliseFinanceira() {

  const {
    contas,
    formatCurrency,
  } = useFinance();

  const monthlyData =
    useMemo(() => {

      const grouped = {};

      contas.forEach(
        (conta) => {

          const key =
            `${String(
              conta.month
            ).padStart(2, "0")}/${conta.year}`;

          if (!grouped[key]) {

            grouped[key] = {
              month: key,
              receitas: 0,
              despesas: 0,
              saldo: 0,
            };
          }

          if (
            conta.type ===
            "receita"
          ) {

            grouped[
              key
            ].receitas +=
              conta.value;

          } else {

            grouped[
              key
            ].despesas +=
              conta.value;
          }

          grouped[
            key
          ].saldo =
            grouped[key]
              .receitas -
            grouped[key]
              .despesas;
        }
      );

      return Object.values(
        grouped
      );

    }, [contas]);

  const categoryData =
    useMemo(() => {

      const grouped = {};

      contas
        .filter(
          (conta) =>
            conta.type ===
            "despesa"
        )
        .forEach(
          (conta) => {

            if (
              !grouped[
                conta.category
              ]
            ) {

              grouped[
                conta.category
              ] = 0;
            }

            grouped[
              conta.category
            ] += conta.value;
          }
        );

      return Object.entries(
        grouped
      ).map(
        ([name, value]) => ({
          name,
          value,
        })
      );

    }, [contas]);

  const totalReceitas =
    contas
      .filter(
        (conta) =>
          conta.type ===
          "receita"
      )
      .reduce(
        (acc, conta) =>
          acc + conta.value,
        0
      );

  const totalDespesas =
    contas
      .filter(
        (conta) =>
          conta.type ===
          "despesa"
      )
      .reduce(
        (acc, conta) =>
          acc + conta.value,
        0
      );

  const saldoGeral =
    totalReceitas -
    totalDespesas;

  const COLORS = [
    "#3b82f6",
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (

    <div className="space-y-8 text-white">

      <div>

        <h1 className="text-5xl font-bold mb-2">

          Análise Financeira

        </h1>

        <p className="text-zinc-400 text-lg">

          Histórico financeiro temporal da operação.

        </p>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <p className="text-zinc-400 mb-2">

            Receitas Totais

          </p>

          <h2 className="text-3xl font-bold text-green-400">

            {formatCurrency(
              totalReceitas
            )}

          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <p className="text-zinc-400 mb-2">

            Despesas Totais

          </p>

          <h2 className="text-3xl font-bold text-red-400">

            {formatCurrency(
              totalDespesas
            )}

          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <p className="text-zinc-400 mb-2">

            Saldo Geral

          </p>

          <h2 className={`text-3xl font-bold ${
            saldoGeral >= 0
              ? "text-blue-400"
              : "text-red-400"
          }`}>

            {formatCurrency(
              saldoGeral
            )}

          </h2>

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">

          Evolução Financeira

        </h2>

        <div className="w-full h-96">

          <ResponsiveContainer>

            <LineChart
              data={monthlyData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
              />

              <XAxis
                dataKey="month"
                stroke="#a1a1aa"
              />

              <YAxis
                stroke="#a1a1aa"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#18181b",
                  border:
                    "1px solid #3f3f46",
                  borderRadius:
                    "12px",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="receitas"
                stroke="#22c55e"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="despesas"
                stroke="#ef4444"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="saldo"
                stroke="#3b82f6"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">

          Despesas por Categoria

        </h2>

        <div className="w-full h-96">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={
                  categoryData
                }
                dataKey="value"
                nameKey="name"
                outerRadius={140}
                label
              >

                {categoryData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#18181b",
                  border:
                    "1px solid #3f3f46",
                  borderRadius:
                    "12px",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}