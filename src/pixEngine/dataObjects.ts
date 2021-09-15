import { Entity2D, Scene } from ".";

export interface ConfigCanvas {
    root: HTMLElement;
    widthWindow: number;
    heightWindow: number;
}

export class LocalState {
    scene?: Scene;
    collisionRecord: CollisionState[];
    keys: Key
    entitiesWithHitbox: Entity2D[]

    constructor() {
        this.collisionRecord = [];
        this.entitiesWithHitbox = [];
        this.keys = new Key();
    }

    getRecord(entity: Entity2D): CollisionState {
        const record = this.collisionRecord.find(_record => {
            return _record.entity === entity
        })
        
        return (<CollisionState>record)
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

