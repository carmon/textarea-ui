const path = require('path');
const webpack = require('webpack');


module.exports = env => {
  const mode = env && env.NODE_ENV || 'development';
  const distFolder = mode === 'production' ? 'public/dist' : 'dist';

  return ({
    entry: './index.js',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      hot: true,
    },
    devtool: 'source-map',
    mode,
    module: {
      rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
          },
          {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ],
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
          }
      ]
    },
    output: {
      path: path.resolve(__dirname, distFolder),
      publicPath: distFolder,
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      symlinks: false,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}