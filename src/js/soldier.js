import { Actor, Keys, Vector, CollisionType, Shape } from "excalibur";
import { Resources } from './resources.js';
import { Bullet } from './bullet.js';

export class Soldier extends Actor {
   
    speed = 2;
    direction = new Vector(1, 0); // standaard naar rechts
    score = 0;

   constructor() {
      super({
         width: Resources.Soldier.width / 2,
         height: Resources.Soldier.height / 2,
         collisionType: CollisionType.Active
      });
   }

   onInitialize(engine) {
      this.graphics.use(Resources.Soldier.toSprite());
      this.pos = new Vector(250, 500);
      this.scale = new Vector(0.18, 0.18);
   }

   onPreUpdate(engine) {
      let xspeed = 0;
      let yspeed = 0;
      let kb = engine.input.keyboard

      if (kb.isHeld(Keys.W) || kb.isHeld(Keys.Up)) {
         yspeed = -this.speed;
         xspeed = 0;
         this.direction = new Vector(0, -1);
      }
      if (kb.isHeld(Keys.S) || kb.isHeld(Keys.Down)) {
         yspeed = this.speed;
         xspeed = 0;
         this.direction = new Vector(0, 1);
      }
      if (kb.isHeld(Keys.A) || kb.isHeld(Keys.Left)) {
         xspeed = -this.speed;
         yspeed = 0;
         this.direction = new Vector(-1, 0);
      }
      if (kb.isHeld(Keys.D) || kb.isHeld(Keys.Right)) {
         xspeed = this.speed;
         yspeed = 0;
         this.direction = new Vector(1, 0);
      }
      
      // Bullet schieten
      if (kb.wasPressed(Keys.Space)) {
         // Richting van de soldier
         const bulletDir = this.direction.normalize();
         // Startpositie: iets voor de soldier
         const bulletPos = this.pos.add(bulletDir.scale(40));
         // Snelheid bullet
         const bulletVel = bulletDir.scale(600);
         // Maak bullet aan
         const bullet = new Bullet(bulletPos, bulletVel);
         engine.add(bullet);
      }

      this.vel = new Vector(xspeed * 200, yspeed * 200);

      // Rotatie op basis van de richting
      this.rotation = Math.atan2(this.direction.y, this.direction.x) + Math.PI / 2;
   }
}
