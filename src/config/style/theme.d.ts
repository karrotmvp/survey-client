declare type DefaultTheme = {
  fontFamily: string;
  fontWeight: {
    normal: string;
    bold: string;
    bold2: string;
  };
  color: {
    darkGray: string;
    gray: string;
    white: string;
    green: string;
    mint: string;
    whiteMint: string;
    purple: string;
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
};

export default DefaultTheme;
