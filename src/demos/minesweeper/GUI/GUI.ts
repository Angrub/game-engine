import { Entity2D } from "@angrub/pix-engine";
import Button from "./button";
import Timer from "./timer";
import Counter from "./counter";

class GUI extends Entity2D {
    switchButton: Button;
    timer: Timer;
    mineCounter: Counter;

    constructor(mines: number, x: number, y: number, width: number, height: number ) {
        super(x, y, width, height);
        let hItems = height * 0.8;
        let block = 20;
        this.timer = new Timer(block*5, y+5, block*3, hItems);
        this.switchButton = new Button('mine', 'flag', block*11, y+5, block*2, hItems );
        this.mineCounter = new Counter(mines, block*17.5, y+5, block*3, hItems);
    }
}

export default GUI;