import { ThemeProvider, Global } from '@emotion/react';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@karrotframe/navigator/index.css';


import fa from './analytics/analytics';
import { AnalyticsContext } from './analytics/faContext';
import global from './config/style/global';
import theme from './config/style/theme';
import Router from './router/Router';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <AnalyticsContext.Provider value={fa}>
          <Global styles={global} />
          <HashRouter>
            <Router />
          </HashRouter>
        </AnalyticsContext.Provider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
