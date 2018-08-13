const fs = require('fs');
const path = require('path');

module.exports = () => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>EDITOR</title></head><body></body><script>${fs.readFileSync(path.join(__dirname, '../../.out/main.js')).toString('utf-8')}</script></html>`;
