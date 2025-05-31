import { Actor, Color, DisplayMode, Engine, Loader, Vector, CollisionType } from "excalibur"
import { Resources } from "./resources"
import { Bullet } from './bullet.js';

export class Zombie extends Actor {

    constructor(soldier) {
        super({
            width: Resources.Zombie.width,
            height: Resources.Zombie.height,
            collisionType: CollisionType.Active
        });
        this.soldier = soldier;
        this.speed = 80; // standaard snelheid voor alle zombies
    }

    onInitialize(engine) {
      this.graphics.use(Resources.Zombie.toSprite());
      this.setSpawnPosition(); // spawn aan willekeurige rand
      this.scale = new Vector(0.25, 0.25);
      this.health = 100;
      this.on('collisionstart', (evt) => {
        if (evt.other && evt.other.owner instanceof Bullet) {
          evt.other.owner.kill();
          this.health = (this.health ?? 100) - (evt.other.owner.damage ?? 50);
          if (this.health <= 0) {
            if (this.soldier) {
              this.soldier.score++;
              if (engine && engine.ui && typeof engine.ui.updateScore === 'function') {
                engine.ui.updateScore();
              }
            }
            this.kill();
          }
        }
        // Soldier raakt zombie
        if (evt.other && evt.other.owner === this.soldier) {
          if (this.soldier && typeof this.soldier.takeDamage === 'function') {
            this.soldier.takeDamage(10);
          }
        }
      });
   }

   onPreUpdate(engine) {
    if (this.soldier) {
      const direction = this.soldier.pos.sub(this.pos).normalize();
      // Gebruik 80 als default speed, FatZombie kan eigen speed property hebben
      const speed = typeof this.speed === 'number' ? this.speed : 100;
      this.vel = direction.scale(speed);
      this.rotation = direction.toAngle();
      // Clamp zombie binnen bounding box (0,0)-(2000,1200)
      this.pos.x = Math.max(0, Math.min(2000, this.pos.x));
      this.pos.y = Math.max(0, Math.min(1200, this.pos.y));
    }
}

     setSpawnPosition() {
        const screenWidth = 1280;
        const screenHeight = 720;
        const edge = Math.floor(Math.random() * 4);

        switch (edge) {
            case 0: this.pos = new Vector(Math.random() * screenWidth, -50); break;
            case 1: this.pos = new Vector(screenWidth + 50, Math.random() * screenHeight); break;
            case 2: this.pos = new Vector(Math.random() * screenWidth, screenHeight + 50); break;
            case 3: this.pos = new Vector(-50, Math.random() * screenHeight); break;
        }
    }
}
