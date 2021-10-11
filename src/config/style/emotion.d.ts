import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    fontFamily: string;
    fontWeight: {
      normal: string;
      bold: string;
      bold2: string;
    };
    color: {
      primaryOrange: string;
      whiteOrange: string;
      secondaryGreen: string;
      whiteGreen: string;
      darkGray: string;
      gray: string;
      whiteGray: string;
      darkWhite: string;
      white: string;
    };
    fontSize: {
      XXL: string;
      XL: string;
      L: string;
      M: string;
      S: string;
    };
    border: {
      radius: {
        XL: string;
        L: string;
        M: string;
        S: string;
      };
    };
    style: {
      flexColumn: string;
      flexSpaceBetween: string;
      flexAlignItemsCenter: string;
      flexCenter: string;
      skeletonStyles: string;
    };
  }
}

export { Theme };
