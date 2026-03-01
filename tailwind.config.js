/** @type {import('tailwindcss').Config} */
export default {
  // This content array is what fixes the warning. It tells Tailwind to scan these files.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.15)',
        }
      },
      boxShadow: {
        'glass-inner': 'inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.05)',
        'glass-drop': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'liquid': '24px',
      }
    },
  },
  plugins: [],
}