module.exports = {
  name: 'Building',
  primaryKey: 'id',
  properties: {
    id: 'string',
    sprite: 'data?',
  },
};

module.exports.parse = b => ({
  id: b.id,
  sprite: `/engine/buildings/${b.id}/sprite`,
});
