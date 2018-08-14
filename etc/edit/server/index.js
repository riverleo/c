const _ = require('lodash');
const path = require('path');
const { send } = require('micro');
const match = require('fs-router');
const handler = require('serve-handler');

module.exports = async (req, res) => { // eslint-disable-line consistent-return
  const matched = match(path.join(__dirname, '/routes'))(req);

  if (_.startsWith(req.url, '/dist')) {
    return await handler(req, res, { public: 'etc' }); // eslint-disable-line no-return-await
  }

  if (matched) {
    return await matched(req, res); // eslint-disable-line no-return-await
  }

  send(res, 404);
};
