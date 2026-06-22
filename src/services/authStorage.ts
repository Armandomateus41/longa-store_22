import type { UserProfile } from "../types/user";

const USERS_KEY = "longa-store:users";
const SESSION_KEY = "longa-store:session";

function readUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as UserProfile[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: UserProfile[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): UserProfile | undefined {
  const normalized = email.trim().toLowerCase();
  return readUsers().find((user) => user.email === normalized);
}

export function findUserById(id: string): UserProfile | undefined {
  return readUsers().find((user) => user.id === id);
}

export function saveUser(user: UserProfile) {
  const users = readUsers();
  const index = users.findIndex((item) => item.id === user.id);

  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }

  writeUsers(users);
}

export function createUser(
  input: Pick<UserProfile, "fullName" | "email" | "password">
): UserProfile {
  const user: UserProfile = {
    id: crypto.randomUUID(),
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    phone: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    createdAt: new Date().toISOString(),
  };

  saveUser(user);
  return user;
}

export function loadSessionUserId(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function saveSession(userId: string | null) {
  if (userId) {
    localStorage.setItem(SESSION_KEY, userId);
    return;
  }

  localStorage.removeItem(SESSION_KEY);
}

export function loadSessionUser(): UserProfile | null {
  const userId = loadSessionUserId();
  if (!userId) {
    return null;
  }

  return findUserById(userId) ?? null;
}
