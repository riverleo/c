const path = require('path');
const Realm = require('realm');
const Map = require('./Map');
const Texture = require('./Texture');
const Building = require('./Building');
const Character = require('./Character');

module.exports = new Realm({
  path: path.join(__dirname, 'engine.realm'),
  schema: [Map, Texture, Building, Character],
  schemaVersion: 1,
});
