import { Navigator, Screen } from '@karrotframe/navigator';

import HomePage from '@page/HomePage';
import QuestionDetailPage from '@page/QuestionDetailPage';
import QuestionIntroducePage from '@page/QuestionIntroducePage';
import CreatePage from '@page/QuestionPage';

export default function Router(): JSX.Element {
  return (
    <Navigator>
      <Screen path="/">
        <HomePage />
      </Screen>
      <Screen path="/question">
        <CreatePage />
      </Screen>
      <Screen path="/question/INTRODUCE">
        <QuestionIntroducePage />
      </Screen>
      <Screen path="/question/:id">
        <QuestionDetailPage />
      </Screen>
      <Screen path="/question/short-answer"></Screen>
      <Screen path="/question/choice-answer"></Screen>
    </Navigator>
  );
}
