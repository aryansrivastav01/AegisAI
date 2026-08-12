import { apiFetch } from "@/lib/api";

export async function login(data: Record<string, any>) {
  return apiFetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function register(data: Record<string, any>) {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getMe() {
  return apiFetch("/auth/me");
}
