import {

  ContactRound,

  CircleCheck,

  ShieldCheck,

  MapPin,

} from "lucide-react";

export default function ResponsaveisCards({

  responsaveis,

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
          flex items-center
          justify-between
        ">

          <div>

            <p className="text-zinc-400">
              Responsáveis
            </p>

            <h2 className="
              text-4xl
              font-black
              mt-2
            ">

              {responsaveis.length}

            </h2>

          </div>

          <ContactRound
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
          flex items-center
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
                responsaveis.filter(
                  (r) =>
                    r.status === "Ativo"
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
          flex items-center
          justify-between
        ">

          <div>

            <p className="text-zinc-400">
              Financeiros
            </p>

            <h2 className="
              text-4xl
              font-black
              mt-2
            ">

              {
                responsaveis.filter(
                  (r) =>

                    r.tipo === "Financeiro" ||

                    r.tipo === "Ambos"
                ).length
              }

            </h2>

          </div>

          <ShieldCheck
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
          flex items-center
          justify-between
        ">

          <div>

            <p className="text-zinc-400">
              Endereços
            </p>

            <h2 className="
              text-4xl
              font-black
              mt-2
            ">

              {
                responsaveis.filter(
                  (r) => r.endereco
                ).length
              }

            </h2>

          </div>

          <MapPin
            size={38}
            className="text-green-400"
          />

        </div>

      </div>

    </div>
  );
}