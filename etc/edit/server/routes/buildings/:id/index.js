const _ = require('lodash');
const {
  json,
  send,
} = require('micro');
const form = require('../../../../lib/form');
const db = require('../../../models/db');
const { parse } = require('../../../models/Building');

module.exports = async (req, res) => {
  const { id } = req.params;

  let data;
  let building = db.objects('Building').filtered(`id = "${id}"`).find(o => o.id === id);

  try {
    data = await json(req);
  } catch (e) { } // eslint-disable-line no-empty

  try {
    data = await form(req);
  } catch (e) { } // eslint-disable-line no-empty

  if (req.method === 'DELETE') {
    db.write(() => {
      if (!_.isNil(building)) { db.delete(building); }

      send(res, 202);
    });

    return;
  }

  db.write(() => {
    if (_.isNil(building)) { building = db.create('Building', { id }); }

    if (_.has(data, 'name')) { building.name = data.name; }
    if (_.has(data, 'sprite')) { building.sprite = data.sprite.content; }
    if (_.has(data, 'zIndex')) { building.zIndex = data.zIndex; }

    send(res, 200, parse(building));
  });
};
