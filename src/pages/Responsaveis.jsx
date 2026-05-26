import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import ResponsaveisCards from "../components/responsaveis/ResponsaveisCards";

import ResponsaveisTable from "../components/responsaveis/ResponsaveisTable";

import ResponsaveisModal from "../components/responsaveis/ResponsaveisModal";

export default function Responsaveis() {

  const emptyForm = {

    nome: "",

    tipo: "Ambos",

    cpf: "",

    rg: "",

    estadoCivil: "Solteiro(a)",

    nacionalidade: "",

    profissao: "",

    email: "",

    responsavelSecundario: "",

    ddiTelefone: "+55",

    dddTelefone: "",

    telefone: "",

    whatsapp: "",

    endereco: "",

    numero: "",

    bairro: "",

    cidade: "",

    cep: "",

    planoSaude: "",

    carteirinha: "",

    autorizadoRetirada: "Sim",

    observacoes: "",

    status: "Ativo",
  };

  const [responsaveis, setResponsaveis] =
    useState([
      {
        id:
          crypto.randomUUID(),

        codigo:
          "RESP-2026-0001",

        nome:
          "Mariana Silva",

        tipo:
          "Ambos",

        cpf:
          "123.456.789-00",

        rg:
          "1098765432",

        estadoCivil:
          "Casado(a)",

        nacionalidade:
          "Brasileira",

        profissao:
          "Professora",

        email:
          "mariana@email.com",

        responsavelSecundario:
          "",

        ddiTelefone:
          "+55",

        dddTelefone:
          "55",

        telefone:
          "3025-0000",

        whatsapp:
          "99999-9999",

        endereco:
          "Rua das Flores",

        numero:
          "123",

        bairro:
          "Centro",

        cidade:
          "Santa Maria",

        cep:
          "97000-000",

        planoSaude:
          "Unimed",

        carteirinha:
          "RESP-2026-0001",

        autorizadoRetirada:
          "Sim",

        observacoes:
          "Autorizada para retirada.",

        status:
          "Ativo",
      },
    ]);

  const [form, setForm] =
    useState(emptyForm);

  const [editingId, setEditingId] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const filteredResponsaveis =
    useMemo(() => {

      return responsaveis.filter(
        (responsavel) => {

          return (

            responsavel.nome
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            responsavel.cpf
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            responsavel.email
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }
      );

    }, [
      responsaveis,
      search,
    ]);

  function resetForm() {

    setEditingId(null);

    setForm(emptyForm);
  }

  function openNewModal() {

    resetForm();

    setIsModalOpen(true);
  }

  function handleEditResponsavel(
    responsavel
  ) {

    setEditingId(
      responsavel.id
    );

    setForm(
      responsavel
    );

    setIsModalOpen(true);
  }

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.nome ||
      !form.cpf ||
      !form.email
    ) {

      alert(
        "Preencha os campos obrigatórios."
      );

      return;
    }

    const numeroResponsavel =
      String(
        responsaveis.length + 1
      ).padStart(4, "0");

    const codigoResponsavel =
      `RESP-2026-${numeroResponsavel}`;

    const responsavelData = {

      ...form,

      id:
        editingId ||
        crypto.randomUUID(),

      codigo:
        editingId

          ? form.codigo

          : codigoResponsavel,

      carteirinha:
        editingId

          ? form.carteirinha

          : codigoResponsavel,
    };

    if (editingId) {

      setResponsaveis(
        (prev) =>

          prev.map(
            (item) =>

              item.id === editingId

                ? responsavelData

                : item
          )
      );

    } else {

      setResponsaveis(
        (prev) => [
          ...prev,
          responsavelData,
        ]
      );
    }

    resetForm();

    setIsModalOpen(false);
  }

  function handleRemoveResponsavel(
    id,
    nome
  ) {

    const confirmDelete =
      window.confirm(
        `Deseja remover o responsável ${nome}?`
      );

    if (!confirmDelete) {
      return;
    }

    setResponsaveis(
      (prev) =>

        prev.filter(
          (item) =>
            item.id !== id
        )
    );
  }

  function toggleStatus(id) {

    setResponsaveis(
      (prev) =>

        prev.map(
          (item) => {

            if (
              item.id !== id
            ) {

              return item;
            }

            return {

              ...item,

              status:
                item.status ===
                "Ativo"

                  ? "Inativo"

                  : "Ativo",
            };
          }
        )
    );
  }

  const selectStyles = {

    control: (base) => ({
      ...base,

      backgroundColor:
        "#27272a",

      borderColor:
        "#3f3f46",

      minHeight:
        "56px",

      borderRadius:
        "12px",
    }),

    menu: (base) => ({
      ...base,

      backgroundColor:
        "#18181b",
    }),

    singleValue: (base) => ({
      ...base,

      color:
        "#ffffff",
    }),

    input: (base) => ({
      ...base,

      color:
        "#ffffff",
    }),

    option: (
      base,
      state
    ) => ({
      ...base,

      backgroundColor:
        state.isFocused

          ? "#3f3f46"

          : "#18181b",

      color:
        "#ffffff",

      cursor:
        "pointer",
    }),
  };

  return (

    <div className="
      space-y-8
      text-white
    ">

      <div className="
        flex
        justify-between
        items-center
      ">

        <div>

          <h1 className="
            text-5xl
            font-black
          ">

            Responsáveis

          </h1>

          <p className="
            text-zinc-400
            mt-2
            text-lg
          ">

            Gestão institucional de responsáveis legais e financeiros.

          </p>

        </div>

        <button
          onClick={openNewModal}
          className="
            flex items-center gap-3

            bg-blue-600
            hover:bg-blue-500

            transition

            px-6 py-4

            rounded-2xl

            font-bold
          "
        >

          <Plus size={20} />

          Novo Responsável

        </button>

      </div>

      <ResponsaveisCards
        responsaveis={responsaveis}
      />

      <ResponsaveisTable

        search={search}

        setSearch={setSearch}

        filteredResponsaveis={
          filteredResponsaveis
        }

        toggleStatus={
          toggleStatus
        }

        handleEditResponsavel={
          handleEditResponsavel
        }

        handleRemoveResponsavel={
          handleRemoveResponsavel
        }
      />

      <ResponsaveisModal

        responsaveis={
          responsaveis
        }

        isModalOpen={
          isModalOpen
        }

        setIsModalOpen={
          setIsModalOpen
        }

        editingId={
          editingId
        }

        form={form}

        setForm={setForm}

        handleSubmit={
          handleSubmit
        }

        resetForm={
          resetForm
        }

        selectStyles={
          selectStyles
        }
      />

    </div>
  );
}