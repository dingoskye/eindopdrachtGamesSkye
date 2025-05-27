// import '../css/style.css';
// import { DisplayMode, Engine, Shader, Material, Actor, Color, Keys } from "excalibur";
// import { ResourceLoader } from "./resources";
// import { Zombie } from "./zombie";
// import { Soldier } from './soldier';
// import { UI } from './ui';
// import { Background } from './background';


// export class Game extends Engine {

//     ui

//     constructor() {
//         super({ width: 1280,
//             height: 720,
//             maxFps: 60,
//             displayMode: DisplayMode.FitScreen});

//         this.start(ResourceLoader).then(() => this.startGame());
//     }

//     startGame() {
//         for (let i = 0; i < 100; i++) {
//             this.add(new Zombie());
//         }

//         this.add(new Background());

//         const shark1 = new Shark(Keys.Left, Keys.Right, Keys.Up, Keys.Down, Color.Blue, 1);
//         this.add(shark1);

//         const shark2 = new Shark(Keys.A, Keys.D, Keys.W, Keys.S, Color.Yellow, 2);
//         this.add(shark2);

//         this.ui = new UI(shark1, shark2);
//         this.add(this.ui);
//     }
// }

// new Game();

import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Soldier } from './soldier.js'
import { Zombie } from './zombie.js'
import { Background } from './background.js'

export class Game extends Engine {
    soldier

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        const background = new Background()
        this.add(background);

        const soldier = new Soldier()
        this.add(soldier)
        
    }

}

new Game()