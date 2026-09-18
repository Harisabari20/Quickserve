module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-redux|@reduxjs/toolkit|immer|@babel/runtime|@react-native-async-storage|react-native-safe-area-context|react-native-screens|react-native-vector-icons)/)',
  ],
};
