import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { InfoPageLayout } from "../components/info/InfoPageLayout";
import { useAuth } from "../context/AuthContext";
import type { UserProfile } from "../types/user";

function getRedirectPath(from: string | null) {
  if (!from || !from.startsWith("/") || from.startsWith("//")) {
    return "/";
  }

  return from;
}

function profileToForm(user: UserProfile) {
  return {
    fullName: user.fullName,
    phone: user.phone,
    zipCode: user.zipCode,
    street: user.street,
    number: user.number,
    complement: user.complement,
    neighborhood: user.neighborhood,
    city: user.city,
    state: user.state,
  };
}

function AccountProfileSection({ user }: { user: UserProfile }) {
  const { updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileForm, setProfileForm] = useState(() => profileToForm(user));

  function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfileMessage("");
    setProfileError("");

    const result = updateProfile(profileForm);

    if (!result.ok) {
      setProfileError(result.error ?? "Não foi possível salvar.");
      return;
    }

    setProfileMessage("Dados salvos no seu navegador.");
  }

  function handleLogout() {
    logout();
    navigate("/conta", { replace: true });
  }

  return (
    <div className="account-dashboard">
      <div className="account-dashboard__head">
        <div>
          <p className="account-dashboard__welcome">
            Olá, <strong>{user.fullName}</strong>
          </p>
          <p className="account-dashboard__email">{user.email}</p>
        </div>

        <button
          type="button"
          className="account-dashboard__logout"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>

      <p className="account-dashboard__note">
        Seus dados ficam salvos neste navegador. Use-os para agilizar a compra
        no checkout.
      </p>

      <form
        className="account-form account-form--profile"
        onSubmit={handleProfileSubmit}
      >
        <div className="account-form__grid">
          <label className="account-field account-field--full">
            <span>Nome completo</span>
            <input
              value={profileForm.fullName}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  fullName: event.target.value,
                }))
              }
              required
            />
          </label>

          <label className="account-field">
            <span>Telefone</span>
            <input
              value={profileForm.phone}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  phone: event.target.value,
                }))
              }
            />
          </label>

          <label className="account-field">
            <span>CEP</span>
            <input
              value={profileForm.zipCode}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  zipCode: event.target.value,
                }))
              }
            />
          </label>

          <label className="account-field account-field--wide">
            <span>Endereço</span>
            <input
              value={profileForm.street}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  street: event.target.value,
                }))
              }
            />
          </label>

          <label className="account-field">
            <span>Número</span>
            <input
              value={profileForm.number}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  number: event.target.value,
                }))
              }
            />
          </label>

          <label className="account-field">
            <span>Complemento</span>
            <input
              value={profileForm.complement}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  complement: event.target.value,
                }))
              }
            />
          </label>

          <label className="account-field">
            <span>Bairro</span>
            <input
              value={profileForm.neighborhood}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  neighborhood: event.target.value,
                }))
              }
            />
          </label>

          <label className="account-field">
            <span>Cidade</span>
            <input
              value={profileForm.city}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  city: event.target.value,
                }))
              }
            />
          </label>

          <label className="account-field">
            <span>Estado</span>
            <input
              value={profileForm.state}
              maxLength={2}
              onChange={(event) =>
                setProfileForm((current) => ({
                  ...current,
                  state: event.target.value.toUpperCase(),
                }))
              }
            />
          </label>
        </div>

        {profileError && (
          <p className="account-form__feedback account-form__feedback--error">
            {profileError}
          </p>
        )}

        {profileMessage && (
          <p className="account-form__feedback account-form__feedback--success">
            {profileMessage}
          </p>
        )}

        <button type="submit" className="account-form__submit">
          Salvar meus dados
        </button>
      </form>

      <div className="account-dashboard__actions">
        <Link to="/carrinho" className="checkout-action">
          Ir para o carrinho
        </Link>
      </div>
    </div>
  );
}

export function AccountPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = getRedirectPath(searchParams.get("from"));
  const { user, isAuthenticated, login, register } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");

    const result = login(loginEmail, loginPassword);

    if (!result.ok) {
      setLoginError(result.error ?? "Não foi possível entrar.");
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegisterError("");

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("As senhas não conferem.");
      return;
    }

    const result = register({
      fullName: registerName,
      email: registerEmail,
      password: registerPassword,
    });

    if (!result.ok) {
      setRegisterError(result.error ?? "Não foi possível cadastrar.");
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  if (isAuthenticated && user) {
    return (
      <InfoPageLayout title="Minha Conta" showSidebar={false}>
        <AccountProfileSection key={user.id} user={user} />
      </InfoPageLayout>
    );
  }

  return (
    <InfoPageLayout title="Minha Conta" showSidebar={false}>
      {redirectTo !== "/" && (
        <p className="account-page__hint">
          Faça login ou cadastre-se para continuar sua compra.
        </p>
      )}

      <div className="account-grid">
        <section className="account-panel">
          <h2 className="account-panel__title">Já sou cliente</h2>

          <form className="account-form" onSubmit={handleLogin}>
            <label className="account-field">
              <span>
                E-mail <span className="account-field__required">*</span>
              </span>
              <input
                type="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="account-field">
              <span>
                Senha <span className="account-field__required">*</span>
              </span>
              <input
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {loginError && (
              <p className="account-form__feedback account-form__feedback--error">
                {loginError}
              </p>
            )}

            <button type="submit" className="account-form__submit">
              Entrar
            </button>

            <Link to="/contato" className="account-form__link">
              Precisa de ajuda?
            </Link>
          </form>
        </section>

        <section className="account-panel">
          <h2 className="account-panel__title">Quero me cadastrar</h2>

          <form className="account-form" onSubmit={handleRegister}>
            <label className="account-field">
              <span>
                Nome completo <span className="account-field__required">*</span>
              </span>
              <input
                type="text"
                value={registerName}
                onChange={(event) => setRegisterName(event.target.value)}
                autoComplete="name"
                required
              />
            </label>

            <label className="account-field">
              <span>
                E-mail <span className="account-field__required">*</span>
              </span>
              <input
                type="email"
                value={registerEmail}
                onChange={(event) => setRegisterEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="account-field">
              <span>
                Senha <span className="account-field__required">*</span>
              </span>
              <input
                type="password"
                value={registerPassword}
                onChange={(event) => setRegisterPassword(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </label>

            <label className="account-field">
              <span>
                Confirmar senha{" "}
                <span className="account-field__required">*</span>
              </span>
              <input
                type="password"
                value={registerConfirmPassword}
                onChange={(event) =>
                  setRegisterConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                minLength={6}
                required
              />
            </label>

            {registerError && (
              <p className="account-form__feedback account-form__feedback--error">
                {registerError}
              </p>
            )}

            <button type="submit" className="account-form__submit">
              Cadastrar
            </button>
          </form>
        </section>
      </div>
    </InfoPageLayout>
  );
}
