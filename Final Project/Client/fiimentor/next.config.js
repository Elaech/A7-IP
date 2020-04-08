const webpack = require('webpack');
const withFonts = require('nextjs-fonts');
const withCss = require("@zeit/next-css");
const withImages = require('next-images');

module.exports = withImages(withFonts(withCss({

  webpack: (config) => {
    const definePlugin = new webpack.DefinePlugin({

      API_KEY: JSON.stringify(process.env.API_KEY),
      BASE_URL: JSON.stringify(process.env.BASE_URL),

    });

    config.plugins.push(definePlugin);

    return config
  },
})));
