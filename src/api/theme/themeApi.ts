import axios, { AxiosResponse } from 'axios';
import { useSessionStore } from '../../store/stores/sessionStore';
import { ServerThemeData, extractSessionData } from '../../designSystem/theme/themeAdapter';

// Theme API Response Structure
export interface ThemeApiResponse {
  status: number;
  code?: string;
  message: string;
  data: ServerThemeData;
  requestId?: string;
}

/**
 * Get theme from API and extract session data (sid)
 * @param domain - Tenant domain (e.g., 'demo.theaihostess.com')
 * @returns Theme data from API with cookie data
 */
export const getThemeApi = async (domain: string): Promise<ServerThemeData> => {
  // Theme API uses different base URL pattern
  const url = `https://${domain}/cp/api/theme?domain=${domain}`;
  
  // Get existing session cookies if any
  const { getCookies } = useSessionStore.getState();
  const existingCookies = getCookies();
  
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  
  // Include existing cookies for reload scenario
  if (existingCookies) {
    headers['Cookie'] = existingCookies;
    console.log('🔄 Sending existing cookies to theme API');
  } else {
    console.log('🆕 First time visit - no cookies to send');
  }

  const response: AxiosResponse<ThemeApiResponse> = await axios.get(url, {
    headers,
    timeout: 30000,
  });

  // Extract theme data from response
  const themeData = response.data.data;
  
  // Extract and store session data (sid) from Set-Cookie header
  const setCookieHeader = response.headers['set-cookie']?.join('; ') || null;
  
  console.log('🍪 Theme API Response:');
  console.log('  - Status:', response.status);
  console.log('  - Set-Cookie header:', setCookieHeader ? setCookieHeader.substring(0, 50) + '...' : 'None');
  
  // Add cookie data to theme response (similar to Next.js pattern)
  const themeWithCookies: ServerThemeData = {
    ...themeData,
    _cookieData: {
      domain,
      setCookieHeader,
      isFirstTime: !existingCookies,
      existingCookies: existingCookies || undefined,
    },
  };
  
  // Extract and store session data
  const sessionData = extractSessionData(themeWithCookies);
  console.log('🔍 Session data extracted:', sessionData);
  if (sessionData) {
    const { setSession } = useSessionStore.getState();
    setSession(sessionData);
    console.log('✅ Session data saved to store:', {
      sid: sessionData.sid ? sessionData.sid.substring(0, 20) + '...' : 'None',
      storeId: sessionData.storeId,
      domain: sessionData.domain,
    });
  }
  
  return themeWithCookies;
};

