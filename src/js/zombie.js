import { Actor, Color, DisplayMode, Engine, Loader, Vector } from "excalibur"
import { Resources } from "./resources"
import { Bullet } from './bullet.js';

export class Zombie extends Actor {

    constructor(soldier) {
        super({ width: Resources.Zombie.width, height: Resources.Zombie.height})
        this.soldier = soldier;
    }

    onInitialize(engine) {
      this.graphics.use(Resources.Zombie.toSprite());
      this.setSpawnPosition(); // spawn aan willekeurige rand
      this.scale = new Vector(0.25, 0.25);
      this.on('collisionstart', (evt) => {
        if (evt.other && evt.other.owner === this.soldier) {
          // Trigger game over op de engine
          if (engine && typeof engine.gameOver === 'function') {
            engine.gameOver();
          } else {
            // fallback: soldier killen
            this.soldier.kill();
          }
        }
      });
   }

   onPreUpdate(engine) {
    if (this.soldier) {
      const direction = this.soldier.pos.sub(this.pos).normalize();
      this.vel = direction.scale(80); // 80 is de snelheid
      this.rotation = direction.toAngle();
    }
}

     setSpawnPosition() {
    const screenWidth = 1280;
    const screenHeight = 720;
    const edge = Math.floor(Math.random() * 4);

    switch (edge) {
      case 0: this.pos = new Vector(Math.random() * screenWidth, -50);
        break;
      case 1: this.pos = new Vector(screenWidth + 50, Math.random() * screenHeight);
        break;
      case 2: this.pos = new Vector(Math.random() * screenWidth, screenHeight + 50);
        break;
      case 3: this.pos = new Vector(-50, Math.random() * screenHeight);
        break;
    }
  }
}
