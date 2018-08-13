const path = require('path');
const { send } = require('micro');
const match = require('fs-router');

module.exports = async (req, res) => { // eslint-disable-line consistent-return
  const matched = match(path.join(__dirname, '/routes'))(req);

  if (matched) {
    return await matched(req, res); // eslint-disable-line no-return-await
  }

  send(res, 404);
};
