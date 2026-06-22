import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  createUser,
  findUserByEmail,
  loadSessionUser,
  saveSession,
  saveUser,
} from "../services/authStorage";
import type { ProfileUpdateInput, RegisterInput, UserProfile } from "../types/user";

type AuthResult = {
  ok: boolean;
  error?: string;
};

type AuthContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  register: (input: RegisterInput) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
  updateProfile: (data: ProfileUpdateInput) => AuthResult;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => loadSessionUser());

  function register(input: RegisterInput): AuthResult {
    const fullName = input.fullName.trim();
    const email = input.email.trim().toLowerCase();
    const password = input.password;

    if (!fullName) {
      return { ok: false, error: "Informe seu nome completo." };
    }

    if (!email.includes("@")) {
      return { ok: false, error: "Informe um e-mail válido." };
    }

    if (password.length < 6) {
      return { ok: false, error: "A senha deve ter no mínimo 6 caracteres." };
    }

    if (findUserByEmail(email)) {
      return { ok: false, error: "Este e-mail já está cadastrado." };
    }

    const created = createUser({ fullName, email, password });
    saveSession(created.id);
    setUser(created);

    return { ok: true };
  }

  function login(email: string, password: string): AuthResult {
    const normalizedEmail = email.trim().toLowerCase();
    const stored = findUserByEmail(normalizedEmail);

    if (!stored || stored.password !== password) {
      return { ok: false, error: "E-mail ou senha incorretos." };
    }

    saveSession(stored.id);
    setUser(stored);

    return { ok: true };
  }

  function logout() {
    saveSession(null);
    setUser(null);
  }

  function updateProfile(data: ProfileUpdateInput): AuthResult {
    if (!user) {
      return { ok: false, error: "Faça login para atualizar seus dados." };
    }

    const updated: UserProfile = {
      ...user,
      ...data,
      fullName: data.fullName?.trim() || user.fullName,
      phone: data.phone?.trim() ?? user.phone,
      zipCode: data.zipCode?.trim() ?? user.zipCode,
      street: data.street?.trim() ?? user.street,
      number: data.number?.trim() ?? user.number,
      complement: data.complement?.trim() ?? user.complement,
      neighborhood: data.neighborhood?.trim() ?? user.neighborhood,
      city: data.city?.trim() ?? user.city,
      state: data.state?.trim().toUpperCase() ?? user.state,
    };

    saveUser(updated);
    setUser(updated);

    return { ok: true };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthDisplayName() {
  const { user } = useAuth();
  return user ? getFirstName(user.fullName) : null;
}
