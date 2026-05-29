const STORAGE_KEY =
  "erp-escolar-responsaveis";

export function getResponsaveis() {

  const savedResponsaveis =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!savedResponsaveis) {
    return [];
  }

  return JSON.parse(
    savedResponsaveis
  );
}

export function saveResponsaveis(
  responsaveis
) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      responsaveis
    )
  );
}