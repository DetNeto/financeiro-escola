import {

  getStudents,

  saveStudents,

} from "../storage/alunosStorage";

export function loadStudents() {

  return getStudents();
}

export function createStudent(
  studentData
) {

  const students =
    getStudents();

  const newStudent = {

    ...studentData,

    id:
      crypto.randomUUID(),

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  };

  const updatedStudents = [
    ...students,
    newStudent,
  ];

  saveStudents(
    updatedStudents
  );

  return updatedStudents;
}

export function updateStudent(
  studentData
) {

  const students =
    getStudents();

  const updatedStudents =
    students.map(
      (student) => {

        if (
          student.id !==
          studentData.id
        ) {

          return student;
        }

        return {

          ...studentData,

          updatedAt:
            new Date().toISOString(),
        };
      }
    );

  saveStudents(
    updatedStudents
  );

  return updatedStudents;
}

export function deleteStudent(
  id
) {

  const students =
    getStudents();

  const updatedStudents =
    students.filter(
      (student) =>
        student.id !== id
    );

  saveStudents(
    updatedStudents
  );

  return updatedStudents;
}

export function toggleStudentStatus(
  id
) {

  const students =
    getStudents();

  const updatedStudents =
    students.map(
      (student) => {

        if (
          student.id !== id
        ) {

          return student;
        }

        return {

          ...student,

          status:
            student.status ===
            "Ativo"

              ? "Inativo"

              : "Ativo",

          updatedAt:
            new Date().toISOString(),
        };
      }
    );

  saveStudents(
    updatedStudents
  );

  return updatedStudents;
}