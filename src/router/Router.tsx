import { Navigator, Screen, INavigatorTheme } from '@karrotframe/navigator';

import QuestionPage from '@page/QuestionPage';
import ErrorBoundary from '@src/component/common/ErrorBoundary';
// import ErrorBoundary from '@src/component/common/ErrorBoundary';
import AnswerComplete from '@src/page/AnswerComplete';
import AnswerDetailPage from '@src/page/AnswerDetailPage';
import AnswerHome from '@src/page/AnswerHome';
import EndPage from '@src/page/EndPage';
import ErrorNoSurveyPage from '@src/page/ErrorNoSurveyPage';
import ErrorPage from '@src/page/ErrorPage';
// import ErrorPage from '@src/page/ErrorPage';
// import ErrorPage from '@src/page/ErrorPage';
import ExamplePage from '@src/page/ExamplePage';
import FeedbackCompletePage from '@src/page/FeedbackCompletePage';
import FeedBackPage from '@src/page/FeedBackPage';
import GuidePage from '@src/page/GuidePage';
// import HomePage from '@src/page/HomePage';
import ShowAllPage from '@src/page/ShowAllPage';
import SurveyAggregationPage from '@src/page/SurveyAggregationPage';
import SurveyHome from '@src/page/SurveyHome';

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
      <Screen path="/404">
        <ErrorNoSurveyPage />
      </Screen>

      <Screen path="/example">
        <ExamplePage />
      </Screen>

      <Screen path="/guide">
        <GuidePage />
      </Screen>

      <Screen path="/feedback/complete">
        <FeedbackCompletePage />
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

      <Screen path="/survey/aggregation">
        <SurveyHome />
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
        <ErrorBoundary fallback={<ErrorNoSurveyPage />}>
          <AnswerHome />
        </ErrorBoundary>
      </Screen>

      <Screen path="/survey/:surveyId/:questionTypes">
        <AnswerDetailPage />
      </Screen>

      <Screen path="/*">
        <ErrorPage />
      </Screen>
    </Navigator>
  );
}
