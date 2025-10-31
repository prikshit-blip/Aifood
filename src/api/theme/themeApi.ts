import axios from 'axios';
import type { ThemeData } from '../../contexts/ThemeContext';

// Theme API Response Structure
export interface ThemeApiResponse {
  status: number;
  code: string;
  message: string;
  data: ThemeData & {
    status: number;
    tracking?: {
      source: string;
      app_version: string | null;
      client_version: string | null;
      transaction_id: string;
    };
    seo?: {
      page_title: string;
      page_description: string;
    };
  };
  requestId: string;
}

/**
 * Get theme from API
 * @param domain - Tenant domain (e.g., 'demo.theaihostess.com')
 * @returns Theme data from API
 */
export const getThemeApi = async (domain: string): Promise<ThemeData> => {
  // Theme API uses different base URL pattern
  const url = `https://${domain}/cp/api/theme?domain=${domain}`;

  const response = await axios.get<ThemeApiResponse>(url, {
    headers: {
      Accept: 'application/json',
    },
    timeout: 30000,
  });

  // Extract theme data from response
  return response.data.data;
};

