module.exports = {
  name: 'Texture',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    sprites: 'data?',
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
  createdAt: o.createdAt,
});
