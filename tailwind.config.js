/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#05070c',
        'navy-card': '#0a0e17',
        'navy-border': 'rgba(255, 255, 255, 0.08)',
        'accent-cyan': '#38bdf8',
        'accent-cyan-glow': 'rgba(56, 189, 248, 0.25)',
        'accent-blue': '#6366f1',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'slow-pulse': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
