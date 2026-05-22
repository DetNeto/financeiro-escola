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

  useEffect(() => {

    localStorage.setItem(
      "contas",
      JSON.stringify(contas)
    );

  }, [contas]);

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

  return (

    <FinanceContext.Provider
      value={{
        contas,
        setContas,
        formatCurrency,
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