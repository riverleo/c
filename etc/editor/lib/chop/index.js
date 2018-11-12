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
  const choppable = getChoppable(width, height, chopWidth, chopHeight);
  const chops = await Promise.map(choppable, ({
    x,
    y,
  }) => {
    const cropped = image.clone().crop(x, y, chopWidth, chopHeight);

    return cropped.getBufferAsync(Jimp.MIME_PNG);
  });

  return _.compact(chops);
};
