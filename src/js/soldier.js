import { Actor, Keys, Vector, CollisionType, Shape, Color } from "excalibur";
import { Resources } from './resources.js';
import { Bullet } from './bullet.js';

export class Soldier extends Actor {
   
    speed = 2;
    direction = new Vector(1, 0); // standaard naar rechts
    score = 0;
    ammo = 125;
    #healthBarBg;
    #healthBarFg;
    health = 100;

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
      if (kb.wasPressed(Keys.Space) && this.ammo > 0) {
         // Richting van de soldier
         const bulletDir = this.direction.normalize();
         // Startpositie: iets voor de soldier
         const bulletPos = this.pos.add(bulletDir.scale(40));
         // Snelheid bullet
         const bulletVel = bulletDir.scale(600);
         // Maak bullet aan
         const bullet = new Bullet(bulletPos, bulletVel);
         engine.add(bullet);
         this.ammo--;
         if (engine.ui && typeof engine.ui.updateAmmo === 'function') {
            engine.ui.updateAmmo();
         }
      }

      this.vel = new Vector(xspeed * 200, yspeed * 200);

      // Clamp soldier binnen bounding box (0,0)-(2000,1200)
      this.pos.x = Math.max(0, Math.min(2000, this.pos.x));
      this.pos.y = Math.max(0, Math.min(1200, this.pos.y));

      // Rotatie op basis van de richting
      this.rotation = Math.atan2(this.direction.y, this.direction.x) + Math.PI / 2;

      // Update healthbar breedte
      if (this.#healthBarFg) {
         this.#healthBarFg.width = Math.max(0, 50 * (this.health / 100));
      }
      // Update health label in UI
      if (engine && engine.currentScene && engine.currentScene.actors) {
         const ui = engine.currentScene.actors.find(a => a.constructor && a.constructor.name === 'UI');
         if (ui && typeof ui['updateHealth'] === 'function') {
            ui['updateHealth']();
         }
      }
   }

   pickUpAmmo(amount) {
      this.ammo += amount;
      // @ts-ignore
      if (this.scene && this.scene.engine && this.scene.engine.ui && typeof this.scene.engine.ui.updateAmmo === 'function') {
         // @ts-ignore
         this.scene.engine.ui.updateAmmo();
      }
   }

   takeDamage(amount) {
      this.health = Math.max(0, this.health - amount);
      // Update health label in UI direct na schade
      if (this.scene && this.scene.engine && this.scene.engine.currentScene && this.scene.engine.currentScene.actors) {
         const ui = this.scene.engine.currentScene.actors.find(a => a.constructor && a.constructor.name === 'UI');
         if (ui && typeof ui['updateHealth'] === 'function') {
            ui['updateHealth']();
         }
         if (this.health === 0 && ui && typeof ui['showGameOver'] === 'function') {
            this.kill();
            ui['showGameOver']();
         }
      } else if (this.health === 0) {
         this.kill();
      }
   }
}
