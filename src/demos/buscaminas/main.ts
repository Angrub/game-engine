import {Core, ConfigCanvas, Scene, Entity2D, LocalState } from 'pixEngine';
import Grid from './grid';
import GUI from './GUI/GUI';

// core settings
const root = document.querySelector('#div');
if(root === null) {
    throw new Error('Root load failed');
}

const config: ConfigCanvas = {
    root: root,
    widthWindow: 500,
    heightWindow: 550
}

const game = new Core(config);

class Buscaminas extends Entity2D {
    grid: Grid;
    gui: GUI;
    play: boolean;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);

        this.play = true;
        // dependencies & initializing
        this.grid = new Grid(x, y +50, width, height -50);
        this.grid.createGrid(10);
        this.gui = new GUI(this.grid.mines, x, y, width, 50);
        this.addBehaviour(this.update);
        this.addBehaviour(this.gameOver);
    }

    update(state: LocalState): void {
        if(this.play) {
            const cell = this.grid.getClickedCell();
            if(cell) {
                this.gui.timer.isRunning = true;

                if(this.gui.switchButton.buttonState) {
                    this.grid.mode2(cell);
                } else {
                    this.grid.mode1(cell);
                }
            }  
        }
        this.play = !this.grid.searchExplosion();
    }

    gameOver(state: LocalState): void {
        if(!this.play) {
            this.grid.exposeMines();
            this.gui.timer.isRunning = false;
        }
    }
}



const buscaminas = new Buscaminas(0, 0, 500, 550);

const main = new Scene('Main');
main.addEntity(buscaminas);

game.addScene(main);
game.on('Main');

// game.on('Main');