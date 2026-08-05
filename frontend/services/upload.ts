import { API_BASE_URL } from "@/lib/api";

export interface UploadResponse {
  message: string;

  uploaded_data: Record<string, unknown>;

  iocs: {
    ips: string[];
    domains: string[];
    urls: string[];
    hashes: string[];
  };

  summary: {
    overall_risk: string;
    total_ips: number;
    total_domains: number;
    total_urls: number;
    total_hashes: number;
  };

  threat_intelligence: {
  ips: {
    ioc: string;
    overall_reputation: string;
    providers: {
      success: boolean;
      provider: string;
      ioc: string;
      reputation: string;
      confidence: number;
      country?: string;
      network?: string;
      isp?: string;
      domain?: string;
      total_reports?: number;
      is_whitelisted?: boolean;
    }[];
  }[];
  domains: unknown[];
  urls: unknown[];
  hashes: unknown[];
};

  ai_analysis: {
  summary: string;
  overall_risk: string;
  confidence: number;
  findings: string[];
  recommendations: string[];
};
}

export async function uploadSecurityLog(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = "Upload failed.";

    try {
      const error = await response.json();

      message =
        error.detail ??
        error.message ??
        message;
    } catch {
      // Ignore invalid JSON error responses
    }

    throw new Error(message);
  }

  return response.json();
}