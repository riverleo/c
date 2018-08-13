const _ = require('lodash');
const db = require('../../models/db');
const { parse } = require('../../models/Character');

module.exports = () => _.map(db.objects('Character'), o => parse(o));
