const _ = require('lodash');
const {
  json,
  send,
} = require('micro');
const form = require('../../../lib/form');
const db = require('../../models/db');
const { parse } = require('../../models/Map');

module.exports = async (req, res) => {
  const { id } = req.params;

  let data;
  let map = db.objects('Map').filtered(`id = "${id}"`).find(o => o.id === id);

  try {
    data = await json(req);
  } catch (e) { } // eslint-disable-line no-empty

  try {
    data = await form(req);
  } catch (e) { } // eslint-disable-line no-empty

  if (req.method === 'DELETE') {
    db.write(() => {
      if (!_.isNil(map)) { db.delete(map); }

      send(res, 202);
    });

    return;
  }

  db.write(() => {
    if (_.isNil(map)) { map = db.create('Map', { id }); }

    if (_.has(data, 'name')) { map.name = data.name; }
    if (_.has(data, 'width')) { map.width = _.toInteger(data.width); }
    if (_.has(data, 'height')) { map.height = _.toInteger(data.height); }
    if (_.has(data, 'layout')) { map.layout = data.layout; }

    send(res, 200, parse(map));
  });
};
