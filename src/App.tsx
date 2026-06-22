import { Routes, Route } from "react-router-dom";
import "./App.css";
import { RequireAuth } from "./components/RequireAuth";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/AccountPage";
import { CartPage } from "./pages/CartPage";
import { CatalogPage } from "./pages/CatalogPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { PaymentPage } from "./pages/PaymentPage";
import { ShippingPage } from "./pages/ShippingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/contato" element={<ContactPage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="/entregas" element={<ShippingPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/conta" element={<AccountPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route
        path="/checkout"
        element={
          <RequireAuth>
            <CheckoutPage />
          </RequireAuth>
        }
      />
      <Route
        path="/pagamento"
        element={
          <RequireAuth>
            <PaymentPage />
          </RequireAuth>
        }
      />
      <Route path="/pedido-confirmado" element={<OrderSuccessPage />} />
    </Routes>
  );
}

export default App;
