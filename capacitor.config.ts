import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.movo.app',
  appName: 'Movo',
  webDir: 'www',
  server: {
    url: 'https://movo-kappa.vercel.app',
    cleartext: false
  }
};

export default config;
