import {
  useContext,
  useState,
} from "react";

import FinancialTable from "../components/FinancialTable";

import {
  FinanceContext,
} from "../context/FinanceContext";

export default function ContasPagar() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [type, setType] = useState("despesa");
  const [search, setSearch] =
  useState("");

const [filterType, setFilterType] =
  useState("todos");

const [filterStatus, setFilterStatus] =
  useState("todos");
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

    const contasAtualizadas = contas.map(
      (conta) => {

        if (conta.id === editingId) {

          return {
            ...conta,
            description,
            category,
            dueDate,
            value: Number(value),
          };
        }

        return conta;
      }
    );

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
    };

    setContas([...contas, novaConta]);
  }

  setDescription("");
  setCategory("");
  setDueDate("");
  setValue("");
}
function handleDeleteConta(id) {

  console.log("CLICOU", id);

  const novasContas = contas.filter(
    (conta) => conta.id !== id
  );

  setContas(novasContas);
}
function handleEditConta(conta) {

  setEditingId(conta.id);

  setDescription(conta.description);

  setCategory(conta.category);

  setDueDate(conta.dueDate);

  setValue(conta.value);

  setType(conta.type);
}
function handleToggleStatus(id) {

  const contasAtualizadas = contas.map(
    (conta) => {

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
    }
  );

  setContas(contasAtualizadas);
}
const filteredContas = contas.filter(
  (conta) => {

    const matchesSearch =
      conta.description
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesType =
      filterType === "todos"
        ? true
        : conta.type === filterType;

    const matchesStatus =
      filterStatus === "todos"
        ? true
        : conta.status === filterStatus;

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus
    );
  }
)
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

      {/* Formulário */}
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
              setDescription(e.target.value)
            }
            className="bg-slate-700 p-3 rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="bg-slate-700 p-3 rounded-xl outline-none"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="bg-slate-700 p-3 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            className="bg-slate-700 p-3 rounded-xl outline-none"
          />

        </div>
        <select
  value={type}
  onChange={(e) =>
    setType(e.target.value)
  }
  className="bg-slate-700 p-3 rounded-xl outline-none"
>

  <option value="despesa">
    Despesa
  </option>

  <option value="receita">
    Receita
  </option>

</select>

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

  <div className="grid grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Buscar descrição..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="bg-slate-700 p-3 rounded-xl outline-none"
    />

    <select
      value={filterType}
      onChange={(e) =>
        setFilterType(e.target.value)
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
        setFilterStatus(e.target.value)
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
  onToggleStatus={handleToggleStatus}
/>

    </div>
  );
}