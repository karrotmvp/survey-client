import { ThemeProvider, Global } from '@emotion/react';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import '@karrotframe/navigator/index.css';

import global from './config/style/global';
import theme from './config/style/theme';
import Router from './router/Router';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Global styles={global} />
        <HashRouter>
          <Router />
        </HashRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
