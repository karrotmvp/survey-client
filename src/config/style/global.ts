import { css } from '@emotion/react';

const global = css`
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: 300;
    src: url('./font/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf')
      format('truetype');
  }
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: 900;
    src: url('./font/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf')
      format('truetype');
  }
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: 600;
    src: url('./font/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf')
      format('truetype');
  }
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: 200;
    src: url('./font/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.ttf')
      format('truetype');
  }
  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: 100;
    src: url('./font/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.ttf')
      format('truetype');
  }
  @font-face {
    font-family: 'Cafe24Surround';
    font-weight: 700;
    src: url('./font/Cafe24Ssurround/Cafe24Ssurround.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Cafe24Surround';
    font-weight: 400;
    src: url('./font/Cafe24SsurroundAir/Cafe24SsurroundAir.ttf')
      format('truetype');
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: SpoqaHanSansNeo;
  }

  #root {
    width: 100%;
    height: 100vh;
  }
  button {
    border: none;
  }
  li,
  ol {
    list-style: none;
    margin: 0;
    padding: 0ß;
  }
  h1,
  h2,
  h3,
  h4,
  h6 {
    margin: 0;
  }

  li {
    padding: 0;
  }
  ul {
    padding: 0;
  }
`;

export default global;
