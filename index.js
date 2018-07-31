/* global document */

import {
  Text,
  loader,
  Sprite,
  Application,
} from 'pixi.js';

const app = new Application({
  resolution: 1,
  transparent: true,
});

document.body.appendChild(app.view);

loader.add('bunny', '/static/bunny.png').load((__, resources) => {
  // This creates a texture from a 'bunny.png' image
  const bunny = new Sprite(resources.bunny.texture);

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);

  const handleMove = (e) => {
    const weight = 0.3;
    const bounds = bunny.getBounds();
    const maxX = Math.round((bounds.x + bounds.width) / 10) * 10;
    const maxY = Math.round((bounds.y + bounds.height) / 10) * 10;

    switch(e.keyCode) {
      case 65: // A
      case 37: // LEFT
        if (Math.floor(bounds.x / 10) <= 0) {
          return;
        }

        bunny.anchor.x += weight;
        break;
      case 87: // W
      case 38: // UP
        if (Math.floor(bounds.y / 10) <= 0) {
          return;
        }

        bunny.anchor.y += weight;
        break;
      case 68: // D
      case 39: // RIGHT
        if (maxX >= app.renderer.height) {
          return;
        }

        bunny.anchor.x -= weight;
        break;
      case 83: // S
      case 40: { // DOWN
        if (maxY >= app.renderer.height) {
          return;
        }

        bunny.anchor.y -= weight;
        break;
      }
      default:
        break;
    }
  };

  document.addEventListener('keydown', handleMove);
});
