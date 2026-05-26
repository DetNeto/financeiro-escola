import {

  GraduationCap,

  Users,

  CircleCheck,

  User,

} from "lucide-react";

export default function AlunosCards({

  students,

}) {

  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-4
      gap-6
    ">

      <div className="
        bg-zinc-900
        border border-zinc-800
        rounded-3xl
        p-6
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>

            <p className="text-zinc-400">
              Total de Alunos
            </p>

            <h2 className="
              text-4xl
              font-black
              mt-2
            ">

              {students.length}

            </h2>

          </div>

          <GraduationCap
            size={38}
            className="text-blue-400"
          />

        </div>

      </div>

      <div className="
        bg-zinc-900
        border border-zinc-800
        rounded-3xl
        p-6
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>

            <p className="text-zinc-400">
              Ativos
            </p>

            <h2 className="
              text-4xl
              font-black
              mt-2
            ">

              {
                students.filter(
                  (student) =>
                    student.status ===
                    "Ativo"
                ).length
              }

            </h2>

          </div>

          <CircleCheck
            size={38}
            className="text-emerald-400"
          />

        </div>

      </div>

      <div className="
        bg-zinc-900
        border border-zinc-800
        rounded-3xl
        p-6
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>

            <p className="text-zinc-400">
              Com Responsável Secundário
            </p>

            <h2 className="
              text-4xl
              font-black
              mt-2
            ">

              {
                students.filter(
                  (student) =>
                    student
                      .responsavelSecundarioNome
                ).length
              }

            </h2>

          </div>

          <Users
            size={38}
            className="text-yellow-400"
          />

        </div>

      </div>

      <div className="
        bg-zinc-900
        border border-zinc-800
        rounded-3xl
        p-6
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>

            <p className="text-zinc-400">
              Turno Integral
            </p>

            <h2 className="
              text-4xl
              font-black
              mt-2
            ">

              {
                students.filter(
                  (student) =>
                    student.turno ===
                    "Integral"
                ).length
              }

            </h2>

          </div>

          <User
            size={38}
            className="text-purple-400"
          />

        </div>

      </div>

    </div>
  );
}