const _ = require('lodash');
const db = require('../../models/db');
const { parse } = require('../../models/Building');

module.exports = () => _.map(db.objects('Building'), o => parse(o));
