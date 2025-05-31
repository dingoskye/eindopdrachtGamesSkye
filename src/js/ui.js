import { Actor, Vector, Color, Label, Font, ScreenElement, TextAlign, BaseAlign } from "excalibur";

export class UI extends ScreenElement{

    #labelCurrentScore;
    #labelAmmo;
    #labelHighScore;
    #labelHealth;

    player;

    constructor(player) {
        super();
        this.player = player;
    }

    updateScore() {
        this.#labelCurrentScore.text = `Score: ${this.player.score}`;
        // Check en update highscore
        let highScore = localStorage.getItem('highscore') || 0;
        if (this.player.score > highScore) {
            localStorage.setItem('highscore', this.player.score);
            this.updateHighScore();
        }
    }

    updateAmmo() {
        if (!this.#labelAmmo) {
            this.#labelAmmo = new Label({
                text: `Ammo: ${this.player.ammo}`,
                pos: new Vector(30, 60), // direct onder score label
                font: new Font({
                    size: 20,
                    family: 'Open Sans',
                    color: Color.White
                })
            });
            this.#labelAmmo.z = 10000; // altijd bovenop
            this.#labelAmmo.screenPos = true; // VAST aan scherm
            this.addChild(this.#labelAmmo);
        }
        this.#labelAmmo.text = `Ammo: ${this.player.ammo}`;
    }

    updateHighScore() {
        const highScore = localStorage.getItem('highscore') || 0;
        if (!this.#labelHighScore) return;
        this.#labelHighScore.text = `Highscore: ${highScore}`;
    }

    updateHealth() {
        if (this.#labelHealth) {
            this.#labelHealth.text = `Health: ${this.player.health}`;
        }
    }

    onInitialize(engine) {
        this.#labelCurrentScore = new Label({
            text: 'Score: 0',
            pos: new Vector(30, 30),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow
            })
        });
        this.#labelCurrentScore.z = 10000;
        this.#labelCurrentScore.screenPos = true;
        this.addChild(this.#labelCurrentScore);
        // Highscore label
        const highScore = localStorage.getItem('highscore') || 0;
        this.#labelHighScore = new Label({
            text: `Highscore: ${highScore}`,
            pos: new Vector(30, 90),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Green
            })
        });
        this.#labelHighScore.z = 10000;
        this.#labelHighScore.screenPos = true;
        this.addChild(this.#labelHighScore);
        // Health label
        this.#labelHealth = new Label({
            text: `Health: ${this.player.health}`,
            pos: new Vector(30, 120), // onder highscore label
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Red
            })
        });
        this.#labelHealth.z = 10000;
        this.#labelHealth.screenPos = true;
        this.addChild(this.#labelHealth);
        this.updateAmmo();
    }

    onPreUpdate(_engine, _delta) {
        // Labels zijn nu vast aan het scherm, geen update meer nodig
        this.updateHealth();
    }

    showEndScreen() {
        // Actor voor endscreen achtergrond
        this.endScreen = new Actor({
            pos: new Vector(2000/2, 1200/2),
            width: 2000,
            height: 1200,
            z: 9000, // lager dan labels
            color: new Color(0, 0, 0, 0.85) // Zwarte achtergrond met alpha
        });
        this.addChild(this.endScreen);

        // Label voor "Game Over"
        this.endLabel = new Label({
            text: 'Game Over',
            pos: new Vector(1280/2, 720/2), // midden van het scherm
            font: new Font({
                size: 60,
                family: 'Open Sans',
                color: Color.Yellow,
                textAlign: TextAlign.Center, // centreren
                baseAlign: BaseAlign.Middle  // verticaal centreren
            }),
            z: 9001 // lager dan score/ammo labels
        });
        this.addChild(this.endLabel);

        // Restart knop (HTML overlay)
        const restartBtn = document.getElementById('restart-btn') || document.createElement('button');
        restartBtn.innerText = 'Restart';
        restartBtn.style.position = 'fixed';
        restartBtn.style.top = '60%';
        restartBtn.style.left = '50%';
        restartBtn.style.transform = 'translate(-50%, -50%)';
        restartBtn.style.fontSize = '2rem';
        restartBtn.style.padding = '1rem 2rem';
        restartBtn.style.cursor = 'pointer';
        restartBtn.style.zIndex = '10000';
        restartBtn.id = 'restart-btn';
        restartBtn.onclick = () => window.location.reload();
        if (!restartBtn.parentElement) document.body.appendChild(restartBtn);
        restartBtn.style.display = 'none';

        // Zet labels altijd bovenop
        if (this.#labelCurrentScore) this.#labelCurrentScore.z = 10000;
        if (this.#labelAmmo) this.#labelAmmo.z = 10000;
        if (this.#labelHighScore) this.#labelHighScore.z = 10000;
    }

    showGameOver() {
        if (!this.endScreen) this.showEndScreen();
        if (this.endScreen) this.endScreen.active = true;
        if (this.endLabel) this.endLabel.text = 'Game Over';
        const btn = document.getElementById('restart-btn');
        if (btn) btn.style.display = 'block';
    }

    hideEndScreen() {
        if (this.endScreen) {
            this.endScreen.kill();
            this.endScreen = null;
        }
        if (this.endLabel) {
            this.endLabel.kill();
            this.endLabel = null;
        }
        const btn = document.getElementById('restart-btn');
        if (btn) btn.style.display = 'none';
    }
}

