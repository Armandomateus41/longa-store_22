import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CheckoutLayout } from "../components/CheckoutLayout";
import { OrderSummary } from "../components/OrderSummary";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useCheckout } from "../context/CheckoutContext";
import type { ShippingData } from "../types/checkout";
import { shippingToProfileUpdate, userToShippingData } from "../utils/userShipping";

const emptyForm: ShippingData = {
  fullName: "",
  email: "",
  phone: "",
  zipCode: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items } = useCart();
  const { shipping, setShipping } = useCheckout();
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState<ShippingData>(() => {
    if (shipping) {
      return shipping;
    }

    if (user) {
      return userToShippingData(user);
    }

    return emptyForm;
  });
  const [error, setError] = useState("");

  if (items.length === 0) {
    return <Navigate to="/carrinho" replace />;
  }

  function handleChange(field: keyof ShippingData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const requiredFields: (keyof ShippingData)[] = [
      "fullName",
      "email",
      "phone",
      "zipCode",
      "street",
      "number",
      "neighborhood",
      "city",
      "state",
    ];

    const missingField = requiredFields.find((field) => !form[field].trim());

    if (missingField) {
      setError("Preencha todos os campos obrigatórios de entrega.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Informe um e-mail válido.");
      return;
    }

    setShipping(form);
    updateProfile(shippingToProfileUpdate(form));
    navigate("/pagamento");
  }

  return (
    <CheckoutLayout title="Dados de entrega">
      <div className="checkout-grid">
        <form className="checkout-panel checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-form__grid">
            <label className="checkout-field checkout-field--full">
              Nome completo
              <input
                value={form.fullName}
                onChange={(event) =>
                  handleChange("fullName", event.target.value)
                }
                required
              />
            </label>

            <label className="checkout-field">
              E-mail
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                required
              />
            </label>

            <label className="checkout-field">
              Telefone
              <input
                value={form.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                required
              />
            </label>

            <label className="checkout-field">
              CEP
              <input
                value={form.zipCode}
                onChange={(event) =>
                  handleChange("zipCode", event.target.value)
                }
                required
              />
            </label>

            <label className="checkout-field checkout-field--wide">
              Endereço
              <input
                value={form.street}
                onChange={(event) =>
                  handleChange("street", event.target.value)
                }
                required
              />
            </label>

            <label className="checkout-field">
              Número
              <input
                value={form.number}
                onChange={(event) =>
                  handleChange("number", event.target.value)
                }
                required
              />
            </label>

            <label className="checkout-field">
              Complemento
              <input
                value={form.complement}
                onChange={(event) =>
                  handleChange("complement", event.target.value)
                }
              />
            </label>

            <label className="checkout-field">
              Bairro
              <input
                value={form.neighborhood}
                onChange={(event) =>
                  handleChange("neighborhood", event.target.value)
                }
                required
              />
            </label>

            <label className="checkout-field">
              Cidade
              <input
                value={form.city}
                onChange={(event) => handleChange("city", event.target.value)}
                required
              />
            </label>

            <label className="checkout-field">
              Estado
              <input
                value={form.state}
                onChange={(event) => handleChange("state", event.target.value)}
                maxLength={2}
                required
              />
            </label>
          </div>

          {error && <p className="checkout-form__error">{error}</p>}

          <button type="submit" className="checkout-action">
            Continuar para pagamento
          </button>
        </form>

        <OrderSummary />
      </div>
    </CheckoutLayout>
  );
}
