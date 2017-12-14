const path = require('path');
const { injectBabelPlugin, compose } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less-modules');
const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = function override(config, env) {
  if (env === "development") {
    config = injectBabelPlugin(["dva-hmr"], config);
  }

  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);

  config.externals = {
  }

  config.plugins.push(
    new AutoDllPlugin({
      inject: true,
      debug: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: [
          'react',
          'react-dom'
        ]
      }
    })
  );

  return rewireLess.withLoaderOptions(
    `${env === 'production' ? 'app' : '[local]'}-[hash:base64:8]`,
    {
      modifyVars: {
        '@primary-color': '#1DA57A',
        '@link-color': '#1DA57A',
        '@border-radius-base': '2px',
        '@font-size-base': '14px',
        '@line-height-base': '1.2',
        '@card-actions-background': '#f5f8fa',
      }
    }
  )(config, env);
};