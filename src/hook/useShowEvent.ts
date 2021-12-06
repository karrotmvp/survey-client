import { useEffect } from 'react';

import { useCurrentScreen } from '@karrotframe/navigator';

import { useAnalytics } from '@src/analytics/faContext';

function useResponseShowEvent(
  text: string,
  surveyId: string,
  ref: string,
): void {
  const { isTop } = useCurrentScreen();
  const fa = useAnalytics();

  useEffect(() => {
    if (isTop) {
      fa.logEvent(text, { surveyId, ref });
      fa.logEvent(`${surveyId}_${text}`, { ref });
    }
  }, [isTop]);
}

function useShowEvent(text: string): void {
  const { isTop } = useCurrentScreen();
  const fa = useAnalytics();

  useEffect(() => {
    if (isTop) {
      fa.logEvent(text);
    }
  }, [isTop]);
}
export { useResponseShowEvent, useShowEvent };
