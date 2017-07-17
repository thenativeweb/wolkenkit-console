const path = require('path');

module.exports = {
  type: 'react-app',
  webpack: {
    extra: {
      output: {
        path: path.join(__dirname, 'build', 'web'),
        publicPath: ''
      }
    }
  }
};
