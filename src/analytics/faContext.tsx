/* eslint-disable no-console */
import { createContext, useContext } from 'react';

import { Analytics } from './analytics';

// wow, such empty...
export const emptyAnalytics: Analytics = {
  logEvent(...args) {
    console.log(...args);
  },
  setUserId(...args) {
    console.log(...args);
  },
  setUserProperties(...args) {
    console.log(...args);
  },
};

export const AnalyticsContext = createContext(emptyAnalytics);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAnalytics = () => useContext(AnalyticsContext);
