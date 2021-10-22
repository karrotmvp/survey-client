import {
  getAnalytics,
  setUserId,
  logEvent,
  AnalyticsCallOptions,
} from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_TRACKING_ID,
  authDomain: 'mudda1-7d764.firebaseapp.com',
  projectId: 'mudda1-7d764',
  storageBucket: 'mudda1-7d764.appspot.com',
  messagingSenderId: '1004732040467',
  appId: '1:1004732040467:web:15d8a49824e93861d406e6',
  measurementId: 'G-YL9DD0GKN8',
};

interface Analytics {
  logEvent(eventName: string, params?: Record<string, unknown>): void;
  setUserId(id: string, options?: AnalyticsCallOptions): void;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fa: Analytics = {
  logEvent(eventName, params) {
    logEvent(analytics, eventName, params);
  },
  setUserId(id, options) {
    setUserId(analytics, id, options);
  },
};

export default fa;
