import { Entity2D, Scene } from ".";
import { Hitbox } from "./utils";

export interface ConfigCanvas {
    root: Element;
    widthWindow: number;
    heightWindow: number;
}

export class LocalState {
    scene?: Scene;
    collisionRecord: CollisionState[];
    entitiesWithHitbox: Entity2D[];
    keys: Key;
    mouse: Mouse;
    play: boolean;

    constructor() {
        this.collisionRecord = [];
        this.entitiesWithHitbox = [];
        this.keys = new Key();
        this.mouse = new Mouse();
        this.play = true;
    }

    getRecord(entity: Entity2D): CollisionState {
        const record = this.collisionRecord.find(_record => {
            return _record.entity === entity
        })
        
        return (<CollisionState>record)
    }

    stop(): void {
        this.play = false;
    }
}

export interface CollisionState {
    entity: Entity2D;
    collisions: Entity2D[];
}

class Key {
    private _pressed: object;
    
    constructor() {
        this._pressed = {}
    }

    isDown(key: string): boolean {
        return key in this._pressed ? this._pressed[key] : false
    }

    onKeydown(event: KeyboardEvent): void {
        this._pressed[event.key] = true;
    }

    onKeyup(event: KeyboardEvent): void {
        this._pressed[event.key] = false;
    }
}

class Mouse {
    private _hitbox: Hitbox;
    private _clicked: boolean;
    private _pressed: boolean;

    constructor() {
        this._hitbox = new Hitbox(0, 0);
        this._hitbox.shape.position.x = 0;
        this._hitbox.shape.position.y = 0;
        this._clicked = false;
        this._pressed = false;
    }

    onClick(event: MouseEvent): void {
        this._clicked = true;
        this._hitbox.shape.position.x = event.offsetX;
        this._hitbox.shape.position.y = event.offsetY;
    }

    onMouseDown(): void {
        this._pressed = true;
    }

    onMouseUp(): void {
        this._pressed = false;
    }

    resetData(): void {
        this._clicked = false;
    }

    isClick(): Hitbox | boolean {
        if(this._clicked) {
            return this._hitbox;
        } else {
            return this._clicked;
        }
    }

    isPressed(): boolean {
        return this._pressed;
    }
}

