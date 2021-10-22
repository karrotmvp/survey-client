import { useEffect } from 'react';

import { Navigator, Screen, INavigatorTheme } from '@karrotframe/navigator';
import { useHistory } from 'react-router-dom';

import HomePage from '@page/HomePage';
import QuestionPage from '@page/QuestionPage';
import { useAnalytics } from '@src/analytics/faContext';
import EndPage from '@src/page/EndPage';
import FeedBackPage from '@src/page/FeedBackPage';
import TargetPage from '@src/page/TargetPage';

export default function Router(): JSX.Element {
  const history = useHistory();
  const fa = useAnalytics();
  useEffect(() => {
    history.listen(location => {
      fa.logEvent('pageView', { path: location.pathname + location.search });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const checkMobileType = (): INavigatorTheme => {
    const UA = navigator.userAgent.toLowerCase(); // userAgent 값 얻기
    if (UA.indexOf('android') > -1) return 'Android';
    if (
      UA.indexOf('iphone') > -1 ||
      UA.indexOf('ipad') > -1 ||
      UA.indexOf('ipod') > -1
    )
      return 'Cupertino';
    return 'Android';
  };

  return (
    <Navigator useCustomRouter theme={checkMobileType()}>
      <Screen path="/">
        <HomePage />
      </Screen>
      <Screen path="/target">
        <TargetPage />
      </Screen>
      <Screen path="/question">
        <QuestionPage />
      </Screen>
      <Screen path="/feedback">
        <FeedBackPage />
      </Screen>
      <Screen path="/complete">
        <EndPage />
      </Screen>
    </Navigator>
  );
}
