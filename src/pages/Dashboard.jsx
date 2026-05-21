import { useContext } from "react";

import FinancialCard from "../components/FinancialCard";

import FinanceChart from "../components/FinanceChart";

import formatCurrency from "../utils/formatCurrency";

import {
  FinanceContext,
} from "../context/FinanceContext";

export default function Dashboard() {

  const { contas } =
    useContext(FinanceContext);

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  const contasDoMes = contas.filter(
    (conta) => {

      const dataConta =
        new Date(conta.dueDate);

      return (
        dataConta.getMonth() ===
          currentMonth &&
        dataConta.getFullYear() ===
          currentYear
      );
    }
  );

  const totalReceitas = contasDoMes
    .filter(
      (conta) =>
        conta.type === "receita"
    )
    .reduce((total, conta) => {

      return total + conta.value;

    }, 0);

  const totalDespesas = contasDoMes
    .filter(
      (conta) =>
        conta.type === "despesa"
    )
    .reduce((total, conta) => {

      return total + conta.value;

    }, 0);

  const saldo =
    totalReceitas - totalDespesas;

  const contasVencidas = contas.filter(
    (conta) => {

      return (
        conta.status === "Pendente" &&
        new Date(conta.dueDate) <
          new Date()
      );
    }
  );

  const contasHoje = contas.filter(
    (conta) => {

      const today =
        new Date();

      const dueDate =
        new Date(conta.dueDate);

      today.setHours(0,0,0,0);

      dueDate.setHours(0,0,0,0);

      return (
        conta.status === "Pendente" &&
        dueDate.getTime() ===
          today.getTime()
      );
    }
  );

  const receitasPendentes = contas
    .filter(
      (conta) =>
        conta.type === "receita" &&
        conta.status === "Pendente"
    )
    .reduce(
      (total, conta) =>
        total + conta.value,
      0
    );

  const despesasPendentes = contas
    .filter(
      (conta) =>
        conta.type === "despesa" &&
        conta.status === "Pendente"
    )
    .reduce(
      (total, conta) =>
        total + conta.value,
      0
    );

  const totalMovimentado =
    totalReceitas +
    totalDespesas;

  const percentualReceitas =
    totalMovimentado > 0
      ? (
          (totalReceitas /
            totalMovimentado) *
          100
        ).toFixed(1)
      : 0;

  const percentualDespesas =
    totalMovimentado > 0
      ? (
          (totalDespesas /
            totalMovimentado) *
          100
        ).toFixed(1)
      : 0;

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard Financeiro
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <FinancialCard
          title="Saldo Atual"
          value={formatCurrency(saldo)}
          color="text-green-400"
        />

        <FinancialCard
          title="Receitas"
          value={formatCurrency(totalReceitas)}
          color="text-blue-400"
        />

        <FinancialCard
          title="Despesas"
          value={formatCurrency(totalDespesas)}
          color="text-red-400"
        />

      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">
        Resumo Mensal
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <FinancialCard
          title="Saldo do Mês"
          value={formatCurrency(saldo)}
          color="text-green-400"
        />

        <FinancialCard
          title="Receitas do Mês"
          value={formatCurrency(totalReceitas)}
          color="text-blue-400"
        />

        <FinancialCard
          title="Despesas do Mês"
          value={formatCurrency(totalDespesas)}
          color="text-red-400"
        />

      </div>

      <FinanceChart
        totalPago={totalReceitas}
        totalPendente={totalDespesas}
      />

      <div className="bg-slate-800 p-6 rounded-2xl mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Alertas Financeiros
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-red-500/10 p-4 rounded-xl">

            <p className="text-red-400 text-lg font-semibold">
              Contas Vencidas
            </p>

            <p className="text-3xl font-bold mt-2">
              {contasVencidas.length}
            </p>

          </div>

          <div className="bg-yellow-500/10 p-4 rounded-xl">

            <p className="text-yellow-400 text-lg font-semibold">
              Vencem Hoje
            </p>

            <p className="text-3xl font-bold mt-2">
              {contasHoje.length}
            </p>

          </div>

          <div className="bg-blue-500/10 p-4 rounded-xl">

            <p className="text-blue-400 text-lg font-semibold">
              Receitas Pendentes
            </p>

            <p className="text-3xl font-bold mt-2">
              {formatCurrency(
                receitasPendentes
              )}
            </p>

          </div>

          <div className="bg-orange-500/10 p-4 rounded-xl">

            <p className="text-orange-400 text-lg font-semibold">
              Despesas Pendentes
            </p>

            <p className="text-3xl font-bold mt-2">
              {formatCurrency(
                despesasPendentes
              )}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-slate-800 p-6 rounded-2xl mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Indicadores Financeiros
        </h2>

        <div className="space-y-6">

          <div>

            <div className="flex justify-between mb-2">

              <span className="text-blue-400 font-semibold">
                Receitas
              </span>

              <span>
                {percentualReceitas}%
              </span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-4">

              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{
                  width: `${percentualReceitas}%`
                }}
              />

            </div>

          </div>

          <div>

            <div className="flex justify-between mb-2">

              <span className="text-red-400 font-semibold">
                Despesas
              </span>

              <span>
                {percentualDespesas}%
              </span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-4">

              <div
                className="bg-red-500 h-4 rounded-full"
                style={{
                  width: `${percentualDespesas}%`
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}