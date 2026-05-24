import {
  useContext,
  useEffect,
  useState,
} from "react";

import FinancialTable
  from "../components/FinancialTable";

import {
  FinanceContext,
} from "../context/FinanceContext";

export default function ContasPagar() {

  const {
    contas,
    setContas,
    isMonthClosed,
  } = useContext(
    FinanceContext
  );

  const defaultExpenseCategories = [
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
    "Outros",
  ];

  const defaultRevenueCategories = [
    "Mensalidades",
    "Matrículas",
    "Eventos",
    "Atividades Extras",
    "Reembolsos",
    "Outros",
  ];

  const [
    expenseCategories,
    setExpenseCategories
  ] = useState(() => {

    const saved =
      localStorage.getItem(
        "expenseCategories"
      );

    return saved
      ? JSON.parse(saved)
      : defaultExpenseCategories;
  });

  const [
    revenueCategories,
    setRevenueCategories
  ] = useState(() => {

    const saved =
      localStorage.getItem(
        "revenueCategories"
      );

    return saved
      ? JSON.parse(saved)
      : defaultRevenueCategories;
  });

  useEffect(() => {

    localStorage.setItem(
      "expenseCategories",
      JSON.stringify(
        expenseCategories
      )
    );

  }, [expenseCategories]);

  useEffect(() => {

    localStorage.setItem(
      "revenueCategories",
      JSON.stringify(
        revenueCategories
      )
    );

  }, [revenueCategories]);

  const [
    description,
    setDescription
  ] = useState("");

  const [
    category,
    setCategory
  ] = useState("");

  const [
    dueDate,
    setDueDate
  ] = useState("");

  const [
    value,
    setValue
  ] = useState("");

  const [
    type,
    setType
  ] = useState("despesa");

  const [
    priority,
    setPriority
  ] = useState("media");

  const [
    editingId,
    setEditingId
  ] = useState(null);

  const [
    search,
    setSearch
  ] = useState("");

  const [
    filterType,
    setFilterType
  ] = useState("todos");

  const [
    filterStatus,
    setFilterStatus
  ] = useState("todos");

  const [
    quickFilter,
    setQuickFilter
  ] = useState("todos");

  const [
    isRecurring,
    setIsRecurring
  ] = useState(false);

  const [
    recurrenceType,
    setRecurrenceType
  ] = useState("mensal");

  function normalizeText(text) {

    return text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      );
  }

  function resetForm() {

    setDescription("");
    setCategory("");
    setDueDate("");
    setValue("");

    setType("despesa");

    setPriority("media");

    setIsRecurring(false);

    setRecurrenceType(
      "mensal"
    );

    setEditingId(null);
  }

  function handleAddConta() {

    if (
      !description ||
      !category ||
      !dueDate ||
      !value
    ) {
      return;
    }

    const date =
      new Date(dueDate);

    const month =
      date.getMonth() + 1;

    const year =
      date.getFullYear();

    if (
      isMonthClosed(
        month,
        year
      )
    ) {

      alert(
        "Este mês está fechado."
      );

      return;
    }

    const contaData = {
      description,
      category,
      dueDate,
      month,
      year,
      value: Number(value),
      type,
      priority,
      isRecurring,
      recurrenceType,
    };

    if (editingId) {

      const updated =
        contas.map((conta) => {

          if (
            conta.id ===
            editingId
          ) {

            return {
              ...conta,
              ...contaData,
            };
          }

          return conta;
        });

      setContas(updated);

    } else {

      const novaConta = {
        id: Date.now(),
        status: "Pendente",
        ...contaData,
      };

      setContas([
        ...contas,
        novaConta,
      ]);
    }

    resetForm();
  }

  function generateNextRecurring(
    conta
  ) {

    const shouldGenerate =
      window.confirm(
        "Deseja gerar a próxima recorrência?"
      );

    if (!shouldGenerate) {
      return;
    }

    const nextDate =
      new Date(
        conta.dueDate
      );

    if (
      conta.recurrenceType ===
      "mensal"
    ) {

      nextDate.setMonth(
        nextDate.getMonth() + 1
      );

    } else if (
      conta.recurrenceType ===
      "semanal"
    ) {

      nextDate.setDate(
        nextDate.getDate() + 7
      );

    } else if (
      conta.recurrenceType ===
      "anual"
    ) {

      nextDate.setFullYear(
        nextDate.getFullYear() + 1
      );
    }

    const nextMonth =
      nextDate.getMonth() + 1;

    const nextYear =
      nextDate.getFullYear();

    const nextDueDate =
      nextDate
        .toISOString()
        .split("T")[0];

    const alreadyExists =
      contas.some(
        (item) => {

          return (
            item.description ===
              conta.description &&
            item.dueDate ===
              nextDueDate
          );
        }
      );

    if (alreadyExists) {

      alert(
        "A próxima recorrência já existe."
      );

      return;
    }

    const newConta = {
      ...conta,
      id: Date.now(),
      dueDate:
        nextDueDate,
      month:
        nextMonth,
      year:
        nextYear,
      status:
        "Pendente",
    };

    setContas(
      (prev) => [
        ...prev,
        newConta,
      ]
    );
  }

  function handleToggleStatus(id) {

    const conta =
      contas.find(
        (item) =>
          item.id === id
      );

    if (!conta) {
      return;
    }

    if (
      isMonthClosed(
        conta.month,
        conta.year
      )
    ) {

      alert(
        "Este mês está fechado."
      );

      return;
    }

    const updated =
      contas.map((conta) => {

        if (
          conta.id === id
        ) {

          const newStatus =
            conta.status ===
            "Pago"
              ? "Pendente"
              : "Pago";

          if (
            newStatus ===
              "Pago" &&
            conta.isRecurring
          ) {

            generateNextRecurring(
              conta
            );
          }

          return {
            ...conta,
            status:
              newStatus,
          };
        }

        return conta;
      });

    setContas(updated);
  }

  function handleDeleteConta(id) {

    const conta =
      contas.find(
        (item) =>
          item.id === id
      );

    if (!conta) {
      return;
    }

    if (
      isMonthClosed(
        conta.month,
        conta.year
      )
    ) {

      alert(
        "Este mês está fechado."
      );

      return;
    }

    const updated =
      contas.filter(
        (conta) =>
          conta.id !== id
      );

    setContas(updated);
  }

  function handleEditConta(conta) {

    if (
      isMonthClosed(
        conta.month,
        conta.year
      )
    ) {

      alert(
        "Este mês está fechado."
      );

      return;
    }

    setEditingId(
      conta.id
    );

    setDescription(
      conta.description
    );

    setCategory(
      conta.category
    );

    setDueDate(
      conta.dueDate
    );

    setValue(
      conta.value
    );

    setType(
      conta.type
    );

    setPriority(
      conta.priority
    );

    setIsRecurring(
      conta.isRecurring ||
      false
    );

    setRecurrenceType(
      conta.recurrenceType ||
      "mensal"
    );
  }

  const filteredContas =
    contas
      .filter((conta) => {

        const matchesSearch =
          conta.description
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesType =
          filterType === "todos"
            ? true
            : conta.type ===
              filterType;

        const matchesStatus =
          filterStatus === "todos"
            ? true
            : conta.status ===
              filterStatus;

        const matchesQuickFilter =
          quickFilter === "todos"

            ? true

            : quickFilter ===
              "alta"

            ? conta.priority ===
              "alta"

            : quickFilter ===
              "vencidas"

            ? conta.status !==
                "Pago" &&
              new Date(
                conta.dueDate
              ) < new Date()

            : true;

        return (
          matchesSearch &&
          matchesType &&
          matchesStatus &&
          matchesQuickFilter
        );
      })
      .sort((a, b) => {

        return (
          new Date(
            a.dueDate
          ) -
          new Date(
            b.dueDate
          )
        );
      });

  return (

    <div className="min-h-screen text-white">

      <h1 className="text-5xl font-bold mb-10">

        Movimentações Financeiras

      </h1>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl mb-8">

        <h2 className="text-2xl font-bold mb-6">

          Nova Movimentação

        </h2>

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
              outline-none
            "
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
              outline-none
            "
          >

            <option value="">
              Categoria
            </option>

            {(type === "despesa"
              ? expenseCategories
              : revenueCategories
            ).map((categoria) => (

              <option
                key={categoria}
                value={categoria}
              >

                {categoria}

              </option>

            ))}

          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
              outline-none
            "
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(e) =>
              setValue(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
              outline-none
            "
          />

        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">

          <select
            value={type}
            onChange={(e) =>
              setType(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
              outline-none
            "
          >

            <option value="despesa">
              Despesa
            </option>

            <option value="receita">
              Receita
            </option>

          </select>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="
              bg-zinc-800
              border border-zinc-700
              rounded-xl
              px-4 py-4
              outline-none
            "
          >

            <option value="alta">
              🔴 Alta
            </option>

            <option value="media">
              🟡 Média
            </option>

            <option value="baixa">
              🔵 Baixa
            </option>

          </select>

          <label className="
            flex items-center gap-3
            bg-zinc-800
            border border-zinc-700
            rounded-xl
            px-4 py-4
          ">

            <input
              type="checkbox"
              checked={
                isRecurring
              }
              onChange={(e) =>
                setIsRecurring(
                  e.target.checked
                )
              }
            />

            Conta Recorrente

          </label>

          {isRecurring && (

            <select
              value={
                recurrenceType
              }
              onChange={(e) =>
                setRecurrenceType(
                  e.target.value
                )
              }
              className="
                bg-zinc-800
                border border-zinc-700
                rounded-xl
                px-4 py-4
                outline-none
              "
            >

              <option value="mensal">
                Mensal
              </option>

              <option value="semanal">
                Semanal
              </option>

              <option value="anual">
                Anual
              </option>

            </select>

          )}

        </div>

        <button
          onClick={handleAddConta}
          className="
            mt-6
            bg-blue-600
            hover:bg-blue-500
            px-6 py-4
            rounded-xl
            font-semibold
            transition-all
          "
        >

          {editingId
            ? "Salvar Alterações"
            : "Adicionar Conta"}

        </button>

      </div>

      <FinancialTable
        data={filteredContas}
        onDelete={
          handleDeleteConta
        }
        onEdit={
          handleEditConta
        }
        onToggleStatus={
          handleToggleStatus
        }
      />

    </div>
  );
}