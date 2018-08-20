module.exports = {
  name: 'Building',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    map: 'Map?',
    width: 'int?',
    height: 'int?',
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
  type: 'building',
  name: o.name,
  width: o.width,
  height: o.height,
  sprite: o.sprite ? `/buildings/${o.id}/sprite` : null,
  zIndex: JSON.parse(o.zIndex),
  createdAt: o.createdAt,
});
