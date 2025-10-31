# Assets Documentation

## 📁 Folder Structure

```
src/assests/
├── icons/          # 75+ icon files (SVG & PNG)
├── images/         # 10+ image files (PNG & SVG)
└── index.ts        # Centralized exports
```

## 🚀 Usage

### Basic Import

```typescript
import { Icons, Images } from '../assests';
```

### Using Icons

```typescript
import { Icons } from '../assests';
import { Image } from 'react-native';

// Direct usage
<Image source={Icons.cart} style={styles.icon} />

// With type-safe helper
import { getIcon } from '../assests';
<Image source={getIcon('cart')} style={styles.icon} />
```

### Using Images

```typescript
import { Images } from '../assests';
import { Image } from 'react-native';

// Direct usage
<Image source={Images.burgerImg} style={styles.foodImage} />

// With type-safe helper
import { getImage } from '../assests';
<Image source={getImage('burgerImg')} style={styles.foodImage} />
```

### Type-Safe Usage

```typescript
import { getIcon, getImage, type IconName, type ImageName } from '../assests';

// TypeScript will autocomplete and validate names
const iconName: IconName = 'cart'; // ✅ Valid
const imageName: ImageName = 'burgerImg'; // ✅ Valid

// Invalid names will show TypeScript errors
// const invalidIcon: IconName = 'nonExistent'; // ❌ Error
```

### Check if Asset Exists

```typescript
import { hasIcon, hasImage } from '../assests';

if (hasIcon('cart')) {
  // TypeScript knows 'cart' is valid IconName
  const icon = getIcon('cart');
}

if (hasImage('burgerImg')) {
  // TypeScript knows 'burgerImg' is valid ImageName
  const image = getImage('burgerImg');
}
```

## 📋 Available Assets

### Icons (75+ icons)

#### Social Icons
- `apple`, `social`, `socialPng`, `social1`, `social2`, `social3`
- `socialIcon`, `socialIconPng`, `socialIcon1`

#### WhatsApp Icons
- `whatsApp`, `whatsApp2`, `whatsApp3`, `whatsApp4`, `whatsApp5`, `whatsApp6`
- `whatsAppLogo`

#### Navigation & Actions
- `arrowLeft`, `arrowSmall`, `leftArrow`, `whiteLeftArrow`

#### User & Profile
- `user`, `userBig`, `userCheckout`

#### Auth & Security
- `eyeBig`, `passwordBig`, `logout`

#### Contact & Communication
- `mailBig`, `mailCheckout`, `phoneBig`, `phoneBig1`, `phoneCheckout`

#### Time & Calendar
- `clockBig`, `clockSmall`, `clockServiceIcon`, `clockCheckout`
- `calendarBig`, `calendarCheck`, `calendarServiceIcon`

#### Shopping & Cart
- `cart`, `editCart`, `giftCart`, `coupon`, `checkoutPicKUp`

#### Order & Delivery
- `delivery`, `pickup`, `dineIn`, `later`, `now`
- `orderSuccess`, `orderFailure`

#### Payment
- `masterCard`, `visa`, `stripe`

#### Food & Categories
- `contentBurger`, `veg`, `vegan`, `productIcon`

#### UI Components
- `searchIcon`, `heart`, `bin`, `delete`, `deletePng`
- `switch`, `icon`, `i`

#### Location & Maps
- `map`, `buildingBig`, `buildingSmall`

#### Services
- `bookTable`

#### General
- `description`, `group`, `frame`, `rectangle5`

### Images (10+ images)

#### Food Images
- `burgerImg`, `pizza`

#### Cart Images
- `cartImg1`, `cartImg2`, `cartImage3`

#### UI Images
- `home`, `footerImage`, `searchImage`

#### General
- `image`, `image15278`

## 💡 Best Practices

1. **Always use type-safe helpers**: Use `getIcon()` and `getImage()` for better type safety
2. **Import only what you need**: Use named imports to reduce bundle size
3. **Check existence**: Use `hasIcon()` and `hasImage()` when asset name is dynamic
4. **Consistent naming**: Follow existing naming conventions when adding new assets

## 🆕 Adding New Assets

1. Add your asset file to `src/assests/icons/` or `src/assests/images/`
2. Add export to `src/assests/index.ts`:
   ```typescript
   export const Icons = {
     // ... existing icons
     myNewIcon: require('./icons/myNewIcon.svg'),
   } as const;
   ```
3. TypeScript types will automatically update

## ⚠️ Important Notes

### SVG Support
React Native doesn't natively support SVG files via `require()`. You have two options:

#### Option 1: Install SVG Transformer (Recommended)
```bash
npm install react-native-svg react-native-svg-transformer
```

Then update `metro.config.js`:
```javascript
const { getDefaultConfig } = require('@react-native/metro-config');
const svgTransformer = require('react-native-svg-transformer');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...config.resolver.sourceExts, 'svg'],
  };
  return config;
})();
```

#### Option 2: Use PNG Versions
Use the PNG versions of icons where available (e.g., `socialPng`, `deletePng`).

### File Formats
- ✅ **PNG/JPG files**: Work directly with `require()` and `Image` component
- ⚠️ **SVG files**: Require `react-native-svg-transformer` or use PNG alternatives
- All assets are bundled at build time (no runtime loading)

### Performance Tips
- Use appropriate image sizes for better performance
- Consider using WebP format for better compression
- Use vector icons (SVG) when possible for scaling

