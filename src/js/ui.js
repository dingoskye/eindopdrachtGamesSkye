import { Actor, Vector, Color, Label, Font } from "excalibur";

export class UI extends Actor{

    #labelP1;
    #labelP2;

    player1;
    player2;

    constructor(player1, shark2) {
        super();
        this.player1 = player1;
        this.player2 = shark2;
    }

    onInitialize(engine){
        this.#labelP1 = new Label({
            text: 'score = 0',
            pos: new Vector(100, 50),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow
            })
        });
        this.#labelP2 = new Label({
            text: 'score = 0',
            pos: new Vector(700, 50),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow
            })
        });

        this.addChild(this.#labelP1);
        this.addChild(this.#labelP2);
    }

    updateScore(shark, score) {
        this.#labelP1.text = `Score ${this.player1.score}`
        this.#labelP2.text = `Score ${this.player2.score}`
    }

    showEndScreen() {
        // Actor voor endscreen achtergrond
        this.endScreen = new Actor({
            pos: new Vector(1280/2, 720/2),
            width: 1280,
            height: 720,
            z: 9999,
            color: new Color(0, 0, 0, 0.85) // Zwarte achtergrond met alpha
            
        });
        this.addChild(this.endScreen);

        // Label voor "Game Over"
        this.endLabel = new Label({
            text: 'Game Over',
            pos: new Vector(1280/2 - 180, 720/2 - 60),
            font: new Font({
                size: 60,
                family: 'Open Sans',
                color: Color.Yellow
            })
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

