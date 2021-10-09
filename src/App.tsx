import { ThemeProvider, Global } from '@emotion/react';
import Mini from '@karrotmarket/mini';

import '@karrotframe/navigator/index.css';
import Router from './component/Router';
import global from './config/style/global';
import theme from './config/style/theme';

function App() {
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
      <Global styles={global} />
      <Router />
    </ThemeProvider>
  );
}

export default App;
