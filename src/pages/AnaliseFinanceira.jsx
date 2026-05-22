import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useFinance }
  from "../context/FinanceContext";

import FinancialCard
  from "../components/FinancialCard";

export default function AnaliseFinanceira() {

  const {
    contas,
    formatCurrency,
  } = useFinance();

  const despesasPorCategoria =
    contas
      .filter(
        (conta) =>
          conta.type ===
          "despesa"
      )
      .reduce(
        (acc, conta) => {

          if (
            !acc[
              conta.category
            ]
          ) {

            acc[
              conta.category
            ] = 0;
          }

          acc[
            conta.category
          ] += conta.value;

          return acc;

        },
        {}
      );

  const historicoMensal =
    contas.reduce(
      (acc, conta) => {

        const data =
          new Date(
            conta.dueDate
          );

        const mes =
          data.toLocaleString(
            "pt-BR",
            {
              month: "long",
              year: "numeric",
            }
          );

        if (!acc[mes]) {

          acc[mes] = {
            receitas: 0,
            despesas: 0,
          };
        }

        if (
          conta.type ===
          "receita"
        ) {

          acc[mes].receitas +=
            conta.value;

        } else {

          acc[mes].despesas +=
            conta.value;
        }

        return acc;

      },
      {}
    );

  const totalReceitas =
    contas
      .filter(
        (conta) =>
          conta.type ===
          "receita"
      )
      .reduce(
        (total, conta) =>
          total + conta.value,
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
        (total, conta) =>
          total + conta.value,
        0
      );

  const percentualReceitas =
    totalReceitas > 0
      ? (
          (totalReceitas /
            (
              totalReceitas +
              totalDespesas
            )) *
          100
        ).toFixed(1)
      : 0;

  const percentualDespesas =
    totalDespesas > 0
      ? (
          (totalDespesas /
            (
              totalReceitas +
              totalDespesas
            )) *
          100
        ).toFixed(1)
      : 0;

  const chartData = [
    {
      name: "Receitas",
      valor: totalReceitas,
    },
    {
      name: "Despesas",
      valor: totalDespesas,
    },
  ];

  return (

    <div className="min-h-screen bg-zinc-950 text-white p-8">

      <h1 className="text-5xl font-bold mb-10">
        Análise Financeira
      </h1>

      <div className="bg-zinc-900 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Resumo Financeiro
        </h2>
<div className="w-full h-[300px]">

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

          <BarChart data={chartData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="valor"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>
      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Despesas por Categoria
        </h2>

        <div className="space-y-4">

          {Object.entries(
            despesasPorCategoria
          ).map(
            ([categoria, valor]) => (

              <div
                key={categoria}
                className="flex justify-between items-center bg-zinc-800 p-4 rounded-xl"
              >

                <span className="font-semibold">

                  {categoria}

                </span>

                <span className="text-red-400 font-bold">

                  {formatCurrency(valor)}

                </span>

              </div>

            )
          )}

        </div>

      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Histórico Financeiro
        </h2>

        <div className="space-y-4">

          {Object.entries(
            historicoMensal
          ).map(
            ([mes, dados]) => {

              const saldo =
                dados.receitas -
                dados.despesas;

              return (

                <div
                  key={mes}
                  className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center"
                >

                  <div>

                    <p className="font-bold capitalize">
                      {mes}
                    </p>

                    <p className="text-sm text-zinc-400">

                      Receitas:
                      {" "}
                      {formatCurrency(
                        dados.receitas
                      )}

                    </p>

                    <p className="text-sm text-zinc-400">

                      Despesas:
                      {" "}
                      {formatCurrency(
                        dados.despesas
                      )}

                    </p>

                  </div>

                  <div className="text-right">

                    <p
                      className={`font-bold text-xl ${
                        saldo >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >

                      {formatCurrency(
                        saldo
                      )}

                    </p>

                  </div>

                </div>

              );
            }
          )}

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <FinancialCard
          title="Receitas"
          value={`${percentualReceitas}%`}
          color="text-green-400"
        />

        <FinancialCard
          title="Despesas"
          value={`${percentualDespesas}%`}
          color="text-red-400"
        />

      </div>

    </div>
  );
}