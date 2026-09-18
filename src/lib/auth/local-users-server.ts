import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const dataDir = path.join(process.cwd(), ".data");
const usersFile = path.join(dataDir, "local-users.json");

function readUsers(): StoredUser[] {
  if (!existsSync(usersFile)) return [];
  try {
    return JSON.parse(readFileSync(usersFile, "utf8")) as StoredUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
}

export function localSignUpServer(
  name: string,
  email: string,
  password: string
): { user: { id: string; email: string; name: string } } | { error: string } {
  const trimmedEmail = email.trim().toLowerCase();
  if (!name.trim()) return { error: "Enter your name." };
  if (!trimmedEmail.includes("@")) return { error: "Enter a valid email." };
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const users = readUsers();
  if (users.some((u) => u.email === trimmedEmail)) {
    return { error: "An account with this email already exists." };
  }

  const user: StoredUser = {
    id: randomUUID(),
    name: name.trim(),
    email: trimmedEmail,
    password,
  };
  writeUsers([...users, user]);
  return {
    user: { id: user.id, email: user.email, name: user.name },
  };
}

export function localLogInServer(
  email: string,
  password: string
): { user: { id: string; email: string; name: string } } | { error: string } {
  const trimmedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const match = users.find(
    (u) => u.email === trimmedEmail && u.password === password
  );
  if (!match) return { error: "Invalid email or password." };
  return {
    user: { id: match.id, email: match.email, name: match.name },
  };
}
