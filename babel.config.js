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
          "@components": "./src/components",
          "src": "./src"
        }
      },
      'react-native-reanimated/plugin',
    ]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
