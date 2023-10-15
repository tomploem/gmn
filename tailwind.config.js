module.exports = {
  content: ['{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'],
  theme: {
    extend: {
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
