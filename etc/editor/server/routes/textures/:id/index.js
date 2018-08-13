const _ = require('lodash');
const {
  json,
  send,
} = require('micro');
const form = require('../../../../lib/form');
const db = require('../../../models/db');
const { parse } = require('../../../models/Texture');

module.exports = async (req, res) => {
  const { id } = req.params;

  let data;
  let texture = db.objects('Texture').find(o => o.id === id);

  try {
    data = await json(req);
  } catch (e) { } // eslint-disable-line no-empty

  try {
    data = await form(req);
  } catch (e) { } // eslint-disable-line no-empty

  if (req.method === 'DELETE') {
    db.write(() => {
      if (!_.isNil(texture)) { db.delete(texture); }

      send(res, 202);
    });

    return;
  }

  db.write(() => {
    if (_.isNil(texture)) { texture = db.create('Texture', { id }); }

    if (_.has(data, 'name')) { texture.name = data.name; }
    if (_.has(data, 'sprite')) { texture.sprite = data.sprite.content; }
    if (_.has(data, 'zIndex')) { texture.zIndex = data.zIndex; }

    send(res, 200, parse(texture));
  });
};
