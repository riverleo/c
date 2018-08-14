const _ = require('lodash');
const { send } = require('micro');
const db = require('../../../models/db');

module.exports = (req, res) => {
  const { id } = req.params;
  const texture = db.objects('Texture').find(o => o.id === id);
  const sprite = _.get(texture, 'sprite');

  if (_.isNil(sprite)) {
    send(res, 404);

    return;
  }

  res.end(Buffer.from(sprite), 'binary');
};
