const { send, buffer } = require('micro');
const parseFormData = require('../../../../lib/parseFormData');

module.exports = async (req, res) => {
  const formData = parseFormData({
    body: await buffer(req),
    headers: req.headers,
  });

  res.end(formData['test'].content, 'binary');
}
