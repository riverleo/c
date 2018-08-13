const _ = require('lodash');
const realm = require('../../../models/engine/realm');
const { parse } = require('../../../models/engine/Building');

module.exports = () => _.map(realm.objects('Building'), b => parse(b));
