const _ = require('lodash');

/**
 * 랜덤 아이디를 생성합니다.
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
const createId = (length = 11) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  _.times(length, () => {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  });

  return text;
};

module.exports = createId;
