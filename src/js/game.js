import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, BoundingBox } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Soldier } from './soldier.js'
import { Zombie } from './zombie.js';
import { FatZombie } from './fatzombie.js';
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

        // Achtergrond zo groot als de bounding box
        const background = new Background();
        
        this.add(background);

        this.soldier = new Soldier();
        this.add(this.soldier);

        this.ui = new UI(this.soldier);
        this.add(this.ui);

        // Camera volgt soldier
        this.currentScene.camera.strategy.lockToActor(this.soldier);
        this.currentScene.camera.strategy.limitCameraBounds(
            new BoundingBox(0, 0, 2000, 1200)
        );

        this.spawnZombie(); // eerste zombie direct
        this.zombieInterval = setInterval(() => {
            this.spawnZombie();
        }, 1500); // elke 1,5 seconden

        // Ammo spawn interval
        this.ammoInterval = setInterval(() => {
            this.spawnAmmo();
        }, 10000); // elke 10 seconden
    }

    spawnZombie() {
        // 30% kans op een fatzombie
        if (Math.random() < 0.3) {
            const fatzombie = new FatZombie(this.soldier);
            this.add(fatzombie);
        } else {
            const zombie = new Zombie(this.soldier);
            this.add(zombie);
        }
    }

    async spawnAmmo() {
        // Spawn ammo op een random plek binnen de bounding box
        const x = 50 + Math.random() * (2000 - 100);
        const y = 100 + Math.random() * (1200 - 150);
        const ammo = new (await import('./ammo.js')).AmmoPack(x, y);
        this.add(ammo);
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

