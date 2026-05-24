import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useFinance,
} from "../context/FinanceContext";

import FinancialTable from "../components/FinancialTable";

export default function ContasPagar() {

  const {
    contas,
    setContas,
    categories,
    addCategory,
    removeCategory,
    selectedMonth,
    selectedYear,
    isMonthClosed,
  } = useFinance();

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [value, setValue] =
    useState("");

  const [type, setType] =
    useState("despesa");

  const [priority, setPriority] =
    useState("media");

  const [isRecurring, setIsRecurring] =
    useState(false);

  const [recurrenceType, setRecurrenceType] =
    useState("mensal");

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("todos");

  const [filterType, setFilterType] =
    useState("todos");

  const filteredContas =
    useMemo(() => {

      return contas.filter((item) => {

        const itemMonth =
          new Date(
            item.dueDate
          ).getMonth() + 1;

        const itemYear =
          new Date(
            item.dueDate
          ).getFullYear();

        const matchMonth =
          itemMonth ===
            selectedMonth &&
          itemYear ===
            selectedYear;

        const matchSearch =
          item.description
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchStatus =
          filterStatus ===
            "todos" ||
          item.status ===
            filterStatus;

        const matchType =
          filterType ===
            "todos" ||
          item.type ===
            filterType;

        return (
          matchMonth &&
          matchSearch &&
          matchStatus &&
          matchType
        );
      });

    }, [
      contas,
      selectedMonth,
      selectedYear,
      search,
      filterStatus,
      filterType,
    ]);

  function resetForm() {

    setDescription("");
    setCategory("");
    setDueDate("");
    setValue("");
    setType("despesa");
    setPriority("media");
    setIsRecurring(false);
    setRecurrenceType("mensal");
    setEditingId(null);
  }

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !description ||
      !category ||
      !dueDate ||
      !value
    ) {

      alert(
        "Preencha todos os campos."
      );

      return;
    }

    const due =
      new Date(dueDate);

    const month =
      due.getMonth() + 1;

    const year =
      due.getFullYear();

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

  value:
    Number(value),

  status:
    "Pendente",

  type,
  priority,

  isRecurring,

  recurrenceType,

  month,
  year,
};

    if (editingId) {

      setContas((prev) =>
        prev.map((item) => {

          if (
            item.id ===
            editingId
          ) {

            return {
              ...item,
              ...contaData,
            };
          }

          return item;
        })
      );

    } else {

      setContas((prev) => [

        ...prev,

        {
          id:
            crypto.randomUUID(),

          ...contaData,
        },
      ]);
    }

    resetForm();
  }

  function handleDelete(id) {

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

    const confirmDelete =
      window.confirm(
        "Deseja excluir esta movimentação?"
      );

    if (!confirmDelete) {
      return;
    }

    setContas((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  function handleEdit(item) {

    if (
      isMonthClosed(
        item.month,
        item.year
      )
    ) {

      alert(
        "Este mês está fechado."
      );

      return;
    }

    setEditingId(item.id);

    setDescription(
      item.description
    );

    setCategory(
      item.category
    );

    setDueDate(
      item.dueDate
    );

    setValue(
      item.value
    );

    setType(
      item.type
    );

    setPriority(
      item.priority
    );

    setIsRecurring(
      item.isRecurring
    );

    setRecurrenceType(
      item.recurrenceType ||
        "mensal"
    );
  }

  function handleToggleStatus(id) {

    setContas((prevContas) => {

      const conta =
        prevContas.find(
          (item) =>
            item.id === id
        );

      if (!conta) {
        return prevContas;
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

        return prevContas;
      }

      let updatedContas =
        prevContas.map(
          (item) => {

            if (
              item.id === id
            ) {

              return {
                ...item,
                status:
                  item.status ===
                  "Pago"
                    ? "Pendente"
                    : "Pago",
              };
            }

            return item;
          }
        );

      const updatedConta =
        updatedContas.find(
          (item) =>
            item.id === id
        );

      if (
        updatedConta.status ===
          "Pago" &&
        updatedConta.isRecurring
      ) {

        const shouldGenerate =
          window.confirm(
            "Deseja gerar a próxima recorrência?"
          );

        if (shouldGenerate) {

          const nextDate =
            new Date(
              updatedConta.dueDate
            );

          if (
            updatedConta.recurrenceType ===
            "mensal"
          ) {

            nextDate.setMonth(
              nextDate.getMonth() + 1
            );

          } else if (
            updatedConta.recurrenceType ===
            "semanal"
          ) {

            nextDate.setDate(
              nextDate.getDate() + 7
            );

          } else if (
            updatedConta.recurrenceType ===
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
            updatedContas.some(
              (item) => {

                return (
                  item.description ===
                    updatedConta.description &&
                  item.dueDate ===
                    nextDueDate
                );
              }
            );

          if (!alreadyExists) {

            updatedContas = [

              ...updatedContas,

              {
                ...updatedConta,
                id:
                  crypto.randomUUID(),
                dueDate:
                  nextDueDate,
                month:
                  nextMonth,
                year:
                  nextYear,
                status:
                  "Pendente",
              },
            ];
          }
        }
      }

      return updatedContas;
    });
  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-black">
          Movimentações Financeiras
        </h1>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
        >

          <option value="">
            Categoria
          </option>

          {categories.map(
            (item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(
              e.target.value
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
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
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
        />

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
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
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
        >

          <option value="baixa">
            🟢 Baixa
          </option>

          <option value="media">
            🟡 Média
          </option>

          <option value="alta">
            🔴 Alta
          </option>

        </select>

        <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4 flex items-center gap-3">

          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) =>
              setIsRecurring(
                e.target.checked
              )
            }
          />

          <span>
            Conta Recorrente
          </span>

        </div>

        {isRecurring && (

          <select
            value={recurrenceType}
            onChange={(e) =>
              setRecurrenceType(
                e.target.value
              )
            }
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
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

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 transition rounded-xl px-6 py-4 font-bold"
        >

          {editingId
            ? "Salvar Alterações"
            : "Adicionar Conta"}

        </button>

      </form>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Buscar descrição..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
        />

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(
              e.target.value
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
        >

          <option value="todos">
            Todos os tipos
          </option>

          <option value="despesa">
            Despesas
          </option>

          <option value="receita">
            Receitas
          </option>

        </select>

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
        >

          <option value="todos">
            Todos os status
          </option>

          <option value="Pago">
            Pago
          </option>

          <option value="Pendente">
            Pendente
          </option>

        </select>

      </div>

      <FinancialTable
        data={filteredContas}
        onDelete={
          handleDelete
        }
        onEdit={
          handleEdit
        }
        onToggleStatus={
          handleToggleStatus
        }
      />

    </div>
  );
}