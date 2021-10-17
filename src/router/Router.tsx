import { Navigator, Screen } from '@karrotframe/navigator';

import HomePage from '@page/HomePage';
// import QuestionDetailPage from '@page/QuestionDetailPage';
import QuestionPage from '@page/QuestionPage';
import EndPage from '@src/page/EndPage';
import FeedBackPage from '@src/page/FeedBackPage';
import TargetPage from '@src/page/TargetPage';

export default function Router(): JSX.Element {
  return (
    <Navigator>
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
      <Screen path="/end">
        <EndPage />
      </Screen>
    </Navigator>
  );
}
