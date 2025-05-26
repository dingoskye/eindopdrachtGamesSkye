import { Actor, Vector, Color, Label, Font } from "excalibur";

export class UI extends Actor{

    #labelP1;
    #labelP2;

    player1;
    player2;

    constructor(shark1, shark2) {
        super();
        this.player1 = shark1;
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
}