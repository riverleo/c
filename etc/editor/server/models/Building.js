module.exports = {
  name: 'Building',
  primaryKey: 'id',
  properties: {
    id: 'string',
    map: 'Map?',
    name: 'string?',
    sprite: 'data?',
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
  sprite: o.sprite ? `/buildings/${o.id}/sprite` : null,
  createdAt: o.createdAt,
});
