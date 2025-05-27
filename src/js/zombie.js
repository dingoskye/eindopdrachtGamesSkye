import { Actor, Color, DisplayMode, Engine, Loader, Vector } from "excalibur"
import { Resources } from "./resources"

export class Zombie extends Actor {

    constructor() {
        super({ width: Resources.Fish.width, height: Resources.Fish.height })


        this.sprite = Resources.Fish.toSprite()
        this.graphics.use(this.sprite)

        this.pos = new Vector(Math.random() * 800 + 400, Math.random() * 600)
        this.vel = new Vector(Math.random() * -150 - 50, 0)

        const sc = Math.random() * 2
        this.scale = new Vector(sc, sc)

        this.on("exitviewport", (e)=>this.resetPosition(e))
    }


    resetPosition(e) {
        // @ts-ignore
        const rightside = this.scene.engine.drawWidth // this.scene.engine is available after the actor was added to a scene
        this.pos = new Vector(Math.random() * 400 + rightside, Math.random() * 600)
        this.vel = new Vector(Math.random() * -150 - 50, 0)
    }
