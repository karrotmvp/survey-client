const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

const media = {
  custom: customMediaQuery,
  1440: customMediaQuery(1440),
  768: customMediaQuery(768),
  tablet: customMediaQuery(1100),
  mobile: customMediaQuery(500),
};

const log = (text: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(text);
  }
};

export { media, log };
