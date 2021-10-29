import { Navigator, Screen, INavigatorTheme } from '@karrotframe/navigator';

import HomePage from '@page/HomePage';
import QuestionPage from '@page/QuestionPage';
import EndPage from '@src/page/EndPage';
import FeedBackPage from '@src/page/FeedBackPage';
import Redirect from '@src/page/Redirect';
import TargetPage from '@src/page/TargetPage';

export default function Router(): JSX.Element {
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
      <Screen path="/survey">
        <HomePage />
      </Screen>
      <Screen path="/redirect">
        <Redirect />
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
