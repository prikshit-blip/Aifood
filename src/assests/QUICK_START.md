# 🚀 Quick Start Guide - Assets Usage

## Import Assets

```typescript
import { Icons, Images } from '../assests';
// OR
import { getIcon, getImage } from '../assests';
```

## Basic Usage

```typescript
import { Icons, Images } from '../assests';
import { Image } from 'react-native';

// Icons
<Image source={Icons.cart} style={{ width: 24, height: 24 }} />
<Image source={Icons.user} style={{ width: 24, height: 24 }} />
<Image source={Icons.searchIcon} style={{ width: 24, height: 24 }} />

// Images
<Image source={Images.burgerImg} style={{ width: 200, height: 200 }} />
<Image source={Images.pizza} style={{ width: 200, height: 200 }} />
```

## Type-Safe Usage

```typescript
import { getIcon, getImage } from '../assests';

// TypeScript autocomplete will help you!
<Image source={getIcon('cart')} />      // ✅ Valid
<Image source={getImage('burgerImg')} /> // ✅ Valid
// getIcon('invalid')                    // ❌ TypeScript error
```

## All Available Assets

### Common Icons
- `Icons.cart` - Shopping cart
- `Icons.user` - User profile
- `Icons.searchIcon` - Search icon
- `Icons.heart` - Heart/favorite
- `Icons.delete` - Delete icon
- `Icons.editCart` - Edit cart
- `Icons.orderSuccess` - Order success
- `Icons.orderFailure` - Order failure

### Navigation Icons
- `Icons.arrowLeft` - Left arrow
- `Icons.leftArrow` - Left arrow (alternative)
- `Icons.whiteLeftArrow` - White left arrow

### Food Icons
- `Icons.veg` - Vegetarian badge
- `Icons.vegan` - Vegan badge
- `Icons.contentBurger` - Burger icon

### Payment Icons
- `Icons.masterCard` - Mastercard
- `Icons.visa` - Visa
- `Icons.stripe` - Stripe

### Common Images
- `Images.burgerImg` - Burger image
- `Images.pizza` - Pizza image
- `Images.home` - Home image
- `Images.cartImg1` - Cart image 1
- `Images.cartImg2` - Cart image 2

## See Full List
Check `src/assests/index.ts` for complete list of 75+ icons and 10+ images!

## Examples
See `src/assests/examples.tsx` for detailed usage examples.

