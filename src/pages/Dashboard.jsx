import {
  useMemo,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useFinance,
} from "../context/FinanceContext";

import FinanceChart
  from "../components/FinanceChart";

export default function Dashboard() {

  const {
    contas,
    formatCurrency,
    closeMonth,
    openMonth,
    isMonthClosed,
  } = useFinance();

  const today =
    new Date();

  const [
    selectedMonth,
    setSelectedMonth,
  ] = useState(
    today.getMonth() + 1
  );

  const [
    selectedYear,
    setSelectedYear,
  ] = useState(
    today.getFullYear()
  );

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function handlePreviousMonth() {

    if (selectedMonth === 1) {

      setSelectedMonth(12);

      setSelectedYear(
        (prev) => prev - 1
      );

      return;
    }

    setSelectedMonth(
      (prev) => prev - 1
    );
  }

  function handleNextMonth() {

    if (selectedMonth === 12) {

      setSelectedMonth(1);

      setSelectedYear(
        (prev) => prev + 1
      );

      return;
    }

    setSelectedMonth(
      (prev) => prev + 1
    );
  }

  const currentMonthContas =
    useMemo(() => {

      return contas.filter(
        (conta) =>
          conta.month ===
            selectedMonth &&
          conta.year ===
            selectedYear
      );

    }, [
      contas,
      selectedMonth,
      selectedYear,
    ]);

  const totalReceitas =
    currentMonthContas
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
    currentMonthContas
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

  const totalPago =
    currentMonthContas
      .filter(
        (conta) =>
          conta.status ===
          "Pago"
      )
      .reduce(
        (acc, conta) =>
          acc + conta.value,
        0
      );

  const totalPendente =
    currentMonthContas
      .filter(
        (conta) =>
          conta.status ===
          "Pendente"
      )
      .reduce(
        (acc, conta) =>
          acc + conta.value,
        0
      );

  const saldoAtual =
    totalReceitas -
    totalDespesas;

  const vencidas =
    currentMonthContas.filter(
      (conta) => {

        return (
          conta.status !==
            "Pago" &&
          new Date(
            conta.dueDate
          ) < new Date()
        );
      }
    );

  const highPriority =
    currentMonthContas.filter(
      (conta) =>
        conta.priority ===
        "alta"
    );

  const monthClosed =
    isMonthClosed(
      selectedMonth,
      selectedYear
    );

  function handleToggleMonth() {

    if (monthClosed) {

      openMonth(
        selectedMonth,
        selectedYear
      );

    } else {

      closeMonth(
        selectedMonth,
        selectedYear
      );
    }
  }

  return (

    <div className="space-y-8 text-white">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-5xl font-bold mb-4">

            Dashboard Financeiro

          </h1>

          <div className="flex items-center gap-4">

            <button
              onClick={
                handlePreviousMonth
              }
              className="
                bg-zinc-900
                border border-zinc-800
                hover:bg-zinc-800
                p-3
                rounded-xl
                transition
              "
            >

              <ChevronLeft
                size={20}
              />

            </button>

            <div className="
              bg-zinc-900
              border border-zinc-800
              px-6 py-3
              rounded-2xl
              text-xl
              font-semibold
            ">

              {
                monthNames[
                  selectedMonth - 1
                ]
              }
              {" "}
              {selectedYear}

            </div>

            <button
              onClick={
                handleNextMonth
              }
              className="
                bg-zinc-900
                border border-zinc-800
                hover:bg-zinc-800
                p-3
                rounded-xl
                transition
              "
            >

              <ChevronRight
                size={20}
              />

            </button>

          </div>

        </div>

        <button
          onClick={
            handleToggleMonth
          }
          className={`
            px-6 py-3
            rounded-2xl
            font-semibold
            transition-all
            ${
              monthClosed
                ? `
                  bg-green-500/10
                  border border-green-500/20
                  text-green-400
                `
                : `
                  bg-red-500/10
                  border border-red-500/20
                  text-red-400
                `
            }
          `}
        >

          {monthClosed
            ? "Mês Fechado"
            : "Mês Aberto"}

        </button>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <p className="text-zinc-400 mb-2">

            Receitas

          </p>

          <h2 className="text-3xl font-bold text-green-400">

            {formatCurrency(
              totalReceitas
            )}

          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <p className="text-zinc-400 mb-2">

            Despesas

          </p>

          <h2 className="text-3xl font-bold text-red-400">

            {formatCurrency(
              totalDespesas
            )}

          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <p className="text-zinc-400 mb-2">

            Saldo Atual

          </p>

          <h2 className={`text-3xl font-bold ${
            saldoAtual >= 0
              ? "text-blue-400"
              : "text-red-400"
          }`}>

            {formatCurrency(
              saldoAtual
            )}

          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <p className="text-zinc-400 mb-2">

            Pendências

          </p>

          <h2 className="text-3xl font-bold text-yellow-400">

            {
              vencidas.length
            }

          </h2>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-6">

            Contas Vencidas

          </h2>

          <div className="space-y-4">

            {vencidas.length ===
            0 ? (

              <p className="text-zinc-400">

                Nenhuma conta vencida.

              </p>

            ) : (

              vencidas.map(
                (conta) => (

                  <div
                    key={
                      conta.id
                    }
                    className="
                      bg-zinc-800
                      border border-zinc-700
                      rounded-xl
                      p-4
                    "
                  >

                    <div className="flex justify-between">

                      <div>

                        <p className="font-semibold">

                          {
                            conta.description
                          }

                        </p>

                        <p className="text-zinc-400 text-sm">

                          {
                            conta.category
                          }

                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-red-400 font-bold">

                          {formatCurrency(
                            conta.value
                          )}

                        </p>

                        <p className="text-zinc-500 text-sm">

                          {
                            conta.dueDate
                          }

                        </p>

                      </div>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-6">

            Alta Prioridade

          </h2>

          <div className="space-y-4">

            {highPriority.length ===
            0 ? (

              <p className="text-zinc-400">

                Nenhuma movimentação crítica.

              </p>

            ) : (

              highPriority.map(
                (conta) => (

                  <div
                    key={
                      conta.id
                    }
                    className="
                      bg-zinc-800
                      border border-zinc-700
                      rounded-xl
                      p-4
                    "
                  >

                    <div className="flex justify-between">

                      <div>

                        <p className="font-semibold">

                          {
                            conta.description
                          }

                        </p>

                        <p className="text-zinc-400 text-sm">

                          {
                            conta.category
                          }

                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-red-400 font-bold">

                          {formatCurrency(
                            conta.value
                          )}

                        </p>

                        <p className="text-zinc-500 text-sm">

                          {
                            conta.dueDate
                          }

                        </p>

                      </div>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>

      </div>

      <FinanceChart
        totalPago={
          totalPago
        }
        totalPendente={
          totalPendente
        }
      />

    </div>
  );
}