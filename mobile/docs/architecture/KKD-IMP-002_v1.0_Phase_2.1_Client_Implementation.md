# KOI KOI DABBA — Phase 2.1 Client Implementation Specification

---

## Document Metadata

| Field | Value |
| :--- | :--- |
| **Document ID** | KKD-IMP-002 |
| **Version** | 1.0 (IMMUTABLE FROZEN BASELINE) |
| **Status** | ✅ Implementation Baseline Approved (Production Release Pending Runtime QA) |
| **Owner** | Engineering |
| **Approvers** | Engineering Lead · QA Lead · Product Owner |
| **Created** | 2026-07-21 |
| **Next Review** | Prior to Phase 2.2 Backend Integration |
| **Supersedes** | None |
| **Successor Document** | KKD-QA-002_v1.1_Runtime_Verification_Report.md |

---

## Document Classification

| Category | Value |
| :--- | :--- |
| **Document Type** | Implementation Specification |
| **Lifecycle Stage** | Phase 2.1 |
| **Audience** | Engineering · QA · Product |
| **Release Type** | Client-Side Implementation |
| **Approval Level** | Engineering Baseline (v1.0 Frozen) |

---

## Scope

This document records the client-side implementation completed for Phase 2.1 of KOI KOI DABBA.

### Included

- **Modular State Management**: Domain-specific contexts (`WalletContext`, `SubscriptionContext`).
- **Local Persistence**: Client-side storage of balance, transactions, skipped dates, addresses, and user preferences via `storage.ts`.
- **UI & Interaction Enhancements**: Dynamic Meal Swap & Skip Calendar (`+₹95` wallet credit), Daily Nutrition Progress Dashboard, Kitchen Transparency Widget, Delivery Quick Actions & Voice Note Recorder.
- **Mock-Data Architecture**: Production-shaped client models ready for API binding.
- **Theme Token Compliance**: 100% token-driven Light, Warm Dark, and System theme support (`t.*` tokens).

### Excluded

- **Backend APIs**: REST / GraphQL endpoints.
- **Authentication Services**: Remote OAuth / OTP server verification.
- **Payment Gateway Integration**: Live payment gateway webhooks.
- **Live Rider Tracking Services**: WebSockets / SSE GPS streaming.
- **Production Data Synchronization**: Multi-device cloud sync.

---

## Implementation Principles

This implementation adheres strictly to the following engineering principles:

- **Design System v1.0 Compliance**: Composes all UI using frozen typography, spacing, card hierarchy, colors, and background variants.
- **Component Reusability**: Reuses core design system components (`PageLayout`, `Card`, `HeroCard`, `InfoCard`, `Button`, `Badge`) rather than writing ad-hoc wrappers.
- **Modular Context Architecture**: Separates domain responsibilities into lightweight React contexts (`WalletContext`, `SubscriptionContext`).
- **Client-Side Only Scope**: Zero backend APIs, zero databases, and zero server dependencies.
- **Backend-Ready Interfaces**: All state, models, and context methods match production REST/GraphQL data structures for seamless future integration.
- **Theme Token Compliance**: Uses dynamic `t.*` tokens exclusively for 100% Light, Warm Dark, and System theme support.
- **Accessibility-First**: All interactive buttons, chips, tabs, and rows maintain touch targets and accessibility properties.
- **Zero Breaking Changes**: Preserves all existing navigation flows, routes, and bottom tab behaviors.

---

## 🚀 Accomplished Work

