import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#120b07',
        saddle: '#4f2f1b',
        cognac: '#9b5d2e',
        tan: '#c48a52',
        parchment: '#f4eadb',
        ivory: '#fff9ef',
        brass: '#c9a35b'
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        luxury: '0 30px 100px rgba(18, 11, 7, 0.35)'
      },
      backgroundImage: {
        'leather-grain':
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,.08) 0 1px, transparent 2px), radial-gradient(circle at 80% 10%, rgba(255,255,255,.05) 0 1px, transparent 2px), linear-gradient(135deg, rgba(79,47,27,.95), rgba(18,11,7,.98))"
      }
    }
  },
  plugins: []
};

export default config;
