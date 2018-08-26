const _ = require('lodash');

module.exports = {
  name: 'Terrain',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    sprite: 'data?',
    choppeds: 'data[]',
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
  sprite: o.sprite ? `/terrains/${o.id}/sprite` : null,
  choppeds: _.map(o.choppeds, (__, index) => `/terrains/${o.id}/sprite/${index}`),
  createdAt: o.createdAt,
});
