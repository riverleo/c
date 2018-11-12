module.exports = {
  name: 'Map',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    chop: 'string?',
    width: {
      type: 'int',
      default: 16,
    },
    height: {
      type: 'int',
      default: 16,
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
  chop: o.chop,
  width: o.width,
  height: o.height,
  layout: JSON.parse(o.layout),
  createdAt: o.createdAt,
});
