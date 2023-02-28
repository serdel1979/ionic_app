import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'apptosi',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    'GoogleAuth':{
      'scopes':['profile','email'],
      'serverClientId': '402562450789-0aau8bfeu40ef95tg4c1c8trnrjoblo5.apps.googleusercontent.com',
      'forceCodeForRefreshToken' : true
    }
  }
};

export default config;
