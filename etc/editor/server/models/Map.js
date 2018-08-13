module.exports = {
  name: 'Map',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string?',
    width: {
      type: 'int',
      default: 100,
    },
    height: {
      type: 'int',
      default: 100,
    },
    layout: 'string?',
  },
};

module.exports.parse = o => ({
  id: o.id,
  name: o.name,
  layout: JSON.parse(o.layout),
});
