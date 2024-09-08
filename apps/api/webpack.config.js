const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
// eslint-disable-next-line @typescript-eslint/unbound-method
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/api'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
