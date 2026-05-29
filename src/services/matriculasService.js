import {

  getMatriculas,

  saveMatriculas,

} from "../storage/matriculasStorage";

const MATRICULA_STATUS = {

  ATIVA:
    "Ativa",

  PENDENTE:
    "Pendente",

  TRANCADA:
    "Trancada",

  CANCELADA:
    "Cancelada",

  CONCLUIDA:
    "Concluída",
};

export function loadMatriculas() {

  return getMatriculas();
}

export function createMatricula(
  matriculaData
) {

  const matriculas =
    getMatriculas();

  const total =
    matriculas.length + 1;

  const currentYear =
    new Date().getFullYear();

  const newMatricula = {

    id:
      crypto.randomUUID(),

    codigo:
      `MAT-${currentYear}-${String(
        total
      ).padStart(4, "0")}`,

    alunoId:
      matriculaData.alunoId,

    alunoNome:
      matriculaData.alunoNome,

    responsavelFinanceiroId:
      matriculaData
        .responsavelFinanceiroId,

    responsavelFinanceiroNome:
      matriculaData
        .responsavelFinanceiroNome,

    responsavelContratualId:
      matriculaData
        .responsavelContratualId ||

      matriculaData
        .responsavelFinanceiroId,

    anoLetivo:
      matriculaData.anoLetivo,

    tipoMatricula:
      matriculaData.tipoMatricula ||

      "Nova",

    etapa:
      matriculaData.etapa,

    turma:
      matriculaData.turma,

    turno:
      matriculaData.turno,

    valorMensalidade:
      Number(
        matriculaData
          .valorMensalidade
      ) || 0,

    percentualBolsa:
      Number(
        matriculaData
          .percentualBolsa
      ) || 0,

    valorDesconto:
      Number(
        matriculaData
          .valorDesconto
      ) || 0,

    diaVencimento:
      matriculaData
        .diaVencimento,

    dataInicio:
      matriculaData
        .dataInicio ||

      new Date()
        .toISOString()
        .split("T")[0],

    dataFim:
      matriculaData
        .dataFim || "",

    observacoes:
      matriculaData
        .observacoes || "",

    contratoGerado:
      false,

    status:
      matriculaData.status ||

      MATRICULA_STATUS.ATIVA,

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  };

  const updatedMatriculas = [

    ...matriculas,

    newMatricula,
  ];

  saveMatriculas(
    updatedMatriculas
  );

  return updatedMatriculas;
}

export function updateMatricula(
  matriculaData
) {

  const matriculas =
    getMatriculas();

  const updatedMatriculas =
    matriculas.map(
      (matricula) => {

        if (
          matricula.id !==
          matriculaData.id
        ) {

          return matricula;
        }

        return {

          ...matricula,

          ...matriculaData,

          updatedAt:
            new Date().toISOString(),
        };
      }
    );

  saveMatriculas(
    updatedMatriculas
  );

  return updatedMatriculas;
}

export function deleteMatricula(
  id
) {

  const matriculas =
    getMatriculas();

  const updatedMatriculas =
    matriculas.filter(
      (matricula) =>
        matricula.id !== id
    );

  saveMatriculas(
    updatedMatriculas
  );

  return updatedMatriculas;
}

export function toggleMatriculaStatus(
  id
) {

  const matriculas =
    getMatriculas();

  const updatedMatriculas =
    matriculas.map(
      (matricula) => {

        if (
          matricula.id !== id
        ) {

          return matricula;
        }

        return {

          ...matricula,

          status:
            matricula.status ===
            MATRICULA_STATUS.ATIVA

              ? MATRICULA_STATUS.TRANCADA

              : MATRICULA_STATUS.ATIVA,

          updatedAt:
            new Date().toISOString(),
        };
      }
    );

  saveMatriculas(
    updatedMatriculas
  );

  return updatedMatriculas;
}

export {

  MATRICULA_STATUS,
};