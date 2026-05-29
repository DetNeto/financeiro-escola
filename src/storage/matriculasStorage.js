const STORAGE_KEY =
  "erp-escolar-matriculas";

export function getMatriculas() {

  const savedMatriculas =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!savedMatriculas) {
    return [];
  }

  return JSON.parse(
    savedMatriculas
  );
}

export function saveMatriculas(
  matriculas
) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      matriculas
    )
  );
}