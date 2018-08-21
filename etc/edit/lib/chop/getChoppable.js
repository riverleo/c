const _ = require('lodash');

module.exports = (width, height, chopWidth, chopHeight) => {
  const choppable = [];
  const balance = (width % chopWidth) + (height % chopHeight);

  if (balance !== 0) {
    throw new Error(`'${width}x${height}' 규격을 '${chopWidth}x${chopHeight}'로 나눌 수 없습니다.`);
  }

  const choppableWidthCount = width / chopWidth;
  const choppableHeightCount = height / chopHeight;

  _.times(choppableHeightCount, yIndex => (
    _.times(choppableWidthCount, xIndex => (
      choppable.push({
        x: xIndex * chopWidth,
        y: yIndex * chopHeight,
        width: chopWidth,
        height: chopHeight,
      })))
  ));

  return choppable;
};
