/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'turf-dark': '#0a0a0a',
        'turf-space': '#111111',
        'turf-neon': '#ccff00',
        'turf-alert': '#ff3366',
        'turf-blue': '#00d4ff',
        'turf-glass': 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Anton', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-pattern': 'url("data:image/svg+xml,%3Csvg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"%23ccff00\\" fill-opacity=\\"0.05\\" fill-rule=\\"evenodd\\"%3E%3Ccircle cx=\\"3\\" cy=\\"3\\" r=\\"3\\"%3E%3C/circle%3E%3Ccircle cx=\\"13\\" cy=\\"13\\" r=\\"3\\"%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 0 0 rgba(204, 255, 0, 0.4)' },
          '50%': { opacity: .5, boxShadow: '0 0 20px 0 rgba(204, 255, 0, 0.1)' },
        }
      }
    },
  },
  plugins: [],
};

export default tailwindConfig;
