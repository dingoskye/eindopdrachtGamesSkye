import { Actor, Keys, Vector, Color } from "excalibur";
import { Resources } from "./resources";
import { Zombie } from "./zombie";

export class Shark extends Actor {

    speed = 300;
    score = 0;
    leftKey;
    rightKey;
    upKey;
    downKey;

    constructor(leftKey, rightKey, upKey, downKey, color, player) {
        super({ width: Resources.Shark.width, height: Resources.Shark.height });

        this.sprite = Resources.Shark.toSprite()
        this.graphics.use(this.sprite)
        this.sprite.tint = color;

        this.pos = new Vector(400, 400);
        this.vel = new Vector(0, 0);
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.upKey = upKey;
        this.downKey = downKey;
        this.player = player; // add player property
    }

    onInitialize() {
        this.on("collisionstart", (event) => this.handleCollision(event));
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;

        if (engine.input.keyboard.isHeld(this.leftKey)) {
            xspeed = -this.speed;
        }

        if (engine.input.keyboard.isHeld(this.rightKey)) {
            xspeed = this.speed;
        }

        if (engine.input.keyboard.isHeld(this.upKey)) {
            yspeed = -this.speed;
        }

        if (engine.input.keyboard.isHeld(this.downKey)) {
            yspeed = this.speed;
        }

        this.vel = new Vector(xspeed, yspeed);
    }

    handleCollision(event) {
        if (event.other.owner instanceof Zombie) {
            event.other.owner.hit();
            this.score++;
            // @ts-ignore
            this.scene?.engine.ui.updateScore();
        }
    }
}