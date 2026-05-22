import {
  useContext,
  useState,
} from "react";

import FinancialTable from "../components/FinancialTable";

import {
  FinanceContext,
} from "../context/FinanceContext";

export default function ContasPagar() {

  const expenseCategories = [
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

const revenueCategories = [
  "Mensalidades",
  "Matrículas",
  "Eventos",
  "Atividades Extras",
  "Reembolsos",
  "Outros",
];
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");
    const [
  revenueType,
  setRevenueType
] = useState("mensalidade");

  const [dueDate, setDueDate] =
    useState("");

  const [value, setValue] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [type, setType] =
    useState("despesa");
  
  const [
  priority,
  setPriority
] = useState("media");  

  const [isRecurring, setIsRecurring] =
    useState(false);

  const [
    recurrenceType,
    setRecurrenceType
  ] = useState("mensal");

  const [
    recurrenceRule,
    setRecurrenceRule
  ] = useState("dia_fixo");

  const [search, setSearch] =
    useState("");

  const [filterType, setFilterType] =
    useState("todos");

  const [
    filterStatus,
    setFilterStatus
  ] = useState("todos");

  const [
  quickFilter,
  setQuickFilter
] = useState("todos");

  const {
    contas,
    setContas,
  } = useContext(FinanceContext);

  function handleAddConta() {

    if (
      !description ||
      !category ||
      !dueDate ||
      !value
    ) {
      return;
    }

    if (editingId) {

      const contasAtualizadas =
        contas.map((conta) => {

          if (
            conta.id === editingId
          ) {

            return {
              ...conta,
              description,
              category,
              dueDate,
              value: Number(value),
              type,
              isRecurring,
              recurrenceType,
              recurrenceRule,
            };
          }

          return conta;
        });

      setContas(contasAtualizadas);

      setEditingId(null);

    } else {

      const novaConta = {
        id: Date.now(),
        description,
        category,
        dueDate,
        value: Number(value),
        status: "Pendente",
        type,
        isRecurring,
        recurrenceType,
        recurrenceRule,
        revenueType,
        priority,
      };

      setContas([
        ...contas,
        novaConta
      ]);
    }

    setDescription("");
    setCategory("");
    setDueDate("");
    setValue("");

    setType("despesa");

    setIsRecurring(false);

    setRecurrenceType("mensal");

    setRecurrenceRule("dia_fixo");
  }

  function handleDeleteConta(id) {

    const novasContas =
      contas.filter(
        (conta) =>
          conta.id !== id
      );

    setContas(novasContas);
  }

  function handleEditConta(conta) {

    setEditingId(conta.id);

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

    setIsRecurring(
      conta.isRecurring || false
    );

    setRecurrenceType(
      conta.recurrenceType ||
      "mensal"
    );

    setRecurrenceRule(
      conta.recurrenceRule ||
      "dia_fixo"
    );
  }

  function handleToggleStatus(id) {

    const contasAtualizadas =
      contas.map((conta) => {

        if (conta.id === id) {

          return {
            ...conta,
            status:
              conta.status === "Pago"
                ? "Pendente"
                : "Pago",
          };
        }

        return conta;
      });

    setContas(contasAtualizadas);
  }

  const filteredContas = contas
    .filter((conta) => {

      const matchesQuickFilter =
  quickFilter === "todos"
    ? true

    : quickFilter ===
      "alta_prioridade"
    ? conta.priority ===
      "alta"

    : quickFilter ===
      "recorrentes"
    ? conta.isRecurring

    : quickFilter ===
      "vencidas"
    ? conta.status !== "Pago" &&
      new Date(
        conta.dueDate
      ) < new Date()

    : true;

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

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesQuickFilter
      );
    })
    .sort((a, b) => {

      return (
        new Date(a.dueDate) -
        new Date(b.dueDate)
      );
    });

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Movimentações Financeiras
      </h1>

      <div className="bg-slate-800 p-6 rounded-2xl mb-8">

        <h2 className="text-2xl font-semibold mb-6">
          Nova Conta
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
            className="bg-slate-700 p-3 rounded-xl outline-none"
          />

          <select
  value={category}
  onChange={(e) =>
    setCategory(
      e.target.value
    )
  }
  className="bg-slate-700 p-3 rounded-xl outline-none"
>

  <option value="">
    Selecione uma categoria
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
            className="bg-slate-700 p-3 rounded-xl outline-none"
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
            className="bg-slate-700 p-3 rounded-xl outline-none"
          />

        </div>

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
          className="bg-slate-700 p-3 rounded-xl outline-none mt-4"
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
  className="bg-slate-700 p-3 rounded-xl outline-none mt-4 ml-4"
>

  <option value="alta">
    🔴 Prioridade Alta
  </option>

  <option value="media">
    🟡 Prioridade Média
  </option>

  <option value="baixa">
    🔵 Prioridade Baixa
  </option>

</select>

        {type === "receita" && (

  <select
    value={revenueType}
    onChange={(e) =>
      setRevenueType(
        e.target.value
      )
    }
    className="bg-slate-700 p-3 rounded-xl outline-none mt-4 ml-4"
  >

    <option value="mensalidade">
      Mensalidade
    </option>

    <option value="extra">
      Receita Extra
    </option>

    <option value="reembolso">
      Reembolso
    </option>

    <option value="outros">
      Outros
    </option>

  </select>

)}

        <div className="mt-4">

          <label className="flex items-center gap-3">

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
              Conta recorrente
            </span>

          </label>

          {isRecurring && (

            <div className="grid grid-cols-2 gap-4 mt-4">

              <select
                value={recurrenceType}
                onChange={(e) =>
                  setRecurrenceType(
                    e.target.value
                  )
                }
                className="bg-slate-700 p-3 rounded-xl outline-none"
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

              <select
                value={recurrenceRule}
                onChange={(e) =>
                  setRecurrenceRule(
                    e.target.value
                  )
                }
                className="bg-slate-700 p-3 rounded-xl outline-none"
              >

                <option value="dia_fixo">
                  Dia fixo
                </option>

                <option value="dia_util">
                  Dia útil
                </option>

                <option value="quinto_dia_util">
                  5º dia útil
                </option>

              </select>

            </div>

          )}

        </div>

        <button
          onClick={handleAddConta}
          className="mt-6 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-semibold transition"
        >

          {editingId
            ? "Salvar Alterações"
            : "Adicionar Conta"}

        </button>

      </div>

      <div className="bg-slate-800 p-6 rounded-2xl mb-8">

        <h2 className="text-2xl font-semibold mb-6">
          Filtros
        </h2>

        <div className="flex gap-3 mb-6 flex-wrap">

          <button
            onClick={() =>
              setQuickFilter(
                "todos"
              )
            }
            className="bg-slate-700 px-4 py-2 rounded-xl"
          >
            Todos
          </button>

          <button
            onClick={() =>
              setQuickFilter(
                "alta_prioridade"
              )
            }
            className="bg-red-500/20 border border-red-500 px-4 py-2 rounded-xl"
          >
            🔴 Alta Prioridade
          </button>

          <button
            onClick={() =>
              setQuickFilter(
                "recorrentes"
              )
            }
            className="bg-purple-500/20 border border-purple-500 px-4 py-2 rounded-xl"
          >
            🔁 Recorrentes
          </button>

          <button
            onClick={() =>
              setQuickFilter(
                "vencidas"
              )
            }
            className="bg-yellow-500/20 border border-yellow-500 px-4 py-2 rounded-xl"
          >
            📅 Vencidas
          </button>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Buscar descrição..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-slate-700 p-3 rounded-xl outline-none"
          />

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(
                e.target.value
              )
            }
            className="bg-slate-700 p-3 rounded-xl outline-none"
          >

            <option value="todos">
              Todos os tipos
            </option>

            <option value="receita">
              Receitas
            </option>

            <option value="despesa">
              Despesas
            </option>

          </select>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            className="bg-slate-700 p-3 rounded-xl outline-none"
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

      </div>

      <FinancialTable
        data={filteredContas}
        onDelete={handleDeleteConta}
        onEdit={handleEditConta}
        onToggleStatus={
          handleToggleStatus
        }
      />

    </div>
  );
}