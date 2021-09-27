# Game-engine
A simple game engine with typescript

### Hello world

```
import {Core, ConfigCanvas, Scene, Entity2D, LocalState } from 'pixEngine';

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

// create your Entity
class Player extends Entity2D {
    // player attributes...

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);

    }
}

let size = 30;
let url = './player.png';

const player1 = new Player(50, 50, size, size);
player.setSprite(url, {x:'center', y:'center'}, size, size);

const main = new Scene('Main');
main.addEntity(player1);

game.addScene(main);
game.on('Main');

```