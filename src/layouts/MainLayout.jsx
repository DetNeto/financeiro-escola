import {

  LayoutDashboard,

  Wallet,

  Receipt,

  BadgeDollarSign,

  ChartColumn,

  GraduationCap,

  Users,

  ClipboardList,

  Settings,

  FileText,

  ContactRound,

} from "lucide-react";

import {
  NavLink,
  Outlet,
} from "react-router-dom";

export default function MainLayout() {

  const navItemClass =
    ({ isActive }) => `

      flex items-center gap-4

      px-4 py-3

      rounded-xl

      transition-all duration-200

      border

      ${
        isActive

          ? `
            bg-zinc-800
            border-zinc-700
            text-white
          `

          : `
            bg-transparent
            border-transparent
            text-zinc-400
            hover:bg-zinc-900
            hover:border-zinc-800
            hover:text-white
          `
      }
    `;

  return (

    <div className="flex min-h-screen bg-zinc-950 text-white">

      <aside className="
        w-80
        bg-zinc-950
        border-r border-zinc-800
        p-6
        flex
        flex-col
      ">

        <div className="mb-12">

          <h1 className="
            text-3xl
            font-black
            tracking-tight
          ">

            ERP Escolar

          </h1>

          <p className="
            text-zinc-500
            mt-2
            text-sm
          ">

            Gestão financeira e pedagógica

          </p>

        </div>

        <nav className="space-y-8">

          <div>

            <p className="
              text-xs
              uppercase
              tracking-widest
              text-zinc-500
              mb-3
            ">

              Financeiro

            </p>

            <div className="space-y-3">

              <NavLink
                to="/"
                end
                className={navItemClass}
              >

                <LayoutDashboard size={20} />

                <span>
                  Dashboard
                </span>

              </NavLink>

              <NavLink
                to="/contas-pagar"
                className={navItemClass}
              >

                <Wallet size={20} />

                <span>
                  Movimentações
                </span>

              </NavLink>

              <NavLink
                to="/contas-receber"
                className={navItemClass}
              >

                <Receipt size={20} />

                <span>
                  Contas a Receber
                </span>

              </NavLink>

              <NavLink
                to="/fluxo-caixa"
                className={navItemClass}
              >

                <BadgeDollarSign size={20} />

                <span>
                  Fluxo de Caixa
                </span>

              </NavLink>

              <NavLink
                to="/analise-financeira"
                className={navItemClass}
              >

                <ChartColumn size={20} />

                <span>
                  Análise Financeira
                </span>

              </NavLink>

            </div>

          </div>

          <div>

            <p className="
              text-xs
              uppercase
              tracking-widest
              text-zinc-500
              mb-3
            ">

              Escolar

            </p>

            <div className="space-y-3">

              <NavLink
                to="/alunos"
                className={navItemClass}
              >

                <GraduationCap size={20} />

                <span>
                  Alunos
                </span>

              </NavLink>

              <NavLink
                to="/responsaveis"
                className={navItemClass}
              >

                <ContactRound size={20} />

                <span>
                  Responsáveis
                </span>

              </NavLink>

              <NavLink
                to="/matriculas"
                className={navItemClass}
              >

                <ClipboardList size={20} />

                <span>
                  Matrículas
                </span>

              </NavLink>

              <NavLink
                to="/turmas"
                className={navItemClass}
              >

                <Users size={20} />

                <span>
                  Turmas
                </span>

              </NavLink>

              <NavLink
                to="/pedagogico"
                className={navItemClass}
              >

                <ClipboardList size={20} />

                <span>
                  Pedagógico
                </span>

              </NavLink>

            </div>

          </div>

          <div>

            <p className="
              text-xs
              uppercase
              tracking-widest
              text-zinc-500
              mb-3
            ">

              Gestão

            </p>

            <div className="space-y-3">

              <NavLink
                to="/relatorios"
                className={navItemClass}
              >

                <FileText size={20} />

                <span>
                  Relatórios
                </span>

              </NavLink>

              <NavLink
                to="/configuracoes"
                className={navItemClass}
              >

                <Settings size={20} />

                <span>
                  Configurações
                </span>

              </NavLink>

            </div>

          </div>

        </nav>

        <div className="
          mt-auto
          pt-8
          border-t border-zinc-800
        ">

          <p className="
            text-zinc-500
            text-sm
          ">

            ERP Escolar v1.0

          </p>

        </div>

      </aside>

      <main className="
        flex-1
        overflow-auto
        p-8
      ">

        <Outlet />

      </main>

    </div>
  );
}