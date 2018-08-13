/* global Buffer */

const _ = require('lodash');
const newId = require('../../lib/newId');

const getValueIgnoreCase = (obj, lookedKey) => {
  const key = _.find(_.keys(obj), k => _.toLower(k) === _.toLower(lookedKey));

  return obj[key];
};

module.exports = (req) => {
  const boundary = _.split(getValueIgnoreCase(req.headers, 'Content-Type'), 'boundary=')[1];
  const body = Buffer.from(req.body, 'base64').toString('binary');

  if (_.isNil(boundary)) {
    throw new Error('폼 데이터가 유효하지 않습니다.');
  }

  const rawFormData = _.filter(_.split(body, boundary), r => _.includes(r, 'Content-Disposition: form-data'));

  const result = {};

  _.forEach(rawFormData, (raw) => {
    let name;
    let type;
    let filename;
    let contentType;

    const nameExecuted = /name="([^"]*)"/.exec(raw);
    const filenameExecuted = /filename="([^"]*)"/.exec(raw);
    const contentTypeExecuted = /Content-Type: ([a-zA-Z0-9-_/]*)/.exec(raw);
    let content = _.split(_.split(raw, /\r\n\r\n/)[1], /\r\n--/)[0];

    if (!_.isNil(nameExecuted) && !_.isEmpty(nameExecuted[1])) {
      name = Buffer.from(nameExecuted[1], 'binary').toString('utf-8');
    } else {
      name = newId();
    }

    if (!_.isNil(filenameExecuted)) {
      filename = Buffer.from(filenameExecuted[1], 'binary').toString('utf-8');
    }

    if (!_.isNil(contentTypeExecuted)) {
      type = 'file';
      content = Buffer.from(content, 'binary');
    } else {
      type = 'text';
    }

    if (!_.isNil(contentTypeExecuted)) {
      contentType = contentTypeExecuted[1]; // eslint-disable-line prefer-destructuring
    }

    result[name] = {
      type,
      filename,
      contentType,
      content,
    };
  });

  return result;
};
