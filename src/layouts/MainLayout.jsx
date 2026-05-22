import {
  LayoutDashboard,
  Wallet,
  Receipt,
  BadgeDollarSign,
} from "lucide-react";

import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-900 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold mb-10">
          Financeiro Escola
        </h1>

        <nav className="space-y-4">

          <Link
            to="/"
            className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/contas-pagar"
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <Wallet size={20} />
            Movimentações
          </Link>

          <Link
            to="/contas-receber"
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <Receipt size={20} />
            Contas a Receber
          </Link>

          <Link
            to="/fluxo-caixa"
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <BadgeDollarSign size={20} />
            Fluxo de Caixa
          </Link>

          <Link
            to="/analise-financeira"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800 transition"
          >

            <span>
              📊
            </span>

            <span>
              Análise Financeira
            </span>

          </Link>

        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}