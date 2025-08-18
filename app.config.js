// app.config.js
export default {
  expo: {
    name: "SpaceHive",
    slug: "spacehive-booking",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/icon.jpg",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.spacehive.booking",
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "This app uses location to show nearby spaces for booking.",
         ITSAppUsesNonExemptEncryption: "false"
      },
      buildNumber: "1.0.2"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.jpg",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION"
      ],
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      },
      package: "com.spacehive.spacehiveapp"
    },
    fonts: [
      "./assets/fonts/SFProDisplay-Regular.otf",
      "./assets/fonts/SFProDisplay-Medium.otf", 
      "./assets/fonts/SFProDisplay-Semibold.otf",
      "./assets/fonts/SFProDisplay-Bold.otf"
    ],
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-font",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow SpaceHive to use your location to find nearby spaces."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "b5519853-9d43-4c7d-a0dd-b2f3c2cdc1db"
      }
    }
  }
};