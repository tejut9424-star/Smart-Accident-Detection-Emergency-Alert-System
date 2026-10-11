/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070a12',
          900: '#0c101d',
          850: '#111728',
          800: '#161f36',
          700: '#1e294b',
          600: '#2b3966',
        },
        brand: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          teal: '#05d5b3',
          purple: '#7928ca',
          pink: '#ff0080',
        },
        emergency: {
          red: '#ff1744',
          glow: '#ff3366',
          orange: '#ff6d00',
          yellow: '#ffd600',
          green: '#00e676',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'scanline': 'scanline 6s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(255, 23, 68, 0.8))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 5px rgba(255, 23, 68, 0.3))' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
