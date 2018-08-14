const _ = require('lodash');
const db = require('../../models/db');
const { parse } = require('../../models/Building');

module.exports = () => _.map(db.objects('Building').sorted('createdAt', { ascending: false }), o => parse(o));
