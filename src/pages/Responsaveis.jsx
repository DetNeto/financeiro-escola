import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import ResponsaveisCards from "../components/responsaveis/ResponsaveisCards";

import ResponsaveisTable from "../components/responsaveis/ResponsaveisTable";

import ResponsavelModal from "../components/responsaveis/ResponsaveisModal";

export default function Responsaveis() {

  const STORAGE_KEY =
    "erp-escolar-responsaveis";

  const [search, setSearch] =
    useState("");

  const [editingResponsavelId, setEditingResponsavelId] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [responsaveis, setResponsaveis] =
    useState(() => {

      const savedResponsaveis =
        localStorage.getItem(
          STORAGE_KEY
        );

      return savedResponsaveis

        ? JSON.parse(
            savedResponsaveis
          )

        : [
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
                "00000000000",

              rg:
                "000000000",

              estadoCivil:
                "Casado(a)",

              nacionalidade:
                "Brasileira",

              profissao:
                "Empresária",

              email:
                "mariana@email.com",

              autorizacao:
                "Autorizado Retirada",

              ddi:
                "+55",

              ddd:
                "55",

              telefone:
                "999999999",

              telefone2:
                "999999999",

              endereco:
                "Rua Central",

              numero:
                "100",

              bairro:
                "Centro",

              cidade:
                "Santa Maria",

              cep:
                "97000000",

              convenio:
                "Unimed",

              observacoes:
                "",

              status:
                "Ativo",
            },
          ];
    });

  const [formData, setFormData] =
    useState({

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

      telefone2: "",

      endereco: "",

      numero: "",

      bairro: "",

      cidade: "",

      cep: "",

      convenio: "",

      observacoes: "",

      status: "Ativo",
    });

  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        responsaveis
      )
    );

  }, [responsaveis]);

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

    setFormData({

      nome: "",

      tipo: "Ambos",

      cpf: "",

      rg: "",

      estadoCivil:
        "Solteiro(a)",

      nacionalidade: "",

      profissao: "",

      email: "",

      autorizacao:
        "Autorizado Retirada",

      ddi: "+55",

      ddd: "",

      telefone: "",

      telefone2: "",

      endereco: "",

      numero: "",

      bairro: "",

      cidade: "",

      cep: "",

      convenio: "",

      observacoes: "",

      status: "Ativo",
    });
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
        responsavel.nome,

      tipo:
        responsavel.tipo,

      cpf:
        responsavel.cpf,

      rg:
        responsavel.rg,

      estadoCivil:
        responsavel.estadoCivil,

      nacionalidade:
        responsavel.nacionalidade,

      profissao:
        responsavel.profissao,

      email:
        responsavel.email,

      autorizacao:
        responsavel.autorizacao,

      ddi:
        responsavel.ddi,

      ddd:
        responsavel.ddd,

      telefone:
        responsavel.telefone,

      telefone2:
        responsavel.telefone2,

      endereco:
        responsavel.endereco,

      numero:
        responsavel.numero,

      bairro:
        responsavel.bairro,

      cidade:
        responsavel.cidade,

      cep:
        responsavel.cep,

      convenio:
        responsavel.convenio,

      observacoes:
        responsavel.observacoes,

      status:
        responsavel.status,
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
          (responsavel) => {

            if (
              responsavel.id !== id
            ) {

              return responsavel;
            }

            return {

              ...responsavel,

              status:
                responsavel.status ===
                "Ativo"

                  ? "Inativo"

                  : "Ativo",
            };
          }
        )
    );
  }

  function generateCode() {

    const total =
      responsaveis.length + 1;

    return `RESP-2026-${String(
      total
    ).padStart(4, "0")}`;
  }

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !formData.nome ||
      !formData.cpf
    ) {

      alert(
        "Preencha os campos obrigatórios."
      );

      return;
    }

    const responsavelData = {

      id:
        editingResponsavelId ||
        crypto.randomUUID(),

      codigo:
        editingResponsavelId

          ? responsaveis.find(
              (item) =>
                item.id ===
                editingResponsavelId
            )?.codigo

          : generateCode(),

      ...formData,
    };

    if (editingResponsavelId) {

      setResponsaveis(
        (prev) =>

          prev.map(
            (item) =>

              item.id ===
              editingResponsavelId

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
          toggleStatus
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

        setFormData={
          setFormData
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