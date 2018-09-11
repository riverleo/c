const _ = require('lodash');
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
      if (!_.isNil(terrain)) {
        console.log({ chops: terrain.chops, chop });
        console.log({ removed: _.remove(terrain.chops, (__, index) => {
          console.log(__, index);
          return index === _.toInteger(chop);
        }) });
      }

      send(res, 202);
    });

    return;
  }

  if (_.isNil(sprite)) {
    send(res, 404);

    return;
  }

  res.end(Buffer.from(sprite), 'binary');
};
