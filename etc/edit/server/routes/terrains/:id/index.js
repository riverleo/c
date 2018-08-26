const _ = require('lodash');
const {
  json,
  send,
} = require('micro');
const form = require('../../../../lib/form');
const chop = require('../../../../lib/chop');
const db = require('../../../models/db');
const { parse } = require('../../../models/Terrain');

module.exports = async (req, res) => {
  const { id } = req.params;

  let data;
  let terrain = db.objects('Terrain').filtered(`id = "${id}"`).find(o => o.id === id);

  try {
    data = await json(req);
  } catch (e) { } // eslint-disable-line no-empty

  try {
    data = await form(req);
  } catch (e) { } // eslint-disable-line no-empty

  if (req.method === 'DELETE') {
    db.write(() => {
      if (!_.isNil(terrain)) { db.delete(terrain); }

      send(res, 202);
    });

    return;
  }

  let choppeds;

  if (_.has(data, 'sprite')) {
    choppeds = await chop(data.sprite.content, 120, 120);
  }

  db.write(() => {
    if (_.isNil(terrain)) { terrain = db.create('Terrain', { id }); }

    if (_.has(data, 'name')) { terrain.name = data.name; }
    if (_.has(data, 'sprite')) {
      terrain.sprite = data.sprite.content;
      terrain.choppeds = choppeds;
    }
    if (_.has(data, 'zIndex')) { terrain.zIndex = data.zIndex; }

    send(res, 200, parse(terrain));
  });
};
