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
    normal: '400',
    bold: '700',
    bold2: '900',
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
  },
  fontSize: {
    XXL: '2rem', // 32px
    XL: '1.5rem', //  24px
    L: '1.2rem', // 18px
    M: '1rem', // 16px
    S: '0.75rem', // 12px
  },

  border: {
    radius: {
      XL: '2rem', // 30px
      L: '1.25rem', // 20px
      M: '1rem', // 16px
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
