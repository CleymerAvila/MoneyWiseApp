import { style } from '@angular/animations';
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MoneyWise',
  webDir: 'www',
  plugins: {
    StatusBar : {
      style: 'light',
      backgroundColor: '#e8f5f2',
      overlaysWebView: false
    }
  }
};

export default config;
