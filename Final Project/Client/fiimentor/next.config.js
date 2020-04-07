const webpack = require('webpack');


module.exports = {
  webpack: (config) => {
    const definePlugin = new webpack.DefinePlugin({

      API_KEY: JSON.stringify(process.env.API_KEY),
      BASE_URL: JSON.stringify(process.env.BASE_URL),

    });

    config.plugins.push(definePlugin);

    return config
  },
};
