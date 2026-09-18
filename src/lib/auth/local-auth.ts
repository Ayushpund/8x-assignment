import type { AuthUser } from "@/store/auth-store";

type StoredUser = AuthUser & { password: string };

const USERS_KEY = "8x-studio-users";

function loadUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function localSignUp(
  name: string,
  email: string,
  password: string
): { user: AuthUser } | { error: string } {
  const trimmedEmail = email.trim().toLowerCase();
  if (!name.trim()) return { error: "Enter your name." };
  if (!trimmedEmail.includes("@")) return { error: "Enter a valid email." };
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const users = loadUsers();
  if (users.some((u) => u.email === trimmedEmail)) {
    return { error: "An account with this email already exists." };
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: trimmedEmail,
    password,
    plan: "free",
    proSince: null,
  };
  saveUsers([...users, newUser]);
  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      plan: "free",
      proSince: null,
    },
  };
}

export function localLogIn(
  email: string,
  password: string
): { user: AuthUser } | { error: string } {
  const trimmedEmail = email.trim().toLowerCase();
  const users = loadUsers();
  const match = users.find(
    (u) => u.email === trimmedEmail && u.password === password
  );
  if (!match) return { error: "Invalid email or password." };
  return {
    user: {
      id: match.id,
      email: match.email,
      name: match.name,
      plan: match.plan === "pro" ? "pro" : "free",
      proSince: match.proSince ?? null,
    },
  };
}

export function localLogOut() {
  /* session cleared in zustand only */
}
