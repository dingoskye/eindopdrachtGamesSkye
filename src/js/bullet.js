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

    const { drawWidth, drawHeight } = engine;
    if (
      this.pos.x < 0 || this.pos.x > drawWidth ||
      this.pos.y < 0 || this.pos.y > drawHeight
    ) {
      this.kill();
    }
  }
}

