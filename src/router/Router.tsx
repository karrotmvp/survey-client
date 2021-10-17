import { Navigator, Screen } from '@karrotframe/navigator';

import HomePage from '@page/HomePage';
// import QuestionDetailPage from '@page/QuestionDetailPage';
import QuestionPage from '@page/QuestionPage';
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
      <Screen path="/feedback"></Screen>
    </Navigator>
  );
}
