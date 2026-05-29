const STORAGE_KEY =
  "erp-escolar-alunos";

export function getStudents() {

  const savedStudents =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!savedStudents) {
    return [];
  }

  return JSON.parse(
    savedStudents
  );
}

export function saveStudents(
  students
) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(students)
  );
}