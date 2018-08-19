module.exports = {
  name: 'Map',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    width: 'int?',
    height: 'int?',
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
