const _ = require('lodash');
const Jimp = require('jimp');
const Promise = require('bluebird');
const getChoppable = require('./getChoppable');

module.exports = async (buffer, chopWidth, chopHeight) => {
  const image = await Jimp.read(buffer);
  const {
    width,
    height,
  } = image.bitmap;
  const hashes = [];
  const alphas = [];
  const croppeds = [];
  const choppable = getChoppable(width, height, chopWidth, chopHeight);
  const chops = await Promise.map(choppable, ({
    x,
    y,
  }) => {
    const cropped = image.clone().crop(x, y, chopWidth, chopHeight);
    const hash = cropped.hash();

    let alpha;

    cropped.scan(0, 0, cropped.bitmap.width, cropped.bitmap.height, (scanX, scanY, scanIndex) => {
      if (!_.isNil(alpha) && alpha !== 0) { return; }

      alpha = cropped.bitmap.data[scanIndex + 3];
    });

    let same;

    _.forEach(croppeds, (c) => {
      const diff = Jimp.diff(c, cropped);

      if (diff.percent < 0.15) {
        same = true;
      }
    });

    if (same) { return undefined; }
    if (alpha <= 2) { return undefined; }
    if (_.includes(hashes, hash)) { return undefined; }

    hashes.push(hash);
    alphas.push(alpha);
    croppeds.push(cropped);

    return cropped.getBufferAsync(Jimp.MIME_PNG);
  });

  return _.compact(chops);
};
