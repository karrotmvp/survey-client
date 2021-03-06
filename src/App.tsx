import { ThemeProvider, Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@karrotframe/navigator/index.css';
import '@karrotframe/tabs/index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import fa from './analytics/analytics';
import { AnalyticsContext } from './analytics/faContext';
import ErrorBoundary from './component/common/ErrorBoundary';
import global from './config/style/global';
import theme from './config/style/theme';
import ErrorPage from './page/ErrorPage';
import Router from './router/Router';

function App(): JSX.Element {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <AnalyticsContext.Provider value={fa}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Global styles={global} />

            <Router />
          </RecoilRoot>
        </ThemeProvider>
      </AnalyticsContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
