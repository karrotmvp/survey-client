import { useEffect } from 'react';

<<<<<<< HEAD
import { Navigator, Screen } from '@karrotframe/navigator';
=======
import { Navigator, Screen, INavigatorTheme } from '@karrotframe/navigator';
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';

import HomePage from '@page/HomePage';
import QuestionPage from '@page/QuestionPage';
import EndPage from '@src/page/EndPage';
import FeedBackPage from '@src/page/FeedBackPage';
import TargetPage from '@src/page/TargetPage';

ReactGA.initialize(process.env.REACT_APP_TRACKING_ID || '');

export default function Router(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    history.listen(location => {
      ReactGA.ga('set', 'page', location.pathname + location.search);
      ReactGA.ga('send', 'pageview');
    });
  }, [history]);

<<<<<<< HEAD
  return (
    <Navigator useCustomRouter theme="Cupertino">
=======
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
>>>>>>> 737c1477dd62e01db2aded6967e9e80f1bb8f5f3
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
