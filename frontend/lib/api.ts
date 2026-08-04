const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
    }
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || "API request failed"
    );
  }

  return response.json();
}

export { API_BASE_URL };