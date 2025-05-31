import { Actor, Color, CollisionType, Shape } from 'excalibur';


export class Bullet extends Actor {
  damage = 50;

  constructor(pos, velocity) {
    super({
      pos,
      radius: 5,
      color: Color.Orange,
    });

    this.vel = velocity;
  }

  onInitialize() {
    this.collider.set(Shape.Box(this.width, this.height));
  }

  update(engine, delta) {
    super.update(engine, delta);

    // Gebruik de volledige bounding box van het speelveld, niet alleen de viewport
    if (
      this.pos.x < 0 || this.pos.x > 2000 ||
      this.pos.y < 0 || this.pos.y > 1200
    ) {
      this.kill();
    }
  }
}

