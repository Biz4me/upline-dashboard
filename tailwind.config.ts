import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#E2B84A',
          hover: '#ECC85E',
          muted: '#C9A84C',
        },
        dark: {
          DEFAULT: '#161410',
          secondary: '#1E1B14',
          border: '#2A2318',
        },
        light: {
          DEFAULT: '#FAF8F4',
          secondary: '#F0EBE0',
          border: '#E8DFC8',
        },
        text: {
          warm: '#A89878',
          'warm-light': '#7A6A4A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
