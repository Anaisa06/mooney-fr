module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './assets',
          '@components': './src/components',
          '@screens': './src/screens',

        }
      }
    ]
  ]
};
