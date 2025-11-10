/**
 * 🎨 Assets Index
 * Centralized asset management for easy use across all screens
 * 
 * Usage:
 * import { ICONS, Images } from '../assests';
 * 
 * // In JSX:
 * <Image source={ICONS.cart} />
 * <Image source={Images.burgerImg} />
 */

// ============================================
// 📦 ICONS
// ============================================

/**
 * ICONS exported with type-safe interface
 * Supports both PNG and SVG formats
 */
export const ICONS = {
  
  // bottom tab icons
  Home: require('./icons/homeTab.png'),
  
  Cart: require('./icons/cart.png'),
  Gift:require('./icons/Gift.png'),
  Service:require('./icons/service.png'),
  Promos:require('./icons/promos.png'),
  search:require('./icons/search.png'),
  heart_fill:require('./icons/heart_fill.png'),
  
  // Social ICONS
  apple: require('./icons/apple.svg'),
  social: require('./icons/social.svg'),
  socialPng: require('./icons/social.png'),
  social1: require('./icons/social (1).svg'),
  social2: require('./icons/social (2).svg'),
  social3: require('./icons/social (3).svg'),
  socialIcon: require('./icons/Social icon.svg'),
  socialIconPng: require('./icons/Social icon.png'),
  socialIcon1: require('./icons/Social icon (1).svg'),
  
  // WhatsApp ICONS
  whatsApp: require('./icons/whatsApp (1).svg'),
  whatsApp2: require('./icons/whatsApp (2).svg'),
  whatsApp3: require('./icons/whatsApp (3).svg'),
  whatsApp4: require('./icons/whatsApp (4).svg'),
  whatsApp5: require('./icons/whatsApp (5).svg'),
  whatsApp6: require('./icons/whatsApp (6).svg'),
  whatsAppLogo: require('./icons/whatsAppLogo.svg'),
  
  // Navigation & Actions
  arrowLeft: require('./icons/arrowleft.png'),
  arrowSmall: require('./icons/Arrow Small.svg'),
  leftArrow: require('./icons/leftArrow.svg'),
  whiteLeftArrow: require('./icons/whiteLeftArrow.svg'),
  
  // User & Profile
  user: require('./icons/user.png'),
  userBig: require('./icons/user Big.svg'),
  userCheckout: require('./icons/userCheckout.svg'),
  
  // Auth & Security
  eyeBig: require('./icons/eye.png'),
  passwordBig: require('./icons/password.png'),
  logout: require('./icons/logout.png'),
  
  // Contact & Communication
  mailBig: require('./icons/email.png'),
  mailCheckout: require('./icons/mailCheckout.svg'),
  phoneBig: require('./icons/phone.png'),
  phoneBig1: require('./icons/phone Big (1).svg'),
  phoneCheckout: require('./icons/phoneCheckout.svg'),
  
  // Time & Calendar
  clockBig: require('./icons/clock Big.svg'),
  clockSmall: require('./icons/clock Small.svg'),
  clockServiceIcon: require('./icons/clock ServiceIcon.svg'),
  clockCheckout: require('./icons/clockCheckout.svg'),
  calendarBig: require('./icons/calendar Big.svg'),
  calendarCheck: require('./icons/calendar-check-01.svg'),
  calendarServiceIcon: require('./icons/calendarServiceicon.svg'),
  
  // Shopping & Cart
  cart: require('./icons/cart.svg'),
  editCart: require('./icons/editCart.svg'),
  giftCart: require('./icons/giftCart.svg'),
  coupon: require('./icons/coupon.svg'),
  checkoutPicKUp: require('./icons/checkoutPicKUp.svg'),
  
  // Order & Delivery
  delivery: require('./icons/Delevery.svg'),
  pickup: require('./icons/pickUp.svg'),
  dineIn: require('./icons/dineIn.svg'),
  later: require('./icons/later.svg'),
  now: require('./icons/now.svg'),
  orderSuccess: require('./icons/orderSuccess.svg'),
  orderFailure: require('./icons/orderfailure.svg'),
  
  // Payment
  masterCard: require('./icons/masterCard.svg'),
  visa: require('./icons/visa.png'),
  stripe: require('./icons/stripe.svg'),
  
  // Food & Categories
  contentBurger: require('./icons/contentBurger.svg'),
  veg: require('./icons/Veg.svg'),
  vegan: require('./icons/Vegan.svg'),
  productIcon: require('./icons/ProductIcon.png'),
  
  // UI Components
  searchIcon: require('./icons/searchIcon.png'),
  heart: require('./icons/heart.png'),
  bin: require('./icons/Bin.svg'),
  delete: require('./icons/delete.svg'),
  deletePng: require('./icons/delete.png'),
  switch: require('./icons/Switch.svg'),
  icon: require('./icons/Icon.svg'),
  i: require('./icons/i.svg'),
  
  // Location & Maps
  map: require('./icons/Map.svg'),
  buildingBig: require('./icons/Building Big.svg'),
  buildingSmall: require('./icons/Building Small.svg'),
  
  // Services
  bookTable: require('./icons/bookTable.svg'),
  
  // General
  description: require('./icons/document.png'),
  group: require('./icons/Group.svg'),
  frame: require('./icons/Frame 1000002274.svg'),
  rectangle5: require('./icons/Rectangle 5.svg'),
} as const;

// ============================================
// 🖼️ IMAGES
// ============================================

/**
 * Images exported with type-safe interface
 */
export const IMAGES = {
  // placholder: require('./images/placholder.png'),
  // Food Images
  burgerImg: require('./images/burgerImg.png'),
  pizza: require('./images/pizza.png'),
  
  // Cart Images
  cartImg1: require('./images/cartimg1.png'),
  cartImg2: require('./images/cartImg2.png'),
  cartImage3: require('./images/cartImage3.png'),
  
  // UI Images
  home: require('./images/home.png'),
  footerImage: require('./images/footerImage.png'),
  searchImage: require('./images/searchImage.svg'),
  
  // General
  image: require('./images/image.png'),
  image15278: require('./images/15278.png'),
  onboardingImage: require('./images/onboardingImage.png'),
} as const;

// ============================================
// 📝 TYPE DEFINITIONS
// ============================================

/**
 * Type-safe icon names
 */
export type IconName = keyof typeof ICONS;

/**
 * Type-safe image names
 */
export type ImageName = keyof typeof IMAGES;

// ============================================
// 🔧 HELPER FUNCTIONS
// ============================================

/**
 * Get icon source by name (type-safe)
 * @param name - Icon name
 * @returns Image source for React Native Image component
 * 
 * @example
 * <Image source={getIcon('cart')} />
 */
export const getIcon = (name: IconName) => {
  return ICONS[name];
};

/**
 * Get image source by name (type-safe)
 * @param name - Image name
 * @returns Image source for React Native Image component
 * 
 * @example
 * <Image source={getImage('burgerImg')} />
 */
export const getImage = (name: ImageName) => {
  return IMAGES[name];
};

/**
 * Check if icon exists
 */
export const hasIcon = (name: string): name is IconName => {
  return name in ICONS;
};

/**
 * Check if image exists
 */
export const hasImage = (name: string): name is ImageName => {
  return name in IMAGES;
};

// ============================================
// 📦 DEFAULT EXPORT
// ============================================

/**
 * Default export with all assets organized
 */
export default {
  ICONS,
  IMAGES,
  getIcon,
  getImage,
  hasIcon,
  hasImage,
};

