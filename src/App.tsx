import { ThemeProvider, Global } from '@emotion/react';
import Mini from '@karrotmarket/mini';
import { RecoilRoot } from 'recoil';

import Router from '@component/Router';

import '@karrotframe/navigator/index.css';

import global from './config/style/global';
import theme from './config/style/theme';

function App(): JSX.Element {
  const mini = new Mini();

  mini.startPreset({
    preset: process.env.REACT_APP_PRESET!,
    params: {
      appId: process.env.REACT_APP_APP_ID!,
    },
    async onSuccess(result) {
      if (result && result.code) {
        console.log(result);
      }
    },
  });

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
