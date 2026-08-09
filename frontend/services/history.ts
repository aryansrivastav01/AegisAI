import { API_BASE_URL } from "@/lib/api";

export interface HistoryItem {
  id: number;
  filename: string;
  overall_risk: string;
  summary: string;
  created_at: string;
  analysis_json: Record<string, unknown>;
}

export async function getHistory(): Promise<HistoryItem[]> {
  const response = await fetch(`${API_BASE_URL}/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch history.");
  }

  return response.json();
}

export async function getAnalysisById(id: number): Promise<HistoryItem> {
  const response = await fetch(`${API_BASE_URL}/history/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch report.");
  }

  return response.json();
}

export async function deleteAnalysis(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/history/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete report.");
  }
}