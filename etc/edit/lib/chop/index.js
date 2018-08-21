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
  const chopped = await Promise.map(choppable, ({
    x,
    y,
  }) => image.clone().crop(x, y, chopWidth, chopHeight).getBufferAsync(Jimp.MIME_PNG));

  return chopped;
};
