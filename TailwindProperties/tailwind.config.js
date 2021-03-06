module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'green-color': '#466961',
        'beige-color': '#b3aa84',
        'red-color': '#962c23',
        'midnight-color': '#050a0e',
        'dark-blue-color': '#082632',
        'light-blue-color': '#066f8b',
        'off-white-color': '#FDFDFD',
        'off-gray-color': '#f5f0ed',
        'black-bg-color' : '#050a0e',
      },
      fontFamily: {
        body: ['HansonBold', 'Russo One'],
        sub: ['RadioGrotesk'],
        signature: ['Square']
      },
      height: {
        'gameSize': '32rem',
       },
       width: {
        'gameSize': '32rem',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
