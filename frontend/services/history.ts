import { API_BASE_URL } from "@/lib/api";

export interface HistoryItem {
  id: number;
  filename: string;
  overall_risk: string;
  summary: string;
  created_at: string;
}

export async function getHistory(): Promise<HistoryItem[]> {
  const response = await fetch(`${API_BASE_URL}/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch history.");
  }

  return response.json();
}