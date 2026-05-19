import AppRoutes from "./routes/AppRoutes";

import {
  FinanceProvider,
} from "./context/FinanceContext";

export default function App() {

  return (

    <FinanceProvider>

      <AppRoutes />

    </FinanceProvider>

  );
}