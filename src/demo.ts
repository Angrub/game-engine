import {Core, ConfigCanvas, Entity2D, Scene, LocalState} from './pixEngine';
import s from './player.png';

// Game class configuration
const div: any = document.querySelector('#div');
const config: ConfigCanvas = {
    root: (div !== null) ? div : new Error('Root load failed'),
    widthWindow: 500,
    heightWindow: 500 
}

// the player class extends from the entity abstract class 
class Player extends Entity2D {
    counter: number;
    constructor(posX: number, posY: number, width: number, height: number) {
        super(posX, posY, width, height);
        
        this.counter = 0;
        // move to
        this.addBehaviour(this.move);
        // this.addBehaviour(this.areCollided);

        
    }

    move(state: LocalState): void {
        if(state.keys.isDown('w')) this.moveTo(0, -5);
        if(state.keys.isDown('s')) this.moveTo(0, 5);
        if(state.keys.isDown('a')) this.moveTo(-5, 0);
        if(state.keys.isDown('d')) this.moveTo(5, 0);
    }
    areCollided(state: LocalState): void {
        this.counter++;
        if(this.counter % 50 === 0) {
            console.log(this.collide)
        }
    }
}

class Pong extends Entity2D {
    speed: number;
    
    constructor(posX: number, posY: number, width: number, height: number, speed: number) {
        super(posX, posY, width, height);
        this.speed = speed;
        // this.addBehaviour(this.move);
    }
    
    move(): void {
        if(this.shape.position.x === 480 || this.shape.position.x === 0) {
            this.speed *= -1;
        }
        this.moveTo(this.speed, 0);
    }
}

// player settings
const player1 = new Player(100, 100, 100, 100);
player1.setSprite(s, {x: 'center', y: 'center'}, 100, 100)
player1.setHitbox({x: 'center', y: 'center'}, 60, 60);
player1.switchVisibleShape('hitbox');

// pong settings
const pong = new Pong(250, 400, 20, 20, 5);
pong.setSprite(s, {x: 'center', y: 'center'}, 20, 20);
pong.setHitbox({x: 'center', y: 'center'}, 20, 20);

// scene settings
const mainScene = new Scene('main');
mainScene.addEntity([player1, pong]);

// game settings
const videoGame = new Core(config);
videoGame.addScene(mainScene);

videoGame.on('main');




// Ideas: Shape collision, input buffer, raycast, correción de esquinas, sprite