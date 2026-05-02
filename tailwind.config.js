/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#0d0d0d',
        paper: '#f9f6f0',
        cream: '#f0ebe2',
        rust: '#d96a3a',
        amber: '#e8a829',
        sage: '#5fa85c',
        steel: '#3b7ec8',
        muted: '#9b8f7e',
        dim: '#6b6159',
      }
    }
  },
  plugins: []
}
