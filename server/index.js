const handler = require('serve-handler');

module.exports = async (req, res) => await handler(req, res, {
  rewrites: [
    {
      source: '/',
      destination: '/src/pages/index.html',
    },
    {
      source: '/:page',
      destination: '/src/pages/:page.html',
    },
  ],
  trailingSlash: true,
});
