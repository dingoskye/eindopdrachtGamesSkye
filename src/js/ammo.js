import { Actor, Color, Vector, CollisionType, Shape } from 'excalibur';

export class AmmoPack extends Actor {
  constructor(x, y) {
    super({
      pos: new Vector(x, y),
      width: 20,
      height: 20,
      color: Color.Brown,
      collisionType: CollisionType.Passive, 
    });
    this.ammoPickUp = 10;
  }

  onInitialize() {
    this.collider.set(Shape.Box(this.width, this.height));

    this.on('collisionstart', (evt) => {
      // Controleer of het een Soldier is
      const other = evt.other && evt.other.owner;
      if (other && other.constructor && other.constructor.name === 'Soldier') {
        // @ts-ignore
        if (typeof other.pickUpAmmo === 'function') {
          // @ts-ignore
          other.pickUpAmmo(this.ammoPickUp);
        }
        this.kill();
      }
    });
  }
}