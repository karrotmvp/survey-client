import { Navigator, Screen, INavigatorTheme } from '@karrotframe/navigator';

import QuestionPage from '@page/QuestionPage';
import AnswerComplete from '@src/page/AnswerComplete';
import AnswerDetailPage from '@src/page/AnswerDetailPage';
import AnswerHome from '@src/page/AnswerHome';
import EndPage from '@src/page/EndPage';
import FeedBackPage from '@src/page/FeedBackPage';
import GuidePage from '@src/page/GuidePage';
import ShowAllPage from '@src/page/ShowAllPage';
import SurveyAggregationPage from '@src/page/SurveyAggregationPage';
// import HomePage from '@src/page/HomePage';
import SurveyHome from '@src/page/SurveyHome';
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
    <Navigator theme={checkMobileType()}>
      <Screen path="/">
        <SurveyHome />
      </Screen>
      <Screen path="/guide">
        <GuidePage />
      </Screen>
      <Screen path="/feedback">
        <FeedBackPage />
      </Screen>
      <Screen path="/survey/aggregation/:surveyId/:questionNumber">
        <ShowAllPage />
      </Screen>
      <Screen path="/survey/aggregation/:surveyId">
        <SurveyAggregationPage />
      </Screen>
      <Screen path="/survey/create/target">
        <TargetPage />
      </Screen>
      <Screen path="/survey/create/question">
        <QuestionPage />
      </Screen>
      <Screen path="/survey/create/complete">
        <EndPage />
      </Screen>
      <Screen path="/survey/:surveyId/complete">
        <AnswerComplete />
      </Screen>
      <Screen path="/survey/:surveyId">
        <AnswerHome />
      </Screen>
      <Screen path="/survey/:surveyId/:questionTypes">
        <AnswerDetailPage />
      </Screen>
    </Navigator>
  );
}
