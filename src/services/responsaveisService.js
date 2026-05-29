import {

  getResponsaveis,

  saveResponsaveis,

} from "../storage/responsaveisStorage";

export function loadResponsaveis() {

  return getResponsaveis();
}

export function createResponsavel(
  responsavelData
) {

  const responsaveis =
    getResponsaveis();

  const total =
    responsaveis.length + 1;

  const newResponsavel = {

    ...responsavelData,

    id:
      crypto.randomUUID(),

    codigo:
      `RESP-2026-${String(
        total
      ).padStart(4, "0")}`,

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  };

  const updatedResponsaveis = [
    ...responsaveis,
    newResponsavel,
  ];

  saveResponsaveis(
    updatedResponsaveis
  );

  return updatedResponsaveis;
}

export function updateResponsavel(
  responsavelData
) {

  const responsaveis =
    getResponsaveis();

  const updatedResponsaveis =
    responsaveis.map(
      (responsavel) => {

        if (
          responsavel.id !==
          responsavelData.id
        ) {

          return responsavel;
        }

        return {

          ...responsavelData,

          updatedAt:
            new Date().toISOString(),
        };
      }
    );

  saveResponsaveis(
    updatedResponsaveis
  );

  return updatedResponsaveis;
}

export function deleteResponsavel(
  id
) {

  const responsaveis =
    getResponsaveis();

  const updatedResponsaveis =
    responsaveis.filter(
      (responsavel) =>
        responsavel.id !== id
    );

  saveResponsaveis(
    updatedResponsaveis
  );

  return updatedResponsaveis;
}

export function toggleResponsavelStatus(
  id
) {

  const responsaveis =
    getResponsaveis();

  const updatedResponsaveis =
    responsaveis.map(
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

          updatedAt:
            new Date().toISOString(),
        };
      }
    );

  saveResponsaveis(
    updatedResponsaveis
  );

  return updatedResponsaveis;
}