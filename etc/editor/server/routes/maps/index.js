const _ = require('lodash');
const db = require('../../models/db');
const { parse } = require('../../models/Map');

module.exports = () => _.map(db.objects('Map').sorted('createdAt', { ascending: false }), o => parse(o));
