exceljs 

The standard exceljs library can work in React Native with Node polyfills

Installation: npm install exceljs

Setup needed: You'll need stream and buffer polyfills:

bash
npm install stream-browserify readable-stream buffer
Then add to your metro.config.js:

javascript
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  stream: require.resolve('stream-browserify'),
  buffer: require.resolve('buffer/'),
};

module.exports = config;
