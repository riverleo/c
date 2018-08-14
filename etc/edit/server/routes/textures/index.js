const _ = require('lodash');
const db = require('../../models/db');
const { parse } = require('../../models/Texture');

module.exports = () => _.map(db.objects('Texture').sorted('createdAt', { ascending: false }), o => parse(o));
