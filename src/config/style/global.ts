import { css } from '@emotion/react';

const global = css`
  * {
    box-sizing: border-box;
  }

  #root {
    width: 100%;
    height: 100vh;
  }
  button {
    border: none;
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

  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 100;
    src: url('./font/S-Core_Dream_OTF/SCDream1.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 200;
    src: url('./font/S-Core_Dream_OTF/SCDream2.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 300;
    src: url('./font/S-Core_Dream_OTF/SCDream3.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 400;
    src: url('./font/S-Core_Dream_OTF/SCDream4.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 500;
    src: url('./font/S-Core_Dream_OTF/SCDream5.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 600;
    src: url('./font/S-Core_Dream_OTF/SCDream6.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 700;
    src: url('./font/S-Core_Dream_OTF/SCDream7.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 800;
    src: url('./font/S-Core_Dream_OTF/SCDream8.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 900;
    src: url('./font/S-Core_Dream_OTF/SCDream9.otf') format('opentype');
  }
  @font-face {
    font-family: 'S-Core Dream';
    font-weight: 100;
    src: url('./font/S-Core_Dream_OTF/SCDream1.otf') format('opentype');
  }
`;

export default global;
