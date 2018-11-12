const _ = require('lodash');
const { send } = require('micro');
const db = require('../../../models/db');

module.exports = (req, res) => {
  const { id } = req.params;
  const building = db.objects('Building').find(o => o.id === id);
  const sprite = _.get(building, 'sprite');

  if (_.isNil(sprite)) {
    send(res, 404);

    return;
  }

  res.end(Buffer.from(sprite), 'binary');
};
