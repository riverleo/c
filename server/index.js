const _ = require('lodash');
const path = require('path');
const { send } = require('micro');
const match = require('fs-router');
const handler = require('serve-handler');

module.exports = async (req, res) => {
  const { url } = req;
  const matched = match(path.join(__dirname, '/routes'))(req);

  let data;
  let statusCode = 200;

  if (matched) {
    data = await matched(req, res);
  } else if (_.startsWith(url, '/static')) {
    await handler(req, res);
    return;
  } else {
    data = { error: 'Not Found' };
    statusCode = 404;
  }

  send(res, statusCode, data);
};
