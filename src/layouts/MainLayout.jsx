import {
  LayoutDashboard,
  Wallet,
  Receipt,
  BadgeDollarSign,
  ChartColumn,
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

      <aside className="w-72 bg-zinc-950 border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-black tracking-tight mb-12">

          Financeiro Escola

        </h1>

        <nav className="space-y-3">

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

        </nav>

      </aside>

      <main className="flex-1 overflow-auto p-8">

        <Outlet />

      </main>

    </div>
  );
}