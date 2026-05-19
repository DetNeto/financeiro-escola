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
const totalReceitas = contas
  .filter(
    (conta) =>
      conta.type === "receita"
  )
.reduce((total, conta) => {

  const valor = conta.value;

  return total + valor;

}, 0);
const totalDespesas = contas
  .filter(
    (conta) =>
      conta.type === "despesa"
  )
  .reduce((total, conta) => {

  const valor = conta.value;

  return total + valor;

}, 0);
const saldo =
  totalReceitas - totalDespesas;
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
<FinanceChart
  totalPago={totalReceitas}
  totalPendente={totalDespesas}
/>
    </div>
  );
}