import {
  useMemo,
  useState,
  useEffect,
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

  const [dueRule, setDueRule] =
    useState("data_fixa");

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

  const [successMessage, setSuccessMessage] =
    useState("");

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

    useEffect(() => {

  const contasAtualizadas =

    contas.map((conta) => {

        if (

          (
            conta.status ===
              "Pendente" ||

            conta.status ===
              "Vencido"
          ) &&

          new Date(
            conta.dueDate
          ) < new Date()

        ) {

        const today =
          new Date();

        const dueDate =
          new Date(
            conta.dueDate
          );

        const diffTime =
          today - dueDate;

        const daysOverdue =
          Math.max(
            0,
            Math.floor(
              diffTime /
              (
                1000 *
                60 *
                60 *
                24
              )
            )
          );

        const originalValue =
          Number(
            conta.value
          );

        const lateFee =
          originalValue * 0.02;

        const dailyInterestRate =
          0.00033;

        const interest =
          originalValue *
          dailyInterestRate *
          daysOverdue;
        const isReceita =
          conta.type?.toLowerCase() ===
          "receita";
        const updatedValue =
          originalValue +
          lateFee +
          interest;
          console.log(
          conta.description,
          conta.type,
          isReceita
        );

let collectionStage =
  "Lembrete";        

let collectionMessage =
  isReceita

    ? "Sua mensalidade encontra-se em atraso."

    : "TESTE DESPESA";

let collectionColor =
  "yellow";

        if (
  daysOverdue >= 5
) {

  collectionStage =
    isReceita

      ? "Aviso de Atraso"

      : "Urgente";

  collectionMessage =
    isReceita

      ? "Seu débito permanece pendente."

      : "Esta despesa requer atenção administrativa.";

  collectionColor =
    "orange";
}

        if (
  daysOverdue >= 15
) {

  collectionStage =
    isReceita

      ? "Risco de Protesto"

      : "Crítico";

  collectionMessage =
    isReceita

      ? "Caso não haja regularização, poderá haver encaminhamento para protesto."

      : "Esta despesa encontra-se em atraso e requer ação imediata.";

  collectionColor =
    "red";
}

        if (
  daysOverdue >= 20
) {

  collectionStage =
    isReceita

      ? "Cobrança Extrajudicial"

      : "Pagamento Prioritário";

  collectionMessage =
    isReceita

      ? "A cobrança poderá ser encaminhada para cobrança extrajudicial."

      : "A regularização desta despesa deve ser priorizada.";

  collectionColor =
    "red";
}

        if (
  daysOverdue >= 30
) {

  collectionStage =
    isReceita

      ? "Departamento Jurídico"

      : "Risco Operacional";

  collectionMessage =
    isReceita

      ? "O caso poderá ser encaminhado ao departamento jurídico."

      : "A despesa apresenta risco operacional para a instituição.";

  collectionColor =
    "purple";
}
        return {

          ...conta,

          status:
            "Vencido",

          daysOverdue,

          originalValue,

          lateFee,

          interest,

          updatedValue,
          
          collectionStage,

          collectionMessage,

          collectionColor,
        };
      }

      return conta;
    });

const hasChanges =

  contasAtualizadas.some(
    (conta, index) => {

      return (

        JSON.stringify(conta) !==

        JSON.stringify(
          contas[index]
        )
      );
    }
  );

  if (hasChanges) {

    setContas(
      contasAtualizadas
    );
  }

}, [contas]);

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
    setDueRule("data_fixa");
    setValue("");
    setType("despesa");
    setPriority("media");
    setIsRecurring(false);
    setRecurrenceType("mensal");
    setEditingId(null);
  }

  function getNextBusinessDay(date) {

    const next =
      new Date(date);

    while (
      next.getDay() === 0 ||
      next.getDay() === 6
    ) {

      next.setDate(
        next.getDate() + 1
      );
    }

    return next;
  }

  function getLastBusinessDay(
    year,
    month
  ) {

    const lastDay =
      new Date(
        year,
        month + 1,
        0
      );

    while (
      lastDay.getDay() === 0 ||
      lastDay.getDay() === 6
    ) {

      lastDay.setDate(
        lastDay.getDate() - 1
      );
    }

    return lastDay;
  }

  function calculateNextDueDate(
    conta
  ) {

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

    if (
      conta.dueRule ===
      "primeiro_dia_util"
    ) {

      nextDate.setDate(1);

      return getNextBusinessDay(
        nextDate
      );
    }

    if (
      conta.dueRule ===
      "ultimo_dia_util"
    ) {

      return getLastBusinessDay(
        nextDate.getFullYear(),
        nextDate.getMonth()
      );
    }

    if (
      conta.dueRule ===
      "quinto_dia_util"
    ) {

      const temp =
        new Date(
          nextDate.getFullYear(),
          nextDate.getMonth(),
          1
        );

      let businessDays = 0;

      while (
        businessDays < 5
      ) {

        if (
          temp.getDay() !== 0 &&
          temp.getDay() !== 6
        ) {

          businessDays++;
        }

        if (
          businessDays < 5
        ) {

          temp.setDate(
            temp.getDate() + 1
          );
        }
      }

      return temp;
    }

    return nextDate;
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

      dueRule,

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

    setDueRule(
      item.dueRule ||
        "data_fixa"
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

    setSuccessMessage("");

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

                  conta.status ===
                  "Pago"

                    ? "Pendente"

                    : "Pago",

                paidAt:

                  conta.status ===
                  "Pago"

                ? null

                : new Date()
                  .toISOString(),
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
      
        const isInstitutionalRecurring =

          updatedConta.source ===
          "Matricula";

  if (
    !isInstitutionalRecurring
  ) {

  const shouldGenerate =
    window.confirm(
      "Deseja gerar a próxima recorrência?"
    );

  if (shouldGenerate) {

    const nextDate =
      calculateNextDueDate(
        updatedConta
      );

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

      setSuccessMessage(
        `Próxima recorrência criada para ${monthNames[nextMonth - 1]}/${nextYear}`
       );
    }
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

      {successMessage && (

        <div className="
          bg-green-500/10
          border border-green-500/20
          text-green-400
          px-6 py-4
          rounded-2xl
          font-medium
        ">

          {successMessage}

        </div>
      )}

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

        <select
          value={dueRule}
          onChange={(e) =>
            setDueRule(
              e.target.value
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-4"
        >

          <option value="data_fixa">
            Data fixa
          </option>

          <option value="primeiro_dia_util">
            Primeiro dia útil
          </option>

          <option value="quinto_dia_util">
            Quinto dia útil
          </option>

          <option value="ultimo_dia_util">
            Último dia útil
          </option>

        </select>

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

          <option value="Vencido">
            Vencido
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