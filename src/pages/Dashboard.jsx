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
  const receitasPrevistas = contas
  .filter(
    (conta) =>
      conta.type === "receita" &&
      conta.isRecurring
  )
  .reduce(
    (total, conta) =>
      total + conta.value,
    0
  );

const despesasPrevistas = contas
  .filter(
    (conta) =>
      conta.type === "despesa" &&
      conta.isRecurring
  )
  .reduce(
    (total, conta) =>
      total + conta.value,
    0
  );

const saldoPrevisto =
  receitasPrevistas -
  despesasPrevistas;
  let financialHealth = "";

let financialHealthColor = "";

if (saldoPrevisto > 10000) {

  financialHealth =
    "Saudável";

  financialHealthColor =
    "text-green-400";

} else if (
  saldoPrevisto > 0
) {

  financialHealth =
    "Atenção";

  financialHealthColor =
    "text-yellow-400";

} else {

  financialHealth =
    "Crítico";

  financialHealthColor =
    "text-red-400";
}
const totalPago = contas
  .filter(
    (conta) =>
      conta.status === "Pago"
  )
  .reduce(
    (total, conta) =>
      total + conta.value,
    0
  );

const totalPendente = contas
  .filter(
    (conta) =>
      conta.status === "Pendente"
  )
  .reduce(
    (total, conta) =>
      total + conta.value,
    0
  );

const totalVencido = contas
  .filter((conta) => {

    if (
      conta.status === "Pago"
    ) {
      return false;
    }

    return (
      new Date(conta.dueDate) <
      new Date()
    );
  })
  .reduce(
    (total, conta) =>
      total + conta.value,
    0
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
  
const proximosVencimentos =
  contas
    .filter(
      (conta) =>
        conta.status ===
        "Pendente"
    )
    .sort((a, b) => {

      return (
        new Date(a.dueDate) -
        new Date(b.dueDate)
      );
    })
    .slice(0, 5);
const prioridadesFinanceiras =
  contas.filter((conta) => {

    if (
      conta.status === "Pago"
    ) {
      return false;
    }

    const hoje =
      new Date();

    const vencimento =
      new Date(conta.dueDate);

    const diffTime =
      vencimento - hoje;

    const diffDays =
      Math.ceil(
        diffTime /
        (1000 * 60 * 60 * 24)
      );

    return diffDays <= 3;
  });    
  const despesasPorCategoria =
  contas
    .filter(
      (conta) =>
        conta.type ===
        "despesa"
    )
    .reduce((acc, conta) => {

      if (!acc[conta.category]) {

        acc[conta.category] = 0;
      }

      acc[conta.category] +=
        conta.value;

      return acc;

    }, {});    

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
      <div className="bg-slate-800 p-6 rounded-2xl mb-8">

  <h2 className="text-2xl font-bold mb-6">
    Prioridades do Dia
  </h2>

  <div className="space-y-4">

    {prioridadesFinanceiras.map(
      (conta) => {

        const hoje =
          new Date();

        const vencimento =
          new Date(conta.dueDate);

        const diffTime =
          vencimento - hoje;

        const diffDays =
          Math.ceil(
            diffTime /
            (
              1000 *
              60 *
              60 *
              24
            )
          );

        const isLate =
          diffDays < 0;

        return (

          <div
            key={conta.id}
            className={`p-4 rounded-xl flex justify-between items-center ${
  conta.priority === "alta"
    ? "bg-red-500/20 border border-red-500"

    : conta.priority === "media"
    ? "bg-yellow-500/20 border border-yellow-500"

    : "bg-blue-500/20 border border-blue-500"
}`}
          >

            <div>

              <p className="font-semibold">
                {conta.description}
              </p>

              <p className="text-sm text-slate-300">
                {conta.category}
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold">
                {formatCurrency(
                  conta.value
                )}
              </p>

              <p className="text-sm">

                {isLate
                  ? "Vencida"
                  : `Vence em ${diffDays} dia(s)`}

              </p>

            </div>

          </div>

        );
      }
    )}

  </div>

</div>

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

      <h2 className="text-3xl font-bold mt-20 mb-6">
  Resumo Mensal
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-12">

        <FinancialCard
          title="Receitas Previstas"
          value={formatCurrency(
            receitasPrevistas
          )}
          color="text-blue-400"
        />

      <FinancialCard
        title="Despesas Previstas"
        value={formatCurrency(
          despesasPrevistas
        )}
        color="text-red-400"
      />

      <FinancialCard
        title="Saldo Previsto"
        value={formatCurrency(
          saldoPrevisto
        )}
        color="text-green-400"
      />

</div>

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

  <div className="bg-slate-800 p-6 rounded-2xl mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Próximos Vencimentos
  </h2>

  <div className="space-y-4">

    {proximosVencimentos.map(
      (conta) => {

        const isCritical =
          conta.value >= 5000;

        return (

          <div
            key={conta.id}
            className={`flex justify-between items-center p-4 rounded-xl ${
              isCritical
                ? "bg-red-500/20 border border-red-500"
                : "bg-slate-700"
            }`}
          >

            <div>

              <p className="font-semibold">
                {conta.description}
              </p>

              <p className="text-sm text-slate-400">
                {conta.category}
              </p>

            </div>

            <div className="text-right">

              <p className="text-red-400 font-semibold">
                {formatCurrency(
                  conta.value
                )}
              </p>

              <p className="text-sm text-slate-400">
                {conta.dueDate}
              </p>

            </div>

          </div>

        );
      }
    )}

  </div>

</div>

<div className="bg-slate-800 p-6 rounded-2xl mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Despesas por Categoria
  </h2>

  <div className="grid grid-cols-3 gap-6 mt-8">

  <FinancialCard
    title="Já Pago"
    value={formatCurrency(
      totalPago
    )}
    color="text-green-400"
  />

  <FinancialCard
    title="Ainda Pendente"
    value={formatCurrency(
      totalPendente
    )}
    color="text-yellow-400"
  />

  <FinancialCard
    title="Valores Vencidos"
    value={formatCurrency(
      totalVencido
    )}
    color="text-red-400"
  />

</div>

  <div className="bg-slate-800 p-6 rounded-2xl mt-8">

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
            className="bg-slate-700 p-4 rounded-xl flex justify-between items-center"
          >

            <div>

              <p className="font-bold capitalize">
                {mes}
              </p>

              <p className="text-sm text-slate-400">

                Receitas:
                {" "}
                {formatCurrency(
                  dados.receitas
                )}

              </p>

              <p className="text-sm text-slate-400">

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

  <div className="space-y-4">

    {Object.entries(
      despesasPorCategoria
    ).map(
      ([categoria, valor]) => (

        <div
          key={categoria}
          className="flex justify-between items-center bg-slate-700 p-4 rounded-xl"
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