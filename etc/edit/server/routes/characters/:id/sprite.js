const _ = require('lodash');
const { send } = require('micro');
const db = require('../../../models/db');

module.exports = (req, res) => {
  const { id } = req.params;
  const character = db.objects('Character').find(o => o.id === id);
  const sprite = _.get(character, 'sprite');

  if (_.isNil(sprite)) {
    send(res, 404);

    return;
  }

  res.end(Buffer.from(sprite), 'binary');
};
