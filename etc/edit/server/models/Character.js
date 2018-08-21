module.exports = {
  name: 'Character',
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
  type: 'character',
  name: o.name,
  width: o.width,
  height: o.height,
  sprite: o.sprite ? `/characters/${o.id}/sprite` : null,
});
