const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('ts', 'tsx');
config.resolver.alias = {
  '@': './src',
};

module.exports = config;