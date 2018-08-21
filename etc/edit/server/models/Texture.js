const _ = require('lodash');

module.exports = {
  name: 'Texture',
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
  type: 'texture',
  name: o.name,
  sprite: o.sprite ? `/textures/${o.id}/sprite` : null,
  choppeds: _.map(o.choppeds, (__, index) => `/textures/${o.id}/sprite/${index}`),
  createdAt: o.createdAt,
});
