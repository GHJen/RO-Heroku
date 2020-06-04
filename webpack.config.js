module.exports = {
  entry: './client/App.js', // assumes your entry point is the index.js in the root of your project folder
  mode: 'development',
  output: {
    path: __dirname, // assumes your bundle.js will also be in the root of your project folder
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
}
