require('dotenv').config();
module.exports = {
  expo: {
    name: 'CraftPile',
    slug: 'craftpile',
    scheme: 'craftpile',
    version: '1.0.0',
    entryPoint: 'App.js',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#F5F5F5',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.ejklemen.CraftPile',
      infoPlist: {
        NSCameraUsageDescription:
          "This app uses the camera to take images of children's artwork.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.ejklemen.CraftPile',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: 'ec7959b0-363b-4234-9427-590c939b461b',
      },
      graphqlUrl: process.env.GRAPHQL_URL,
    },
  },
};
