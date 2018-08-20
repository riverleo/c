const _ = require('lodash');
const Jimp = require('jimp');
const { send } = require('micro');
const db = require('../../../models/db');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { c, r } = req.query; // eslint-disable-line object-curly-newline
  const texture = db.objects('Texture').find(o => o.id === id);
  const sprite = _.get(texture, 'sprite');

  if (_.isNil(sprite)) {
    send(res, 404);

    return;
  }

  let image = await Jimp.read(sprite);

  if (c) {
    const crop = _.map(_.split(_.replace(c, /\s/g, ''), ','), o => _.toInteger(o));

    image = image.crop(...crop);
  }

  if (r) {
    const resize = _.toInteger(r);

    image = image.resize(resize, resize);
  }

  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

  res.end(Buffer.from(buffer), 'binary');
};
