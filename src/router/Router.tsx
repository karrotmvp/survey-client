import { Navigator, Screen, INavigatorTheme } from '@karrotframe/navigator';

import HomePage from '@page/HomePage';
import QuestionPage from '@page/QuestionPage';
import AnswerHome from '@src/page/AnswerHome';
import EndPage from '@src/page/EndPage';
import FeedBackPage from '@src/page/FeedBackPage';
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
      <Screen path="/">
        <HomePage />
      </Screen>
      <Screen path="/survey/create">
        <AnswerHome />
      </Screen>
      <Screen path="/survey/create/target">
        <TargetPage />
      </Screen>
      <Screen path="/survey/create/question">
        <QuestionPage />
      </Screen>
      <Screen path="/survey/create/feedback">
        <FeedBackPage />
      </Screen>
      <Screen path="/survey/create/complete">
        <EndPage />
      </Screen>
    </Navigator>
  );
}
