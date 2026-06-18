import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#faf7f2',
        surface: '#f2ece2',
        fg: '#2c2118',
        'fg-muted': '#7a6a58',
        accent: '#b5704a',
        'accent-soft': '#e8d5c4',
        'accent-dark': '#8b4f2e',
        border: '#ddd0c0',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        brand: '14px',
      },
    },
  },
  plugins: [],
};

export default config;
