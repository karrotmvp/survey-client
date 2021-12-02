import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    fontFamily: {
      title: string;
      normal: string;
    };
    fontWeight: {
      thin: string;
      light: string;
      regular: string;
      medium: string;
      bold: string;
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
      warningRedLight: string;
      primaryOrangePressed: string;
      primaryOrangeLight: string;
      neutralBlack: {
        main: string;
        text: string;
        placeholder: string;
        disabled: string;
        button: string;
        tag: string;
        line: string;
      };
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
