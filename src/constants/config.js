const isDevEnv = process.env.NODE_ENV === 'development';

export default {
  // App Details
  appName: 'ReactNativeExpoStarterKit',

  // Build Configuration - eg. Debug or Release?
  isDevEnv,

  // Date Format
  dateFormat: 'Do MMM YYYY',

  // API
  apiBaseUrl: isDevEnv
    ? 'http://192.168.0.102:1337'
    : 'http://192.168.0.102:1337',


  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: isDevEnv ? 'UA-84284256-2' : 'UA-84284256-1',
};
