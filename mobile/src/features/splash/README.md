# Splash Screen Feature Module (KOI KOI DABBA)

An enterprise-grade, highly scalable, and campaign-ready startup splash feature. Designed to be modular, responsive, fully accessible, and type-safe.

---

## Folder Architecture

```
src/features/splash/
├── SplashScreen.tsx             <-- Parent screen controller (preloads assets, orchestrates state)
├── SplashLayout.tsx             <-- Layout manager arranging elements in safe-area bounds
├── SplashAnimations.ts          <-- Animated value sets and sequence mapping triggers
├── SplashTimeline.ts            <-- Reusable motion timesteps and delay parameters
├── SplashTheme.ts               <-- Multi-variant seasonal theme configurations
├── index.ts                     <-- Feature module entrypoint
├── README.md                    <-- Technical module documentation (this file)
│
├── types/
│   └── splash.ts                <-- Typed contracts for layout measurements, flags, and configs
│
├── constants/
│   ├── config/
│   │   ├── flags.ts             <-- Feature flags (e.g. enableLandscape, enableScooter)
│   │   ├── campaigns.ts         <-- Campaign configs (e.g. Campaign name, SeasonalVariant)
│   │   ├── navigation.ts        <-- Default completion screen routes
│   │   └── animations.ts        <-- Timing durations and speed presets
│   ├── strings.ts               <-- Localized fallback text labels
│   ├── featureItems.ts          <-- Shared bottom cards metadata (No Preservatives, etc.)
│   └── measurements.ts          <-- Breakpoints, diameters, and curved bar height tokens
│
├── utils/
│   ├── preload.ts               <-- Local bundled PNG pre-caching helper
│   ├── accessibility.ts         <-- System-level Reduce Motion detector
│   └── analytics.ts             <-- Granular lifecycle telemetry helper
│
├── hooks/
│   ├── useSplashAnimation.ts    <-- Sequenced parallel timeline orchestrator
│   ├── useSplashNavigation.ts   <-- Decoupled navigation routing and state guard
│   └── useSplashMeasurements.ts <-- Orientation layout dimension listener
│
├── illustrations/
│   ├── decorative/
│   │   ├── Leaves.tsx           <-- OliveBranch and LeafWreath SVG vectors
│   │   ├── Road.tsx             <-- Landscape winding road SVG
│   │   ├── Scooter.tsx          <-- Rider and delivery scooter SVG
│   │   └── Bubble.tsx           <-- Pointer speech bubble triangle SVG
│   ├── food/
│   │   ├── FoodFrame.tsx        <-- Steel centerpiece circular frame crop
│   │   └── Tiffin.tsx           <-- Organic mini tiffin container icon
│   └── index.ts                 <-- Illustrations exports index
│
└── components/
    ├── Branding/
    │   ├── Branding.tsx         <-- Branding layout container
    │   ├── Logo.tsx             <-- Tiffin logo wrapper
    │   ├── Wordmark.tsx         <-- Title elements "KOI KOI DABBA"
    │   └── Tagline.tsx          <-- heart separator and tagline text
    │
    ├── Hero/
    │   ├── Hero.tsx             <-- Centerpiece layout container
    │   ├── Background.tsx       <-- Watercolor backdrop
    │   ├── FoodImage.tsx        <-- Main bitmap image
    │   ├── Decorations.tsx      <-- Hand-drawn vector arrows
    │   └── Annotations.tsx      <-- House, heart, and chef outlines
    │
    ├── Landscape/               <-- Road illustration and delivery scooter animation wrapper
    ├── BottomBar/               <-- Curved panel containing global FeatureCards
    ├── CTA/                     <-- Skip/Action button container placeholder
    └── Decorations/             <-- Top right bubble and branch layout container
```

---

## Animation Timelines

Motion transitions run sequentially on the Native driver at a fluid 60 FPS:
1. **DecorativeReveal** (0ms): Olive branch translates downward; speech bubble pops up.
2. **BrandIntro** (450ms): Brand wordmark and logo scale up and fade in.
3. **HeroReveal** (700ms): Food centerpiece floats upward with a soft bounce.
4. **LandscapeReveal** (1300ms): Scooter drives across the winding road.
5. **FooterReveal** (1700ms): Bottom curved green bar slides upward.
6. **CardsFade** (2000ms): Data feature cards fade in.
7. **TotalDuration** (5000ms): Timeline hold completes, initiating transition routing.

---

## Campaign & Theme Variant Support

The module supports swapping styles for seasonal marketing campaigns (e.g. Christmas, Diwali, Summer) without changing component files. 

Configured variant colors are mapped in `SplashTheme.ts`:
- **`light`**: Warm Muji-like organic palette (Default).
- **`festive`**: Red and Gold celebratory theme.
- **`summer`**: Bright Terracotta Orange and Yellow.
- **`monsoon`**: Cool Rain Blue and Slate Grey.
- **`diwali`**: Saffron, Clay Orange, and Bright Lamp Gold.
- **`christmas`**: Holly Green, Ribbon Red, and Gold accents.

### How to Add a New Campaign
1. Open `SplashTheme.ts` and add a new config block under `SplashTheme`:
   ```typescript
   myNewCampaign: {
     background: '#F0F0F0',
     primary: '#4B5D3A',
     secondary: '#C96B3C',
     // ... fill required SplashColorPalette properties
   }
   ```
2. Open `constants/config/campaigns.ts` and change `themeVariant` to `'myNewCampaign'`.

---

## Telemetry Metrics

Granular lifecycle events are dispatched to the design system's telemetry hook:
1. **`Splash Visible`**: Mount trigger.
2. **`Assets Loaded`**: Dispatched once preloading finishes, with loading latency (`durationMs`) metadata.
3. **`Animations Started`**: Cinematic timeline begins.
4. **`Animations Finished`**: Sequences complete.
5. **`Navigation Started`**: Navigation router triggers target routing.
6. **`Navigation Finished`**: Complete scene routing callback triggers successfully.
