const _ = require('lodash');
const {
  json,
  send,
} = require('micro');
const form = require('../../../../lib/form');
const db = require('../../../models/db');
const { parse } = require('../../../models/Character');

module.exports = async (req, res) => {
  const { id } = req.params;

  let data;
  let character = db.objects('Character').find(o => o.id === id);

  try {
    data = await json(req);
  } catch (e) { } // eslint-disable-line no-empty

  try {
    data = await form(req);
  } catch (e) { } // eslint-disable-line no-empty

  if (req.method === 'DELETE') {
    db.write(() => {
      if (!_.isNil(character)) { db.delete(character); }

      send(res, 202);
    });

    return;
  }

  db.write(() => {
    if (_.isNil(character)) { character = db.create('Character', { id }); }

    if (_.has(data, 'name')) { character.name = data.name; }
    if (_.has(data, 'sprite')) { character.sprite = data.sprite.content; }

    send(res, 200, parse(character));
  });
};
