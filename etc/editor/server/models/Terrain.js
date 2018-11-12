const _ = require('lodash');

module.exports = {
  name: 'Terrain',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    chops: 'data[]',
    sprite: 'data?',
    createdAt: {
      type: 'date',
      default: new Date(),
    },
  },
};

module.exports.parse = o => ({
  id: o.id,
  type: 'terrain',
  name: o.name,
  chops: _.map(o.chops, (__, index) => `/terrains/${o.id}/sprite/${index}`),
  sprite: o.sprite ? `/terrains/${o.id}/sprite` : null,
  createdAt: o.createdAt,
});
