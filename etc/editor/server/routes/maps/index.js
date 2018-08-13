const _ = require('lodash');
const db = require('../../models/db');
const { parse } = require('../../models/Map');

module.exports = () => _.map(db.objects('Map'), o => parse(o));
