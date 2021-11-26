import { css } from '@emotion/react';

const global = css`
  html {
    /* 루트 요소 폰트 사이즈 */
    /* 기본값 16px에서 150%로 키워 24px */
    font-size: 10px;
  }

  @font-face {
    font-family: 'SpoqaHanSansNeo';
    font-weight: 400;
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

  body * {
    margin: 0;
    font-family: 'SpoqaHanSansNeo';
  }

  #root {
    width: 100%;
    height: 100vh;
    font-size: 10px;
    color: #141414;
  }
  button {
    border: none;
    outline: none;
  }
  li,
  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin: 0;
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

  input {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }

  textarea {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }
`;

export default global;
