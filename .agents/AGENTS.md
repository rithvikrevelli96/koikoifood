# KOI KOI DABBA — Workspace Style Guidelines

These behavioral rules and style guides apply to all future coding tasks in this repository.

## 🔒 Design System v1.0 (Production Freeze)

From this point onward, do not introduce new visual patterns. Compose all screens by reusing existing typography, card hierarchy, spacing, colors, buttons, and background variants.

### 1. Brand Tokens
- **Primary Olive**: `#4B5D3A` (Used for selection states, active tabs, and status badges)
- **Secondary Orange**: `#C96B3C` (Used for primary action CTAs and active interactive highlights)
- **Accent Gold**: `#D9B65A` (Used for tier highlights/stars)
- **Background Cream**: `#FCFAF6`
- **Surface Sand**: `#F4EFE6`
- **Text Charcoal**: `#1F1F1F`
- **Border Muted**: `#E8E2D8`
- **Muted Label**: `#8A857B`

### 2. Typography Mappings
- **Headings**: General Sans
- **Body & Labels**: Inter
- **Numbers & Values**: IBM Plex Mono

### 3. Background Variants
- **Level 1 — Clean**: `#FCFAF6` solid with no graphics (Profile, settings, payments, checkout, support)
- **Level 2 — Minimal Organic**: `#FCFAF6` with 2-3% opacity soft watercolor/organic texture (Home, Meals, Plans)
- **Level 3 — Warm Organic**: `#FCFAF6` with warm organic watercolor illustrations (Login, OTP, onboarding welcome)
- **Level 4 — Celebration**: `#FCFAF6` with themed richer congratulatory illustrations (payment success, referral reward screens)

### 4. Card System Hierarchy
- **Hero Card (Radius 24px)**: Soft elevation. Used for Today's Delivery, Kitchen Live, Today's Meal, Profile Hero.
- **Standard Card (Radius 20px, 1px border, Y=6 shadow)**: Used for subscription information, wallet balances, rewards, family settings, support center categories.
- **Info Card (Radius 20px, flat border only, no shadow)**: Used for nutrition values, health metrics, meal preferences, app settings.

### 5. Motion Specifications
- **Button Press**: 120ms
- **Card Press**: 180ms
- **Chip/Tab Select**: 180ms
- **Navigation Transitions**: 220ms
- **Modal Transitions**: 280ms
- **Toast Notifications**: 200ms
- **Progress Trackers**: 400ms

### 6. Development Rules
- ❌ Do not add new custom colors.
- ❌ Do not create extra card styles or ad-hoc margins/paddings.
- ❌ Do not add decorative backgrounds outside the four frozen variants.
- ✅ Reuse `HeroCard`, `Card`, `InfoCard`, and `PageLayout` from the `design-system` package.
