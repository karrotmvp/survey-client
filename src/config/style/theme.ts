import { css } from '@emotion/css';

import { Theme } from './emotion.d';

const flexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

const flexAlignItemsCenter = css`
  display: flex;
  align-items: center;
`;
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const flexColumn = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const skeletonStyles = css`
  background-color: #d6d6d6;
  border-radius: 0.4rem;
`;

const theme: Theme = {
  fontFamily: {
    title: 'Cafe24Surround',
    normal: 'SpoqaHanSansNeo',
  },
  fontWeight: {
    thin: '100',
    light: '200',
    regular: '400',
    medium: '600',
    bold: '900',
  },
  color: {
    primaryOrange: '#FE7E35',
    whiteOrange: '#FFF2EB',
    secondaryGreen: '#259E6B',
    whiteGreen: '#EBF9F4',
    darkGray: '#2C3049',
    gray: '#707070',
    whiteGray: 'CACBD1',
    darkWhite: '#F4F3F8',
    white: '#F4F5F6',
    warningRedLight: '#FFF6F6',
    primaryOrangeLight: '#FFF2EB',
    neutralBlack: {
      main: '#141414',
      text: '#707070',
      placeholder: '#8b8b8b',
      disabled: '#c9c9c9',
      button: '#f4f3f8',
      tag: '#f4f5f6',
      line: '#f4f4f4',
    },
  },
  fontSize: {
    XXL: '2.2rem', // 22px
    XL: '1.6rem', //  16px
    L: '1.4rem', //  14px
    M: '1.3rem', // 1rem 13px
    S: '1.2rem', // 12px
  },

  border: {
    radius: {
      XL: '2rem', // 30px
      L: '1.25rem', // 20px
      M: '1rem', // 1rem
      S: '0.7rem', // 11px
    },
  },
  style: {
    flexColumn: `${flexColumn}`,
    flexSpaceBetween: `${flexSpaceBetween}`,
    flexAlignItemsCenter: `${flexAlignItemsCenter}`,
    flexCenter: `${flexCenter}`,
    skeletonStyles: `${skeletonStyles}`,
  },
};

export default theme;
