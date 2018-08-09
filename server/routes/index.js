const manifest = require('../../static/bundles/manifest.json');

module.exports = () => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>c</title>
  </head>
  <body>
    <script src="${manifest['main.js']}"></script>
  </body>
</html>
`;
