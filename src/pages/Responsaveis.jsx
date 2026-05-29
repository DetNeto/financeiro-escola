import {
  useMemo,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import ResponsaveisCards from "../components/responsaveis/ResponsaveisCards";

import ResponsaveisTable from "../components/responsaveis/ResponsaveisTable";

import ResponsavelModal from "../components/responsaveis/ResponsaveisModal";

import {

  loadResponsaveis,

  createResponsavel,

  updateResponsavel,

  deleteResponsavel,

  toggleResponsavelStatus,

} from "../services/responsaveisService";

export default function Responsaveis() {

  const initialFormData = {

    nome: "",

    tipo: "Ambos",

    cpf: "",

    rg: "",

    estadoCivil: "Solteiro(a)",

    nacionalidade: "",

    profissao: "",

    email: "",

    autorizacao:
      "Autorizado Retirada",

    ddi: "+55",

    ddd: "",

    telefone: "",

    whatsapp: "",

    endereco: "",

    numero: "",

    bairro: "",

    cidade: "",

    cep: "",

    convenio: "",

    observacoes: "",

    status: "Ativo",
  };

  const [search, setSearch] =
    useState("");

  const [
    editingResponsavelId,
    setEditingResponsavelId,
  ] = useState(null);

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);

  const [
    responsaveis,
    setResponsaveis,
  ] = useState(() =>
    loadResponsaveis()
  );

  const [formData, setFormData] =
    useState(initialFormData);

  function handleChange(
    field,
    value
  ) {

    setFormData(
      (prev) => ({

        ...prev,

        [field]: value,
      })
    );
  }

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
              .includes(search) ||

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

    setEditingResponsavelId(
      null
    );

    setFormData(
      initialFormData
    );
  }

  function openNewModal() {

    resetForm();

    setIsModalOpen(true);
  }

  function handleEditResponsavel(
    responsavel
  ) {

    setEditingResponsavelId(
      responsavel.id
    );

    setFormData({

      nome:
        responsavel.nome || "",

      tipo:
        responsavel.tipo || "Ambos",

      cpf:
        responsavel.cpf || "",

      rg:
        responsavel.rg || "",

      estadoCivil:
        responsavel.estadoCivil || "Solteiro(a)",

      nacionalidade:
        responsavel.nacionalidade || "",

      profissao:
        responsavel.profissao || "",

      email:
        responsavel.email || "",

      autorizacao:
        responsavel.autorizacao || "Autorizado Retirada",

      ddi:
        responsavel.ddi || "+55",

      ddd:
        responsavel.ddd || "",

      telefone:
        responsavel.telefone || "",

      whatsapp:
        responsavel.whatsapp ||

        responsavel.telefone2 ||

        "",

      endereco:
        responsavel.endereco || "",

      numero:
        responsavel.numero || "",

      bairro:
        responsavel.bairro || "",

      cidade:
        responsavel.cidade || "",

      cep:
        responsavel.cep || "",

      convenio:
        responsavel.convenio || "",

      observacoes:
        responsavel.observacoes || "",

      status:
        responsavel.status || "Ativo",
    });

    setIsModalOpen(true);
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

    const updatedResponsaveis =
      deleteResponsavel(id);

    setResponsaveis(
      updatedResponsaveis
    );
  }

  function handleToggleStatus(id) {

    const updatedResponsaveis =
      toggleResponsavelStatus(id);

    setResponsaveis(
      updatedResponsaveis
    );
  }

  function validateForm() {

    if (!formData.nome) {

      return "Informe o nome do responsável.";
    }

    if (!formData.cpf) {

      return "Informe o CPF do responsável.";
    }

    return null;
  }

  function handleSubmit(e) {

    e.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {

      alert(
        validationError
      );

      return;
    }

    const responsavelData = {

      id:
        editingResponsavelId,

      ...formData,
    };

    let updatedResponsaveis =
      [];

    if (
      editingResponsavelId
    ) {

      updatedResponsaveis =
        updateResponsavel(
          responsavelData
        );

    } else {

      updatedResponsaveis =
        createResponsavel(
          responsavelData
        );
    }

    setResponsaveis(
      updatedResponsaveis
    );

    resetForm();

    setIsModalOpen(false);
  }

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
          onClick={
            openNewModal
          }
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
        responsaveis={
          responsaveis
        }
      />

      <ResponsaveisTable

        search={search}

        setSearch={setSearch}

        filteredResponsaveis={
          filteredResponsaveis
        }

        toggleStatus={
          handleToggleStatus
        }

        handleEditResponsavel={
          handleEditResponsavel
        }

        handleRemoveResponsavel={
          handleRemoveResponsavel
        }
      />

      <ResponsavelModal

        isModalOpen={
          isModalOpen
        }

        setIsModalOpen={
          setIsModalOpen
        }

        formData={formData}

        handleChange={
          handleChange
        }

        handleSubmit={
          handleSubmit
        }

        editingResponsavelId={
          editingResponsavelId
        }
      />

    </div>
  );
}