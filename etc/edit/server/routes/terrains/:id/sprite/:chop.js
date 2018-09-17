const _ = require('lodash');
const realm = require('realm');
const { send } = require('micro');
const db = require('../../../../models/db');

module.exports = async (req, res) => {
  const {
    id,
    chop,
  } = req.params;
  const terrain = db.objects('Terrain').find(o => o.id === id);
  const sprite = _.get(terrain, ['chops', chop]);

  if (req.method === 'DELETE') {
    db.write(() => {
      if (_.isNil(terrain)) {
        send(res, 404);

        return
      }

      const indexes = _.map(_.split(chop, ','), c => _.toInteger(c));
      const chops = _.filter(terrain.chops, (c, i) => !_.includes(indexes, i));

      terrain.chops = chops;

      send(res, 202);

      return;
    });
  }

  if (_.isNil(sprite)) {
    send(res, 404);

    return;
  }

  res.end(Buffer.from(sprite), 'binary');
};
