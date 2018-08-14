const manifest = require('../../../dist/manifest.json');

module.exports = () => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel="stylesheet" href="/dist/${manifest['edit.css']}"><title>EDITOR</title></head><body></body><script src="/dist/${manifest['edit.js']}"></script></html>`;
