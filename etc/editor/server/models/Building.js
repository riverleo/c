module.exports = {
  name: 'Building',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    map: 'Map?',
    sprite: 'data?',
    zIndex: 'string?',
  },
};

module.exports.parse = o => ({
  id: o.id,
  name: o.name,
  sprite: o.sprite ? `/engine/buildings/${o.id}/sprite` : null,
  zIndex: JSON.parse(o.zIndex),
});
