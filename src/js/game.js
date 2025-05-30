import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Soldier } from './soldier.js'
import { Zombie } from './zombie.js'
import { Background } from './background.js'
import { UI } from './ui';

export class Game extends Engine {
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

        this.soldier = new Soldier()
        this.add(this.soldier)

        this.ui = new UI(this.soldier, this.soldier); // dummy tweede speler
        this.add(this.ui);

        this.spawnZombie(); // eerste zombie direct
        this.zombieInterval = setInterval(() => {
            this.spawnZombie();
        }, 2000); // elke 2 seconden
    }

    spawnZombie() {
        const zombie = new Zombie(this.soldier);
        this.add(zombie);
    }

    gameOver() {
        if (this.zombieInterval) {
            clearInterval(this.zombieInterval);
        }
        if (this.soldier) {
            this.soldier.kill();
        }
        if (this.ui) {
            this.ui.showGameOver();
        }
    }

}

new Game()

