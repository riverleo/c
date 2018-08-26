const path = require('path');
const Realm = require('realm');
const Map = require('../Map');
const Terrain = require('../Terrain');
const Building = require('../Building');
const Character = require('../Character');

module.exports = new Realm({
  path: path.join(__dirname, 'engine.realm'),
  schema: [Map, Terrain, Building, Character],
  schemaVersion: 1,
});
