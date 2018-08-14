module.exports = {
  name: 'Character',
  primaryKey: 'id',
  properties: {
    id: 'string',
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
  name: o.name,
  sprite: o.sprite ? `/engine/characters/${o.id}/sprite` : null,
});
