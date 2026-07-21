# KOI KOI DABBA — Master Design System Reference Manual v1.0.0

Welcome to the **KOI KOI DABBA** design system. This system acts as the single source of truth for all brand values, design tokens, UI components, layout structures, and styling guidelines across the React Native mobile application platform.

---

## 1. Design Philosophy

Our interface is built on **simplicity, warmth, health, family, and trust**. We reject the bright, hyperactive, high-pressure design systems of modern discount food-delivery apps (e.g. Swiggy/Zomato) in favor of a handcrafted, premium, and calm aesthetic.

We blend details from:
* **Apple Human Interface**: Clean visual layouts, physical spring animations, and standard accessibility boundaries.
* **MUJI**: Soft neutral background palettes, raw textures, and understated typography.
* **Linear**: Razor-sharp border trims, clean vector iconography, and developer-centric ergonomics.

---

## 2. Directory Structure

```
src/design-system/
├── foundation/           # Immutable raw design values & layout dimensions
│   ├── colors.ts         # Base hex codes
│   ├── typography.ts     # Font families
│   ├── spacing.ts        # 8-point layout grid
│   ├── radius.ts         # Border radius curves
│   ├── shadows.ts        # Shadow parameters
│   ├── gradients.ts      # Linear overlay properties
│   ├── motion.ts         # Spring timings & physics curves
│   ├── zIndex.ts         # Centralized z-index layers
│   ├── breakpoints.ts    # Device size triggers
│   └── sizes.ts          # Core layout component sizes (Avatar, Button heights, etc.)
│
├── tokens/               # Semantic layer mapping foundations to roles
│   ├── colors.ts         # Brand, Chip presets, Light/Dark mappings
│   ├── typography.ts     # Display, heading, mono presets
│   └── ...
│
├── theme/                # Dynamic theme mappings & backward compatibility
│   ├── light.ts          # Light theme configurations
│   ├── dark.ts           # Dark theme configurations
│   └── index.ts          # Integrates design tokens with legacy theme hooks
│
├── components/           # Base interactive primitive controls (Text, Button, Card, EmptyState)
├── hooks/                # Interactive UX helpers (useForm, useKeyboard)
├── patterns/             # Shared reusable layouts (FeatureCard)
├── assets/               # Centralized brand visual assets
└── index.ts              # Main design system exports
```

---

## 3. Component & Design Hierarchy

We enforce a strict downward hierarchy flow. Lower layers must consume only elements exported by the layers above:

```
Foundation (Raw units)
  ↓
Tokens (Semantic roles)
  ↓
Theme (lightTheme, darkTheme)
  ↓
Primitives (Text, Button, Card, Layouts)
  ↓
Components (MealCard, PlanCard, ProfileCard)
  ↓
Patterns (MealSelection, HeaderRow)
  ↓
Features (Meals, Auth, Plans modules)
  ↓
Screens (MealsScreen, AuthScreen, HomeScreen)
```

---

## 4. Feature Folder Layout Standard

Every feature module in the repository must be isolated and structured uniformly:

```
feature/
├── README.md             # Technical purpose & dependency notes
├── index.ts              # Public API barrel exports
├── screens/              # Top-level route containers
├── components/           # Feature-isolated view items
├── patterns/             # Symmetrical page templates
├── hooks/                # Local logic hook files
├── services/             # API request wrappers
├── constants/            # Hardcoded configurations
├── types/                # TypeScript interface declarations
├── utils/                # Helper functions
└── assets/               # Feature-exclusive graphics/media
```

---

## 5. Token Hierarchy & Standards

### Spacing (8-Point Grid)
Layouts must *only* align elements using our 8-point spatial grid values. Never hardcode arbitrary padding or margins:
* `xs`: 4px
* `sm`: 8px
* `md`: 12px
* `lg`: 16px
* `xl`: 20px
* `xxl`: 24px (Outer screen padding)
* `xxxl`: 32px

### Corner Radius Curves
* `small`: 8px
* `medium`: 14px
* `control`: 18px (inputs, text fields, buttons)
* `card`: 24px (meal cards, banners)
* `dialog`: 28px (confirmation modals)
* `sheet`: 32px (bottom sheets)
* `pill` / `max`: 999px (capsules, chips, badges)

### Size Tokens (Eliminating Magic Numbers)
All layout-specific dimensions are structured in [foundation/sizes.ts](file:///c:/projects/koikoi/mobile/src/design-system/foundation/sizes.ts):
* **Avatar Sizes**: `sm: 32`, `md: 44`, `lg: 48`, `xl: 64`, `xxl: 90`
* **Button Heights**: `small: 32`, `medium: 44`, `large: 54`
* **Input Heights**: `standard: 46`, `multiline: 120`
* **Navigation Heights**: `header: 56`, `tabBar: 70`
* **Icon Sizes**: `xs: 12`, `sm: 14`, `md: 16`, `lg: 18`, `xl: 20`, `xxl: 24`

---

## 6. Typography & Typography Presets

| Font Family | Component Target | Allowed Weights | Mapped Variant |
| :--- | :--- | :--- | :--- |
| **General Sans** | Display titles, screen titles, banners | `600`, `700`, `800` | `display`, `headingXl`, `headingL`, `headingM`, `title`, `subtitle` |
| **Inter** | Descriptions, form labels, paragraph body | `400`, `500` | `bodyL`, `body`, `caption`, `label` |
| **Improve Numbers** | Prices, calories, ratings, timers, date fields | `500`, `700` | `mono` |

---

## 7. Shared States (Reusable Patterns)

Avoid duplicating logic for screens lifecycle states. Import and mount:
* **`Skeleton`**: For standard load steps and placeholders.
* **`EmptyState`**: Mapped with descriptive icons and primary buttons when lists contain no data.
* **`ErrorState` / `OfflineState`**: Handled via global toast notifications.

---

## 8. Animation & Motion Rules

All transitions and animations must read timings and easing functions directly from `theme.motion`:
* **Page Transitions**: 350ms back-out easing curve.
* **Card Lift / Hover**: Scale spring animation with scale feedback: `0.97` on tap.
* **Button Press**: 800ms throttle timer block to avoid duplicate api clicks.
* **Form Errors**: 240ms horizontal shake sequence.
* **Drawers**: 250ms bottom-up slide curve.

---

## 9. Screen Quality Checklist & Definition of Done

Every screen redesign is complete only when:
* [ ] Extends `PageLayout` or `ScrollableLayout` to handle safe areas.
* [ ] No raw hex codes used (all colors read from `theme.colors`).
* [ ] Padding/margins align to 8-point spatial multiples (`theme.spacing`).
* [ ] Font family mappings match rules (General Sans, Inter, IBM Plex Mono).
* [ ] No other icon packages used (Lucide React Native is the only choice).
* [ ] All clickable elements scale to a minimum tap boundary of $48 \times 48\text{ dp}$.
* [ ] Accessible labels are declared for buttons and form fields.
* [ ] Build compiles successfully via `npm run ts:check`.
