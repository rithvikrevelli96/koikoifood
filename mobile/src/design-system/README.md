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
├── foundation/           # Raw design values
│   ├── colors.ts         # Base hex codes
│   ├── typography.ts     # Font families
│   ├── spacing.ts        # 8-point layout grid
│   ├── radius.ts         # Border radius curves
│   ├── shadows.ts        # Shadow parameters
│   ├── gradients.ts      # Linear overlay properties
│   └── motion.ts         # Spring timings & physics curves
│
├── tokens/               # Semantic layer mapping foundations to roles
│   └── index.ts          # Semantic Light/Dark theme mappings
│
├── theme/                # Backward compatibility bridge
│   └── index.ts          # Integrates design tokens with legacy theme hooks
│
├── components/           # Base interactive primitive controls
│   ├── Button.tsx        # Standard button states
│   ├── Input.tsx         # Unified inline validation error input
│   ├── PhoneInput.tsx    # Gated numeric format selector
│   ├── DateInput.tsx     # Calendar numeric string filter
│   ├── OTPInput.tsx      # 6 split input cells
│   ├── Modal.tsx         # Dialog alerts
│   ├── BottomSheet.tsx   # Swipe-to-dismiss bottom drawer
│   └── ...               # Checkboxes, badges, cards, skeletons
│
├── hooks/                # Interactive UX helpers
│   ├── useForm.ts        # Form state validation
│   ├── useValidation.ts  # Input regex triggers
│   └── useKeyboard.ts    # Viewport sizing offsets
│
└── index.ts              # Main design system exports
```

---

## 3. Token Hierarchy & Standards

```
  FOUNDATION                        SEMANTIC TOKENS                 THEME MAP
[Raw HEX Code]                      [Functional Role]            [AppTheme State]
#4B5D3A (Moss Green)    ------>     theme.colors.primary    ---> Light / Dark Mode
#C96B3C (Terracotta)    ------>     theme.colors.secondary  ---> Light / Dark Mode
```

### Colors
* **Primary (Moss Green - `#4B5D3A`)**: Visual prominence for titles and brand identity.
* **Secondary (Terracotta Orange - `#C96B3C`)**: Primary action indicators, buttons, highlights.
* **Accent (Wheat Gold - `#D9B65A`)**: Special highlights and subscription milestones.
* **Background (Soft Cream - `#FCFAF6`)**: Warm page viewport backing.
* **Surface (Eggshell Warmth - `#F4EFE6`)**: Card layers and contact info sheets.

### Spacing (8-Point Grid)
Layouts must *only* align elements using our 8-point spatial grid values. Never hardcode arbitrary padding or margins:
* `xs`: 4px
* `sm`: 8px
* `md`: 12px
* `lg`: 16px
* `xl`: 24px
* `xxl`: 32px

### Corner Radius Curves
* `control`: 12px (inputs, text fields, buttons)
* `card`: 16px (meal cards, banners)
* `dialog`: 24px (confirmation modals)
* `sheet`: 28px (bottom drawers)
* `max`: 9999px (capsules, chips, badges)

---

## 4. Typography Rules

| Font Family | Component Target | Allowed Weights |
| :--- | :--- | :--- |
| **General Sans** | Headings, Screen Titles, Hero headers | `600` (SemiBold), `700` (Bold) |
| **Inter** | Descriptions, forms, text labels, actions | `400` (Regular), `500` (Medium) |
| **IBM Plex Mono** | Prices, calories, scores, times, numeric metrics | `500` (Medium), `700` (Bold) |

> [!IMPORTANT]
> Never use standard default font families. Always route numeric data through `IBM Plex Mono` to ensure tabular alignment and numerical consistency.

---

## 5. Component Lifecycle Guideline

Before creating a new UI component, follow the decision tree:

1. **Does the component already exist in `src/design-system/components/`?**
   * *Yes*: Import and reuse it. Do not rewrite.
   * *No*: Move to step 2.
2. **Is the component feature-specific (e.g. `MealHero`, `SubscriptionBanner`)?**
   * *Yes*: Place it in the feature's pattern folder (e.g., `src/features/meals/patterns/`). Do not mix it into the global Design System.
   * *No (Generic)*: Implement it inside `src/design-system/components/` following our tokens, export it in `src/design-system/index.ts`, and update the status matrix in `ChangelogScreen.tsx`.

---

## 6. Accessibility & Motion Guidelines

### Accessibility (WCAG AAA)
* **Touch Targets**: All clickable components must scale to a minimum tap boundary box of $48 \times 48\text{ dp}$.
* **Labeling**: Every action button must declare descriptive `accessibilityLabel` properties.
* **Dynamic Type**: Container heights should use flexible measurements (`minHeight` and relative flex parameters) to prevent text clipping when OS font scaling is increased.

### Motion Curves
* **Spring Curve**: All physical object presses must align to `friction: 4, tension: 40`.
* **Timings**:
  * Shakes (form errors): 240ms sequence.
  * Transitions (pages): 350ms back-out easing.
  * Drawer Slides (bottom sheet): 250ms ease-out.

---

## 7. PR Review Checklist

Developers must check the following list before submitting code for review:
* [ ] No raw hex codes used (all colors read from `theme.colors`).
* [ ] Typography mappings match rules (General Sans for Headings, Inter for Body, Mono for Numbers).
* [ ] Padding/margins align to 8-point spatial multiples (`theme.spacing`).
* [ ] Dynamic text container limits verified (no font size clipping).
* [ ] Tap targets meet the minimum $48 \times 48\text{ dp}$ check.
* [ ] Accessibility label attributes are configured for non-text action targets.

---

## 8. Version Changelog & Roadmap

### v1.0.0 (Released July 2026)
* Complete foundation, semantic token layers, and theme compatibility bridges.
* Base controls catalog (Buttons, Inputs, Date/Phone validation cells, OTP split boxes, Modals, Drawers).
* Gated Developer Mode diagnostics and playground.

### Future Roadmap
* **v1.1.0**: Integrate centralized SearchBar, FilterChips, and WalletCard templates.
* **v1.2.0**: Implement live Kitchen streams visual elements and AI Meal Recommendation modules.
* **v2.0.0**: Dynamic theme styling improvements and multilingual translations backend localization integration.
