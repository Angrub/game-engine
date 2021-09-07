import { 
    Sprite, 
    DrawImageMethod, 
    Input,
    inputEvent, 
    listener,
    Hitbox,
    Shape,
    position2D,
    Vector2D
} from './utils'

abstract class Entity2D {
    private _inputEvents: Input[];
    private _behaviour: (()=> void)[];
    private _hitbox?: Hitbox;
    protected shape: Shape;
    protected sprite?: Sprite;
    collide: boolean;
    entitiesThatCollided: Entity2D[]

    constructor(x: number, y: number, width: number, height: number) {
        // set shape
        this.shape = new Shape(x, y, width, height);
        
        // initialization
        this._inputEvents = [];
        this._behaviour = [];
        this.entitiesThatCollided = [];
        this.collide = false;

    }
    
    addBehaviour(cb: ()=> void): void{
        this.behaviour.push(cb);
    }
    
    inputEvent(event: inputEvent, cb: listener): void {
        this.inputEvents.push(new Input(event, cb));
    }
    
    setHitbox(position: position2D, width: number, height: number): void {
        this._hitbox = new Hitbox(width, height);
        this._hitbox.shape.position2D(this.shape, position);
        this.collide = true;
    }
    
    setSprite(url: string, position: position2D, width: number, height: number): void {
        this.sprite = new Sprite(width, height);
        this.sprite.shape.position2D(this.shape, position);
        this.sprite.loadImage(url);
    }
    
    renderEntity(drawFunc: DrawImageMethod): void {
        this.sprite?.render(drawFunc);
    }
    
    moveTo(x: number, y: number) {
        this.shape.position.addVector(new Vector2D(x, y));
        this.sprite?.shape.position.addVector(new Vector2D(x, y));
        this.hitbox?.shape.position.addVector(new Vector2D(x, y));
    }

    get inputEvents(): Input[] {
        return this._inputEvents;
    }

    get behaviour(): (()=> void)[] {
        return this._behaviour;
    }

    get hitbox(): Hitbox | undefined {
        return this._hitbox
    }
}

export default Entity2D;