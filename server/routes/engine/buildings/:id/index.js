const _ = require('lodash');
const { send } = require('micro');
const realm = require('../../../../models/engine/realm');
const { parse } = require('../../../../models/engine/Building');

module.exports = (req, res) => {
  const { id } = req.params;
  let building = realm.objects('Building').find(b => b.id === id);

  if (req.method === 'DELETE') {
    realm.write(() => {
      if (!_.isNil(building)) { realm.delete(building); }

      send(res, 202);
    });

    return;
  }

  realm.write(() => {
    if (_.isNil(building)) { building = realm.create('Building', { id }); }

    send(res, 200, parse(building));
  });
};
