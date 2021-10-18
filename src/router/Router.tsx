import { useEffect } from 'react';

import { Navigator, Screen } from '@karrotframe/navigator';
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

  return (
    <Navigator useCustomRouter>
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
