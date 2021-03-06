// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
  override,
  addWebpackAlias,
  // addWebpackPlugin,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('customize-cra');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = override(
  addWebpackAlias({
    '@src': path.resolve(__dirname, 'src'),
    '@api': path.resolve(__dirname, 'src/api'),
    '@component': path.resolve(__dirname, 'src/component'),
    '@config': path.resolve(__dirname, 'src/config'),
    '@page': path.resolve(__dirname, 'src/page'),
    '@atom': path.resolve(__dirname, 'src/atom'),
    '@router': path.resolve(__dirname, 'src/router'),
    '@hook': path.resolve(__dirname, 'src/hook'),
  }),
  // addWebpackPlugin(new BundleAnalyzerPlugin()),
);
