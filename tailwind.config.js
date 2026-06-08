/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // Preflight OFF: don't reset the existing vanilla-CSS pages — utilities still work.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        primary: '#E8336D',
        cream: '#F3EBDD',
        ink: '#1E1525',
        bone: '#FBF6F0',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
