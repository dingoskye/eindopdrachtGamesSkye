import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';

export class Background extends Actor {
    onInitialize(engine) {
        const sprite = Resources.Background.toSprite();
        // Schaal naar bounding box ipv engine.drawWidth/Height
        const scaleX = 2000 / sprite.width;
        const scaleY = 1200 / sprite.height;
        this.graphics.use(sprite);
        this.pos = new Vector(2000/2, 1200/2); 
        this.scale = new Vector(scaleX, scaleY);
    }
}