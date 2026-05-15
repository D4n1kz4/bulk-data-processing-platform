const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = {
  ...withModuleFederationPlugin({
    name: 'shell',

    remotes: {
      mfeCustomers: 'http://localhost:4201/remoteEntry.js',
    },

    shared: {
      ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
  }),

  output: {
    publicPath: 'auto',
    scriptType: 'text/javascript',
  },
};