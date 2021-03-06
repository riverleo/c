const _ = require('lodash');
const { send } = require('micro');
const db = require('../../../../models/db');

module.exports = async (req, res) => {
  const { id } = req.params;
  const terrain = db.objects('Terrain').find(o => o.id === id);
  const sprite = _.get(terrain, 'sprite');

  if (_.isNil(sprite)) {
    send(res, 404);

    return;
  }

  res.end(Buffer.from(sprite), 'binary');
};
