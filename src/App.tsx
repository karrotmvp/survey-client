import { ThemeProvider, Global } from '@emotion/react';
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
        <Router />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
