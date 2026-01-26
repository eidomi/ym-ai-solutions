/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './main.js'],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '480px',
      'md': '600px',
      'lg': '768px',
      'xl': '1024px',
    },
    extend: {
      colors: {
        'bg-primary': '#F7F5F2',
        'bg-secondary': 'rgba(255, 255, 255, 0.5)',
        'bg-card': 'rgba(255, 255, 255, 0.45)',
        'text-primary': '#2C2825',
        'text-secondary': '#7A7265',
        'accent': {
          primary: '#C4856A',
          secondary: '#D4A088',
          cta: '#2A6B6B',
          'cta-hover': '#1F5252',
        },
        'border-subtle': 'rgba(196, 133, 106, 0.15)',
        'glass': {
          bg: 'rgba(247, 245, 242, 0.4)',
          border: 'rgba(255, 255, 255, 0.2)',
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        glass: '24px',
      },
      boxShadow: {
        'glow': '0 8px 32px rgba(196, 133, 106, 0.12)',
        'glow-hover': '0 8px 32px rgba(196, 133, 106, 0.18)',
        'cta': '0 4px 20px rgba(42, 107, 107, 0.25)',
        'cta-hover': '0 8px 30px rgba(42, 107, 107, 0.35)',
        'card': '0 4px 16px rgba(196, 133, 106, 0.08)',
        'card-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #C4856A 0%, #D4A088 100%)',
        'proof-gradient': 'linear-gradient(135deg, rgba(196, 133, 106, 0.08) 0%, rgba(212, 160, 136, 0.05) 100%)',
      },
      spacing: {
        'nav': '70px',
        'nav-lg': '90px',
        'safe-top': 'env(safe-area-inset-top, 0px)',
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
      },
      borderRadius: {
        '4xl': '24px',
      },
      animation: {
        'float': 'float 25s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'pulse-dot': 'pulse 2s infinite',
        'hero-float': 'hero-illustration-float 30s ease-in-out infinite',
        'trace-draw': 'trace-draw 3s ease-out forwards infinite',
        'node-pulse': 'node-pulse 2s ease-in-out infinite',
        'subtle-float': 'subtle-float 35s ease-in-out infinite',
        'icon-bounce': 'icon-bounce 0.4s ease',
        'stat-pop': 'stat-pop 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        'hero-illustration-float': {
          '0%, 100%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(calc(-50% - 12px))' },
        },
        'trace-draw': {
          '0%': { strokeDashoffset: '100', opacity: '0.3' },
          '50%': { strokeDashoffset: '0', opacity: '1' },
          '100%': { strokeDashoffset: '-100', opacity: '0.3' },
        },
        'node-pulse': {
          '0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(196, 133, 106, 0.4))', opacity: '0.7' },
          '50%': { filter: 'drop-shadow(0 0 8px rgba(196, 133, 106, 0.8))', opacity: '1' },
        },
        'subtle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'icon-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'stat-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
