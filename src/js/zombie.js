import { Actor, Color, DisplayMode, Engine, Loader, Vector } from "excalibur"
import { Resources } from "./resources"

export class Zombie extends Actor {

    constructor() {
        super({ width: Resources.Zombie.width, height: Resources.Zombie.height })


        this.sprite = Resources.Zombie.toSprite()
        this.graphics.use(this.sprite)

        this.pos = new Vector(Math.random() * 800 + 400, Math.random() * 600)
        this.vel = new Vector(Math.random() * -150 - 50, 0)

        const sc = Math.random() * 2
        this.scale = new Vector(sc, sc)
    }


}
