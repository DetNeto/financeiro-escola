import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const FinanceContext =
  createContext();

const initialData = [
  {
    id: 1,
    description: "Aluguel",
    category: "Estrutura",
    dueDate: "2026-05-10",
    month: 5,
    year: 2026,
    value: 2500,
    status: "Pendente",
    type: "despesa",
    priority: "alta",
  },

  {
    id: 2,
    description: "Energia Elétrica",
    category: "Utilidades",
    dueDate: "2026-05-12",
    month: 5,
    year: 2026,
    value: 780,
    status: "Pago",
    type: "despesa",
    priority: "media",
  },
];

export function FinanceProvider({
  children,
}) {

  const [contas, setContas] =
    useState(() => {

      const contasSalvas =
        localStorage.getItem(
          "contas"
        );

      return contasSalvas
        ? JSON.parse(contasSalvas)
        : initialData;
    });

  const [
    closedMonths,
    setClosedMonths
  ] = useState(() => {

    const saved =
      localStorage.getItem(
        "closedMonths"
      );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {

    localStorage.setItem(
      "contas",
      JSON.stringify(contas)
    );

  }, [contas]);

  useEffect(() => {

    localStorage.setItem(
      "closedMonths",
      JSON.stringify(
        closedMonths
      )
    );

  }, [closedMonths]);

  function formatCurrency(
    value
  ) {

    return Number(
      value
    ).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  function getMonthKey(
    month,
    year
  ) {

    return `${year}-${String(
      month
    ).padStart(2, "0")}`;
  }

  function isMonthClosed(
    month,
    year
  ) {

    const key =
      getMonthKey(
        month,
        year
      );

    return closedMonths.includes(
      key
    );
  }

  function closeMonth(
    month,
    year
  ) {

    const key =
      getMonthKey(
        month,
        year
      );

    if (
      closedMonths.includes(
        key
      )
    ) {
      return;
    }

    setClosedMonths([
      ...closedMonths,
      key,
    ]);
  }

  function openMonth(
    month,
    year
  ) {

    const key =
      getMonthKey(
        month,
        year
      );

    const updated =
      closedMonths.filter(
        (item) =>
          item !== key
      );

    setClosedMonths(
      updated
    );
  }

  function getCurrentMonthData() {

    const now =
      new Date();

    const month =
      now.getMonth() + 1;

    const year =
      now.getFullYear();

    return contas.filter(
      (conta) =>
        conta.month ===
          month &&
        conta.year ===
          year
    );
  }

  return (

    <FinanceContext.Provider
      value={{

        contas,
        setContas,

        closedMonths,

        closeMonth,
        openMonth,

        isMonthClosed,

        formatCurrency,

        getMonthKey,

        getCurrentMonthData,

      }}
    >

      {children}

    </FinanceContext.Provider>

  );
}

export function useFinance() {

  return useContext(
    FinanceContext
  );
}