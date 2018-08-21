module.exports = {
  name: 'Building',
  primaryKey: 'id',
  properties: {
    id: 'string',
    map: 'Map?',
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
  type: 'building',
  name: o.name,
  width: o.width,
  height: o.height,
  sprite: o.sprite ? `/buildings/${o.id}/sprite` : null,
  zIndex: JSON.parse(o.zIndex),
  createdAt: o.createdAt,
});
