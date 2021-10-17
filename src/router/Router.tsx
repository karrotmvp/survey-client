import { Navigator, Screen } from '@karrotframe/navigator';

import HomePage from '@page/HomePage';
// import QuestionDetailPage from '@page/QuestionDetailPage';
import QuestionPage from '@page/QuestionPage';

export default function Router(): JSX.Element {
  return (
    <Navigator>
      <Screen path="/">
        <HomePage />
      </Screen>
      <Screen path="/question">
        <QuestionPage />
      </Screen>
      <Screen path="/question/:id">
        <QuestionPage />
      </Screen>
      <Screen path="/question/short-answer"></Screen>
      <Screen path="/question/choice-answer"></Screen>
    </Navigator>
  );
}