### 1. Domain Context Layer
- [x] Created [WalletContext.tsx](file:///c:/projects/koikoi/mobile/src/core/context/WalletContext.tsx) to manage wallet balance, top-up transactions, order deductions, and skip meal credits (`+₹95`). Implements auto-persistence via `storage.ts`.
- [x] Created [SubscriptionContext.tsx](file:///c:/projects/koikoi/mobile/src/core/context/SubscriptionContext.tsx) to manage skipped dates, meal swapping before 8:00 AM cutoff, and active plan details. Implements auto-persistence via `storage.ts`.
- [x] Wrapped providers cleanly inside `AppProvider.tsx`.

### 2. Feature 1 & 2 — Subscribed Home Screen
- [x] **Subscription Management & Skip/Swap Calendar** ([SubscribedHomeScreen.tsx](file:///c:/projects/koikoi/mobile/src/features/home/components/SubscribedHomeScreen.tsx)):
  - Multi-day delivery calendar (Thu 23 Jul, Fri 24 Jul, Sat 25 Jul, Sun 26 Jul).
  - Tapping any date toggles pause/skip status, credits `+₹95` directly to Dabba Wallet via `WalletContext`, and displays skipped badge.
  - **Meal Swap Dialog**: 1-tap swap between "South Indian Special", "North Indian Deluxe", and "High Protein Sprouts Bowl" before 8:00 AM cutoff.
- [x] **Daily Nutrition Progress Dashboard** ([SubscribedHomeScreen.tsx](file:///c:/projects/koikoi/mobile/src/features/home/components/SubscribedHomeScreen.tsx)):
  - Nutrition breakdown card: Calories (`1,450 / 2,100 kcal`), Protein (`48g / 65g`), Carbs (`180g / 220g`), Fiber (`28g / 35g`).
  - Displays `69% Goal Met` status badge with progress bars.

### 3. Feature 3 — Kitchen Transparency
- [x] **Live Kitchen Audit Index Widget** ([KitchenScreen.tsx](file:///c:/projects/koikoi/mobile/src/features/kitchen/KitchenScreen.tsx)):
  - Hygiene Rating (`4.9 / 5.0 ⭐ Certified Grade A+`).
  - Cooking Temperature (`85°C Core Thermal Log`).
  - Chef on Duty (`Chef Lakshmi`).
  - Packing Timestamp (`11:15 AM Thermal Sealed`).
  - `🌿 Freshly Prepared` badge.

### 4. Feature 4 — Local Persistence
- [x] `AsyncStorage` persistence via `storage.ts` wrapper:
  - Saved Addresses (`@koikoi_onboarding_addresses_list`).
  - Wallet Balance & Transactions (`@koikoi_wallet_data`).
  - Skipped Dates & Swapped Meals (`@koikoi_subscription_data`).
  - User Preferences & Theme Mode (`koikoi_theme_mode`).

### 5. Feature 5 — Delivery Quick Actions
- [x] Enhanced [TrackingScreen.tsx](file:///c:/projects/koikoi/mobile/src/features/tracking/TrackingScreen.tsx) with quick action instructions:
  - `🛡️ Leave with Security`
  - `🚪 Leave at Door`
  - `🔔 Ring Bell & Leave`
  - `📞 Call Rider` (simulated dialer)
  - `🎙️ Voice Note to Rider` (modal recorder simulating 5s voice note recording with playback & status update).
- [x] 100% theme token compliant (`t.*` tokens, zero hardcoded colors).

---

## 🔍 Verification & Implementation Status

| Check | Method | Status |
| :--- | :--- | :--- |
| `npx tsc --noEmit` | Static — Terminal output | ✅ **0 errors** |
| `theme.colors.light.*` in modified screens | Static — Grep audit | ✅ **0 remaining** |
| Dynamic Meal Skip & Wallet Credit (`+₹95`) | Code Review / State | ✅ Implemented *(pending runtime verification)* |
| Meal Swap Dialog | Code Review / State | ✅ Implemented *(pending runtime verification)* |
| Daily Nutrition Progress Card | Code Review | ✅ Implemented *(pending runtime verification)* |
| Kitchen Transparency Audit Index | Code Review | ✅ Implemented *(pending runtime verification)* |
| Delivery Quick Actions & Voice Recorder | Code Review | ✅ Implemented *(pending runtime verification)* |
| `AsyncStorage` Persistence | Storage wrapper | ✅ Implemented *(⏳ Runtime verification pending)* |
| Light, Dark, System Theme Support | Token compliance | ✅ Token implementation complete *(⏳ Device verification pending)* |

---

## PHASE 2.1 IMPLEMENTATION STATUS

```
=====================================================
         PHASE 2.1 IMPLEMENTATION STATUS
=====================================================

Implementation
✅ Complete

Architecture
✅ Modular Context Architecture
   (WalletContext + SubscriptionContext)

Design System
✅ Fully compliant (Design System v1.0)

Backend Integration
❌ Not implemented (Client-side only)

Static Verification
✅ Passed
  · TypeScript: npx tsc --noEmit → 0 errors
  · Theme audit: 0 hardcoded light colors in modified files
  · Code review of all 5 feature implementations

Runtime Verification
⏳ Pending
  · Android runtime QA
  · iOS simulator/device QA
  · AsyncStorage restore verification
  · Dark Mode visual verification
  · Navigation smoke test

Release Status

► Approved as Phase 2.1 Implementation Baseline
  (Pending Runtime QA for Production Release)
=====================================================
```

---

## NEXT DEVELOPMENT PHASE

### Phase 2.2 Scope

**Backend Integration**
- Wallet REST / GraphQL APIs
- Subscription Lifecycle & Calendar APIs
- Meal Swap & Cutoff Validation APIs
- Live Rider Tracking WebSockets / SSE
- Kitchen Audit & Camera Stream APIs

**Replace Mock Data**
- Nutrition Dashboard calculations
- Kitchen Transparency live temperature/hygiene stream
- Delivery Rider instructions & voice upload
- Wallet Transactions & payment gateway webhooks
- Skip Calendar date locks

**Future Integrations**
- Push Notifications (Expo / FCM / APNS)
- Live GPS Rider Tracking on Map
- Payment Gateway (Razorpay / UPI Intent)
- Analytics & Telemetry (PostHog / Mixpanel)
- Admin Kitchen & Dispatch Dashboard

**Status**
► **Ready for Phase 2.2 Planning**

---

> [!NOTE]
> **KKD-IMP-002 v1.0 is permanently frozen and immutable.** No further structural modifications will be made to v1.0. All future updates belong to v1.1 (Runtime QA & Sign-off in `KKD-QA-002`) or v2.0 (Phase 2.2 Backend Integration in `KKD-IMP-003`).
