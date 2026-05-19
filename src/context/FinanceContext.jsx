import {
  createContext,
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
    dueDate: "10/05/2026",
    value: "R$ 2500",
    status: "Pendente",
  },

  {
    id: 2,
    description: "Energia Elétrica",
    category: "Utilidades",
    dueDate: "12/05/2026",
    value: "R$ 780",
    status: "Pago",
  },
];

export function FinanceProvider({
  children,
}) {

  const [contas, setContas] = useState(
    () => {

      const contasSalvas =
        localStorage.getItem("contas");

      return contasSalvas
        ? JSON.parse(contasSalvas)
        : initialData;
    }
  );

  useEffect(() => {

    localStorage.setItem(
      "contas",
      JSON.stringify(contas)
    );

  }, [contas]);

  return (

    <FinanceContext.Provider
      value={{
        contas,
        setContas,
      }}
    >

      {children}

    </FinanceContext.Provider>
  );
}