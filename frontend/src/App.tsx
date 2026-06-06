import {BrowserRouter,Routes,Route} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CustomerProfilePage from "./pages/CustomerProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/analytics"
          element={<AnalyticsPage />}
        />

        <Route
          path="/customers/:customerId"
          element={<CustomerProfilePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;