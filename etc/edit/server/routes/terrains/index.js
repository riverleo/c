const _ = require('lodash');
const db = require('../../models/db');
const { parse } = require('../../models/Terrain');

module.exports = () => _.map(db.objects('Terrain').sorted('createdAt', { ascending: false }), o => parse(o));
