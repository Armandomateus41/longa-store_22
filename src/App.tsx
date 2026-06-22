import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ScrollToTop } from "./components/ScrollToTop";
import { SeoManager } from "./components/seo/SeoManager";
import { RequireAuth } from "./components/RequireAuth";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/AccountPage";
import { CartPage } from "./pages/CartPage";
import { CatalogPage } from "./pages/CatalogPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { OrdersPage } from "./pages/OrdersPage";
import { PaymentPage } from "./pages/PaymentPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ProductPage } from "./pages/ProductPage";
import { ReturnsPage } from "./pages/ReturnsPage";
import { ShippingPage } from "./pages/ShippingPage";
import { TrackOrderPage } from "./pages/TrackOrderPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <SeoManager />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/produto/:id" element={<ProductPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/entregas" element={<ShippingPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacidade" element={<PrivacyPage />} />
        <Route path="/trocas" element={<ReturnsPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/rastrear-pedido" element={<TrackOrderPage />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
