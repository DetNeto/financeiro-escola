import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";

import AnaliseFinanceira from "../pages/AnaliseFinanceira";

import ContasPagar from "../pages/ContasPagar";

import ContasReceber from "../pages/ContasReceber";

import FluxoCaixa from "../pages/FluxoCaixa";

import Alunos from "../pages/Alunos";

import Responsaveis from "../pages/Responsaveis";

import Matriculas from "../pages/Matriculas";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<MainLayout />}
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="analise-financeira"
            element={<AnaliseFinanceira />}
          />
          <Route
            path="contas-pagar"
            element={<ContasPagar />}
          />

          <Route
            path="contas-receber"
            element={<ContasReceber />}
          />

          <Route
            path="fluxo-caixa"
            element={<FluxoCaixa />}
          />

          <Route
            path="alunos"
            element={<Alunos />}
          />

          <Route
            path="responsaveis"
            element={<Responsaveis />}
          />

          <Route
            path="matriculas"
            element={<Matriculas />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}