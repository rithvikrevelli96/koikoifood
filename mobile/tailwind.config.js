/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4B5D3A',
          dark: '#7A9368',
        },
        secondary: {
          DEFAULT: '#C96B3C',
          dark: '#D78456',
        },
        accent: {
          DEFAULT: '#D9B65A',
          dark: '#E0C26A',
        },
        background: {
          light: '#FCFAF6',
          dark: '#171512',
        },
        surface: {
          light: '#F4EFE6',
          dark: '#24201C',
        },
        border: {
          light: '#E8E2D8',
          dark: '#3C362F',
        },
        text: {
          light: '#1F1F1F',
          dark: '#F8F6F2',
        },
        muted: '#8A857B',
      },
      fontFamily: {
        heading: ['General Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        button: '16px',
        input: '16px',
        card: '24px',
        dialog: '24px',
        sheet: '28px',
        full: '999px',
      },
    },
  },
  plugins: [],
};
