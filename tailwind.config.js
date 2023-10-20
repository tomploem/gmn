module.exports = {
  content: ['{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['space-grotesk', 'sans-serif'],
      },
      fontWeight: {
        'medium': 'space-grotesk-medium',
        'semibold': 'space-grotesk-semibold',
        'bold': 'space-grotesk-bold',
        // Add other weights
      },
      backgroundColor: {
        primary: '#9f5ffe',
      },
      borderColor: {
        primary: '#9f5ffe',
      },
      colors: {
        primary: '#9f5ffe',
      },
      fill: {
        current: 'currentColor'
      }
    },
  },
  plugins: [],
};
