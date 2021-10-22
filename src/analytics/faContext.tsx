import { createContext, useContext } from 'react';

import { AnalyticsCallOptions } from 'firebase/analytics';

export interface Analytics {
  logEvent(eventName: string, params?: Record<string, unknown>): void;
  setUserId(id: string, options?: AnalyticsCallOptions): void;
}

// wow, such empty...
export const emptyAnalytics: Analytics = {
  logEvent(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  },
  setUserId(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  },
};

export const AnalyticsContext = createContext(emptyAnalytics);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAnalytics = () => useContext(AnalyticsContext);
