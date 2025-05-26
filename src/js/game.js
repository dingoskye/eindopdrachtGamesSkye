import '../css/style.css';
import { DisplayMode, Engine, Shader, Material, Actor, Color, Keys } from "excalibur";
import { ResourceLoader } from "./resources";
import { Zombie } from "./zombie";
import { Shark } from './biker';
import { UI } from './ui';


export class Game extends Engine {

    ui

    constructor() {
        super({ width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen});

        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        for (let i = 0; i < 100; i++) {
            this.add(new Zombie());
        }

        const shark1 = new Shark(Keys.Left, Keys.Right, Keys.Up, Keys.Down, Color.Blue, 1);
        this.add(shark1);

        const shark2 = new Shark(Keys.A, Keys.D, Keys.W, Keys.S, Color.Yellow, 2);
        this.add(shark2);

        this.ui = new UI(shark1, shark2);
        this.add(this.ui);
    }
}

new Game();