module.exports = {
  name: 'Character',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    width: 'int?',
    height: 'int?',
    sprite: 'data?',
    createdAt: {
      type: 'date',
      default: new Date(),
    },
  },
};

module.exports.parse = o => ({
  id: o.id,
  type: 'character',
  name: o.name,
  width: o.width,
  height: o.height,
  sprite: o.sprite ? `/engine/characters/${o.id}/sprite` : null,
});
