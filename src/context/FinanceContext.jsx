import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const FinanceContext =
  createContext();

const defaultCategories = [

  "Folha Salarial",
  "Aluguel",
  "Combustível",
  "Energia",
  "Água",
  "Internet",
  "Impostos",
  "Prestadores de Serviço",
  "Alimentação",
  "Material Escolar",
  "Limpeza",
  "Manutenção",
  "Mensalidades",
  "Outros",
];

const initialData = [];

export function FinanceProvider({
  children,
}) {

  const [contas, setContas] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "contas"
        );

      return saved
        ? JSON.parse(saved)
        : initialData;
    });

  const [categories, setCategories] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "categories"
        );

      return saved
        ? JSON.parse(saved)
        : defaultCategories;
    });

  const [selectedMonth, setSelectedMonth] =
    useState(() => {

      const savedMonth =
        localStorage.getItem(
          "selectedMonth"
        );

      if (savedMonth) {
        return Number(savedMonth);
      }

      return (
        new Date().getMonth() + 1
      );
    });

  const [selectedYear, setSelectedYear] =
    useState(() => {

      const savedYear =
        localStorage.getItem(
          "selectedYear"
        );

      if (savedYear) {
        return Number(savedYear);
      }

      return new Date()
        .getFullYear();
    });

  const [closedMonths, setClosedMonths] =
    useState(() => {

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
      "categories",
      JSON.stringify(categories)
    );

  }, [categories]);

  useEffect(() => {

    localStorage.setItem(
      "closedMonths",
      JSON.stringify(
        closedMonths
      )
    );

  }, [closedMonths]);

  useEffect(() => {

    localStorage.setItem(
      "selectedMonth",
      selectedMonth
    );

  }, [selectedMonth]);

  useEffect(() => {

    localStorage.setItem(
      "selectedYear",
      selectedYear
    );

  }, [selectedYear]);

  function normalizeText(text) {

    return text
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .toLowerCase()
      .trim();
  }

  function addCategory(
    newCategory
  ) {

    const normalizedNew =
      normalizeText(
        newCategory
      );

    const alreadyExists =
      categories.some(
        (item) => {

          return (
            normalizeText(
              item
            ) ===
            normalizedNew
          );
        }
      );

    if (alreadyExists) {

      return {
        success: false,
        message:
          "Categoria já existe.",
      };
    }

    const withoutOthers =
      categories.filter(
        (item) =>
          item !== "Outros"
      );

    const updated = [

      ...withoutOthers,

      newCategory,

      "Outros",
    ];

    setCategories(updated);

    return {
      success: true,
    };
  }

  function removeCategory(
    categoryToRemove
  ) {

    const linkedContas =
      contas.some(
        (item) =>
          item.category ===
          categoryToRemove
      );

    if (linkedContas) {

      return {
        success: false,
        message:
          "Existem movimentações usando esta categoria.",
      };
    }

    if (
      categoryToRemove ===
      "Outros"
    ) {

      return {
        success: false,
        message:
          "A categoria 'Outros' não pode ser removida.",
      };
    }

    setCategories((prev) =>
      prev.filter(
        (item) =>
          item !==
          categoryToRemove
      )
    );

    return {
      success: true,
    };
  }

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

  function closeMonth(
    month,
    year
  ) {

    const exists =
      closedMonths.some(
        (item) => {

          return (
            item.month ===
              month &&
            item.year ===
              year
          );
        }
      );

    if (exists) {
      return;
    }

    setClosedMonths((prev) => [

      ...prev,

      {
        month,
        year,
      },
    ]);
  }

  function reopenMonth(
    month,
    year
  ) {

    setClosedMonths((prev) =>
      prev.filter(
        (item) => {

          return !(
            item.month ===
              month &&
            item.year ===
              year
          );
        }
      )
    );
  }

  function isMonthClosed(
    month,
    year
  ) {

    return closedMonths.some(
      (item) => {

        return (
          item.month ===
            month &&
          item.year ===
            year
        );
      }
    );
  }

  const dashboardData =
    useMemo(() => {

      return contas.filter(
        (item) => {

          const due =
            new Date(
              item.dueDate
            );

          const month =
            due.getMonth() + 1;

          const year =
            due.getFullYear();

          return (
            month ===
              selectedMonth &&
            year ===
              selectedYear
          );
        }
      );

    }, [
      contas,
      selectedMonth,
      selectedYear,
    ]);

  return (

    <FinanceContext.Provider
      value={{

        contas,
        setContas,

        categories,
        addCategory,
        removeCategory,

        selectedMonth,
        setSelectedMonth,

        selectedYear,
        setSelectedYear,

        closedMonths,
        closeMonth,
        reopenMonth,
        isMonthClosed,

        dashboardData,

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