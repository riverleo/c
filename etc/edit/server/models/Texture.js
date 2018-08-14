module.exports = {
  name: 'Texture',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    sprite: 'data?',
    zIndex: 'string?',
    createdAt: {
      type: 'date',
      default: new Date(),
    },
  },
};

module.exports.parse = o => ({
  id: o.id,
  name: o.name,
  sprite: o.sprite ? `/engine/textures/${o.id}/sprite` : null,
  zIndex: JSON.parse(o.zIndex),
});
