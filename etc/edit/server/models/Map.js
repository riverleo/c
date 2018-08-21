module.exports = {
  name: 'Map',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    width: {
      type: 'int',
      default: 600,
    },
    height: {
      type: 'int',
      default: 600,
    },
    layout: 'string?',
    createdAt: {
      type: 'date',
      default: new Date(),
    },
  },
};

module.exports.parse = o => ({
  id: o.id,
  type: 'map',
  name: o.name,
  width: o.width,
  height: o.height,
  layout: JSON.parse(o.layout),
  createdAt: o.createdAt,
});
