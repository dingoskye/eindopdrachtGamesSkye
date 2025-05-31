import { Resources } from "./resources";
import { Zombie } from "./zombie";
import { Vector } from "excalibur";

export class FatZombie extends Zombie {
  constructor(soldier) {
    super(soldier);
    this.speed = 40; // langzamer dan gewone zombie
  }

  onInitialize(engine){
    super.onInitialize(engine); // Zorg dat bullet-collision van Zombie werkt
    this.graphics.use(Resources.FatZombie.toSprite());
    this.scale = new Vector(0.30, 0.30); // Iets groter dan gewone zombie
  }

}