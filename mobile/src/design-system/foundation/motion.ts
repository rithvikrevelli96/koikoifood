export const motion = {
  timings: {
    page: 300,        // Standard page fade & slide transition (ms)
    sheet: 350,       // Bottom sheet slide spring (ms)
    hover: 180,       // Card lift scale transitions (ms)
    shake: 250,       // Form input error shaking (ms)
    fade: 200,        // Success ticks and alerts fades (ms)
  },
  physics: {
    springConfig: {
      damping: 15,
      mass: 0.8,
      stiffness: 120,
    },
  },
};
