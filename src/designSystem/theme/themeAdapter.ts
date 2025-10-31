import { Theme } from '../../store/stores/themeStore';
import { Session } from '../../store/stores/sessionStore';

/**
 * Server Theme Data Type (from your existing API)
 */
export interface ServerThemeData {
  theme: {
    id: number;
    name: string;
    explicit: boolean;
    applied_at: string;
  };
  sections: {
    colors: {
      primary: string;
      box_text: string;
      background: string;
      primary_text: string;
      box_background: string;
      background_text: string;
    };
    fonts?: {
      header: any;
      normal: any;
    };
    header?: any;
    hero?: any;
    buttons: {
      primary_button: {
        text: string;
        background: string;
        text_color: string;
      };
      secondary_button: {
        text: string;
        background: string;
        text_color: string;
      };
    };
    top_nav?: any;
    footer?: any;
    highlight: {
      highlight_color: string;
    };
    menu_bar?: any;
    item?: any;
    item_layout?: any;
  };
  mapping: {
    domain: string;
    store_id: number;
    store_uuid: string;
    business_id: number;
  };
  // Cookie data from API response (Next.js pattern)
  _cookieData?: {
    domain?: string;
    setCookieHeader?: string | null;
    isFirstTime?: boolean;
    existingCookies?: string;
  };
}

/**
 * Extracts session data from server theme response
 * This includes sid (session ID) and cookies that must be used in subsequent API calls
 */
export const extractSessionData = (serverTheme: ServerThemeData): Partial<Session> | null => {
  const { _cookieData, mapping, theme } = serverTheme;
  
  if (!_cookieData) {
    console.log('⚠️ No _cookieData found in theme response');
    return null;
  }
  
  // Extract sid from setCookieHeader
  let sid: string | null = null;
  if (_cookieData.setCookieHeader) {
    const sidMatch = _cookieData.setCookieHeader.match(/sid=([^;]+)/);
    if (sidMatch) {
      sid = sidMatch[1];
      console.log('✅ Extracted sid from Set-Cookie header:', sid);
    }
  }
  
  // If no new cookies, use existing cookies
  const cookies = _cookieData.setCookieHeader || _cookieData.existingCookies || null;
  
  return {
    sid,
    cookies,
    storeId: mapping?.store_id || null,
    storeUuid: mapping?.store_uuid || null,
    businessId: mapping?.business_id || null,
    themeId: theme?.id || null,
    domain: _cookieData.domain || mapping?.domain || null,
  };
};

/**
 * Adapts server theme data to client theme format
 * Decouples server schema from client usage
 */
export const adaptServerTheme = (serverTheme: ServerThemeData): Theme => {
  const { sections, theme: themeInfo } = serverTheme;
  
  // Extract base colors
  const primaryColor = sections.colors.primary || '#FF0000';
  const surfaceColor = sections.colors.box_background || '#1E1E1E';
  const backgroundTextColor = sections.colors.background_text || '#FFFFFF';
  
  return {
    id: themeInfo.id.toString(),
    name: themeInfo.name,
    colors: {
      // Base colors
      primary: primaryColor,
      secondary: sections.highlight.highlight_color || '#FF5722',
      background: sections.colors.background || '#121212',
      surface: surfaceColor,
      text: backgroundTextColor,
      textSecondary: sections.colors.box_text || '#B0B0B0',
      error: '#CF6679',
      success: '#4CAF50',
      warning: '#FFC107',
      border: '#333333',
      
      // Background variants (your custom identifiers)
      primaryBackground: primaryColor,           // Maps to primary
      secondaryBackground: surfaceColor,         // Maps to surface
      whiteBackground: '#FFFFFF',                // Always white
      
      // Text variants (your custom identifiers)
      primaryText: primaryColor,                 // Maps to primary
      whiteText: '#FFFFFF',                      // Always white
      normalText: '#000000',                     // Black
      lightText: '#666666',                      // Light gray
      greyText: '#6B6B6B',                       // Grey
      
      // Additional background variant
      greyBackground: '#6B6B6B',                 // Grey
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      xlg: 40,
      full: 9999,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
      },
    },
  };
};
