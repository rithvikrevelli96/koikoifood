# OrganicBackground Primitive

| Attribute | Specification |
|-----------|---------------|
| **Component** | `OrganicBackground` |
| **Status** | Stable (Design System v1.0 Frozen) |
| **Version** | 1.0.0 |
| **Owner** | Design System |
| **Theme Support** | Light / Dark (Theme-Aware) |
| **Variants** | `default` \| `auth` \| `dashboard` \| `minimal` \| `fullscreen` |
| **Density** | `none` \| `light` \| `medium` \| `full` |

`OrganicBackground` is the official brand background container for KOI KOI DABBA. It manages layered, theme-aware organic vector illustrations, dynamic scrollable/non-scrollable containers, and safe area layout properties natively.

---

## Props

The `OrganicBackground` component accepts the following properties:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'auth' \| 'dashboard' \| 'minimal' \| 'fullscreen'` | `'default'` | Controls the illustration template style. |
| `density` | `'none' \| 'light' \| 'medium' \| 'full'` | (Derived from `variant`) | Overrides the decoration layout density. |
| `withSafeArea` | `boolean` | `false` | When true, wraps contents in a `SafeAreaView`. |
| `scrollable` | `boolean` | `false` | When true, wraps contents in a `ScrollView`. |
| `animated` | `boolean` | `false` | Flag to prepare component for parallax or floating vector animations. |
| `isDark` | `boolean` | (Context-dependent) | Explicit theme override. If omitted, falls back to `AppContext.isDark`. |
| `style` | `StyleProp<ViewStyle>` | `undefined` | Custom style overrides for the inner content container. |
| `contentContainerStyle` | `StyleProp<ViewStyle>` | `undefined` | Custom style overrides for the inner scrollable container (only when `scrollable={true}`). |

---

## Variant Densities

When `density` is omitted, it is resolved based on the `variant` choice:

- **`minimal`** / **`none`**: Base background color + soft gradient overlay only. Used in payment, scan, and checkout flows.
- **`dashboard`** / **`light`**: Bottom Hills only. Used in dashboards and tab views.
- **`default`** / **`medium`**: Bottom Hills + Top Left Branch + Scooter.
- **`auth`** / **`fullscreen`** / **`full`**: Renders all layers including bottom corner leaves and berries. Used on onboarding steps and authentication/welcome screens.

---

## Layer Order

The background is structured as an absolute stack where illustrations sit behind interactive page content:

- **Layer 0**: Base background color (`#FCFAF6` in light mode, `#1A1815` in dark mode)
- **Layer 1**: Vignette & Radial Central Glow overlay
- **Layer 2**: `top_left_branch.png` (high-res watercolor hanging branch, `top: -10, left: -20`)
- **Layer 3**: `TopRightDecoration` (curved organic stroke, `opacity: 0.06`)
- **Layer 4**: `bottom_landscape.png` (taller watercolor hills, occupying `20%` of screen height)
- **Layer 5**: Scooter (cream colored, opacity `0.15`, baked into `bottom_landscape.png`)
- **Layer 6 & 7**: Bottom Left & Right Leaves and berries (baked into `bottom_landscape.png`)
- **Layer 8**: Content (`zIndex: 8`)

---

## Usage Examples

### 1. Direct Usage (Explicit Artwork Reference)
```tsx
import { OrganicBackground, organicBackgroundAssets } from '../../design-system';

export function SplashPage() {
  return (
    <OrganicBackground 
      variant="fullscreen" 
      withSafeArea
      artwork={organicBackgroundAssets.login}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Splash Logo</Text>
      </View>
    </OrganicBackground>
  );
}
```

### 2. Form Layouts (Scrollable, full authentication page)
```tsx
import { OrganicBackground, organicBackgroundAssets } from '../../design-system';

export function RegisterPage() {
  return (
    <OrganicBackground
      variant="auth"
      density="full"
      withSafeArea
      scrollable
      artwork={organicBackgroundAssets.login}
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20 }}
    >
      <View>
        <TextInput placeholder="Enter name" />
      </View>
    </OrganicBackground>
  );
}
```

### 3. PageLayout Opt-in Usage
The design-system's base `PageLayout` supports organic backgrounds natively. Pass `background="organic"` to opt-in:
```tsx
import { PageLayout } from '../../design-system';

export function OnboardingStep() {
  return (
    <PageLayout background="organic" backgroundVariant="auth">
      <Text>Onboarding Content</Text>
    </PageLayout>
  );
}
```

---

## Do's and Don'ts

- **DO** use `<PageLayout background="organic">` for setup, health, and profile verification steps.
- **DO** pass `isDark` if you need to preview dark mode background coloring in style/storybook screens outside the normal app context provider.
- **DON'T** place interactive elements, custom absolute buttons, or cards inside the illustration layer files. Keeps all illustration layers non-interactive (`pointerEvents="none"`).
