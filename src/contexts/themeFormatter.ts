import { ThemeData } from './ThemeContext';

/**
 * Normalized Theme Structure - Easy to use in any screen
 */
export interface NormalizedTheme {
  // Colors - Easy access
  colors: {
    primary: string;
    background: string;
    text: string;
    primaryText: string;
    boxBackground: string;
    boxText: string;
    backgroundText: string;
    highlight: string;
  };

  // Button styles
  buttons: {
    primary: {
      text: string;
      background: string;
      textColor: string;
    };
    secondary: {
      text: string;
      background: string;
      textColor: string;
    };
  };

  // Header
  header: {
    title: string;
    subtitle: string;
    backgroundColor: string;
    showBackgroundImage: boolean;
  };

  // Navigation
  topNav: {
    text: string;
    logoText: string;
    background: string;
  };

  // Footer
  footer: {
    text: string;
    background: string;
    hideInfoBox: boolean;
    hidePoweredBy: boolean;
  };

  // Hero section
  hero: {
    url: string;
    title: string;
    subtitle: string;
    titleColor: string;
    subtitleColor: string;
  };

  // Fonts
  fonts: {
    header: {
      name: string;
      weight: string;
      family: string;
    };
    normal: {
      name: string;
      weight: string;
      family: string;
    };
  };

  // Mapping info
  mapping: {
    domain: string;
    storeId: number;
    storeUuid: string;
    businessId: number;
  };

  // Theme info
  themeInfo: {
    id: number;
    name: string;
    explicit: boolean;
    appliedAt: string;
  };

  // Menu bar settings
  menuBar: {
    hideCategoryBar: boolean;
    hideSearchButton: boolean;
  };

  // Item settings
  item: {
    hideDescription: boolean;
  };

  // Item layout settings
  itemLayout: {
    hideCategoryDescriptions: boolean;
  };
}

/**
 * Transform nested theme data to easy-to-use normalized format
 */
export const normalizeTheme = (themeData: ThemeData | null): NormalizedTheme | null => {
  if (!themeData) {
    return null;
  }

  const sections = themeData.sections;

  return {
    // Colors - Flat structure
    colors: {
      primary: sections.colors.primary || '#FF6B35',
      background: sections.colors.background || '#FFFFFF',
      text: sections.colors.background_text || '#000000',
      primaryText: sections.colors.primary_text || '#000000',
      boxBackground: sections.colors.box_background || '#F8F9FA',
      boxText: sections.colors.box_text || '#000000',
      backgroundText: sections.colors.background_text || '#FFFFFF',
      highlight: sections.highlight?.highlight_color || '#FF5722',
    },

    // Buttons - Easy access
    buttons: {
      primary: {
        text: sections.buttons.primary_button.text || 'Submit',
        background: sections.buttons.primary_button.background || '#FF6B35',
        textColor: sections.buttons.primary_button.text_color || '#FFFFFF',
      },
      secondary: {
        text: sections.buttons.secondary_button.text || 'Cancel',
        background: sections.buttons.secondary_button.background || '#6C757D',
        textColor: sections.buttons.secondary_button.text_color || '#FFFFFF',
      },
    },

    // Header
    header: {
      title: sections.header.title || 'App',
      subtitle: sections.header.subtitle || '',
      backgroundColor: sections.header.background_color || '#FFFFFF',
      showBackgroundImage: sections.header.show_background_image || false,
    },

    // Top Navigation
    topNav: {
      text: sections.top_nav.text || '#000000',
      logoText: sections.top_nav.logo_text || 'Logo',
      background: sections.top_nav.background || '#FFFFFF',
    },

    // Footer
    footer: {
      text: sections.footer.text || '#000000',
      background: sections.footer.background || '#F8F9FA',
      hideInfoBox: sections.footer.hide_info_box || false,
      hidePoweredBy: sections.footer.hide_powered_by || false,
    },

    // Hero
    hero: {
      url: sections.hero.url || '',
      title: sections.hero.title || '',
      subtitle: sections.hero.subtitle || '',
      titleColor: sections.hero.title_color || '#000000',
      subtitleColor: sections.hero.subtitle_color || '#666666',
    },

    // Fonts
    fonts: {
      header: {
        name: sections.fonts.header.name || 'System',
        weight: sections.fonts.header.weight || '700',
        family: sections.fonts.header.family || 'sans-serif',
      },
      normal: {
        name: sections.fonts.normal.name || 'System',
        weight: sections.fonts.normal.weight || '400',
        family: sections.fonts.normal.family || 'sans-serif',
      },
    },

    // Mapping
    mapping: {
      domain: themeData.mapping.domain || '',
      storeId: themeData.mapping.store_id || 0,
      storeUuid: themeData.mapping.store_uuid || '',
      businessId: themeData.mapping.business_id || 0,
    },

    // Theme Info
    themeInfo: {
      id: themeData.theme.id || 0,
      name: themeData.theme.name || 'Default',
      explicit: themeData.theme.explicit || false,
      appliedAt: themeData.theme.applied_at || '',
    },

    // Menu Bar
    menuBar: {
      hideCategoryBar: sections.menu_bar?.hide_category_bar || false,
      hideSearchButton: sections.menu_bar?.hide_search_button || false,
    },

    // Item
    item: {
      hideDescription: sections.item?.hide_description || false,
    },

    // Item Layout
    itemLayout: {
      hideCategoryDescriptions: sections.item_layout?.hide_category_descriptions || false,
    },
  };
};

