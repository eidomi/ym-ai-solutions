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
        /* Forminue-inspired color scheme */
        'bg-primary': '#F8FAFC',
        'bg-secondary': 'rgba(255, 255, 255, 0.5)',
        'bg-card': 'rgba(255, 255, 255, 0.45)',
        'text-primary': '#1E293B',
        'text-secondary': '#475569', /* Forminue slate */
        'accent': {
          primary: '#1976D2', /* Forminue blue */
          secondary: '#42A5F5', /* Lighter blue */
          cta: '#00BFA5', /* Forminue teal */
          'cta-hover': '#00A896', /* Darker teal */
        },
        'border-subtle': 'rgba(25, 118, 210, 0.15)',
        'glass': {
          bg: 'rgba(248, 250, 252, 0.4)',
          border: 'rgba(255, 255, 255, 0.2)',
        },
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        glass: '24px',
      },
      boxShadow: {
        'glow': '0 8px 32px rgba(25, 118, 210, 0.12)',
        'glow-hover': '0 8px 32px rgba(25, 118, 210, 0.18)',
        'cta': '0 4px 20px rgba(0, 191, 165, 0.25)',
        'cta-hover': '0 8px 30px rgba(0, 191, 165, 0.35)',
        'card': '0 4px 16px rgba(25, 118, 210, 0.08)',
        'card-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
        'proof-gradient': 'linear-gradient(135deg, rgba(25, 118, 210, 0.08) 0%, rgba(66, 165, 245, 0.05) 100%)',
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
      /* Keyframes defined in src/animations.css to avoid duplication */
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}







