import { Login } from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import { BillPayment } from "./components/BillPayment";
import { Main } from "./pages/Main";
import { Home } from "./pages/Home";
import CreditCardForm from "./components/CreditCardForm";
import SecurityAndPrivacy from "./pages/SecurityAndPrivacy";
import NotFound from "./pages/NotFound";
import InfomationTransparency from "./pages/InfomationTransparency";
import TermsAndConditions from "./pages/TermsAndConditions";
import Perfil from "./pages/Perfil";
import Denuncias from "./pages/Denuncias";
import CreditCardList from "./components/CreditCardList";
import Reclamos from "./pages/Reclamos";
import Transaccion from "./pages/Transaccion";
import { useDispatch } from "react-redux";
import { fetchUserByid } from "./slices/userSlice";
import { useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetList from "./pages/BudgetList";
import Contacto from "./pages/Contacto";
import { getBudgets } from "./slices/budgetSlice";
import { getUserCards } from "./slices/cardSlice";
import { getTransactions } from "./slices/guilleTransferSlice";
import TransferenciasGuillermo from "./pages/TransferenciasGuillermo";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const identificador = localStorage.getItem("id2");
    //precargo los datos al hacer login
    

    if (token) {
      // Realizar el fetch de los datos del usuario al iniciar la aplicación
      // Realizar el fetch de los presupuestos al iniciar la aplicación
      dispatch(fetchUserByid(identificador))
      dispatch(getUserCards());
      dispatch(getBudgets(token))
      dispatch(getTransactions())
    }
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        {/* ruta para landing */}
        <Route path="/" element={<Main />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* ruta para home sel usuario*/}
        <Route exact path="/home" element={<Home />}></Route>
        <Route path="/home/creditCard" element={<CreditCardForm />} />
        <Route path="/home/perfil" element={<Perfil />} />
        <Route path="/home/denuncias" element={<Denuncias />} />
        <Route path="/home/reclamos" element={<Reclamos />} />

        <Route path="/home/tarjetas" element={<CreditCardList />} />

        {/* <Route path="/home/categorias" element={<Categorias />} /> */}

        {/* probando */}
        <Route path="/home/budgetList" element={<BudgetList />} />
        <Route path="/home/formPresupuesto" element={<BudgetForm />} />

        <Route path="/home/transaccionesGeneral" element={<TransferenciasGuillermo />} />

        {/* otras rutas */}
        <Route path="/home/transferencias" element={<Transaccion />} />

        <Route path="/cash" element={<BillPayment />}></Route>
        <Route path="/credit-card" element={<BillPayment />}></Route>
        <Route path="/currency-dollar" element={<BillPayment />}></Route>

        <Route
          path="/security-privacy"
          element={<SecurityAndPrivacy />}
        ></Route>
        <Route
          path="/information-transparency"
          element={<InfomationTransparency />}
        ></Route>
        <Route
          path="/terms-conditions"
          element={<TermsAndConditions />}
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
