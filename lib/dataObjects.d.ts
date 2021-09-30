import { Entity2D, Scene } from ".";
import { Hitbox } from "./utils";
export interface ConfigCanvas {
    root: Element;
    widthWindow: number;
    heightWindow: number;
}
export declare class LocalState {
    scene?: Scene;
    collisionRecord: CollisionState[];
    entitiesWithHitbox: Entity2D[];
    keys: Key;
    mouse: Mouse;
    play: boolean;
    constructor();
    getRecord(entity: Entity2D): CollisionState;
    stop(): void;
}
export interface CollisionState {
    entity: Entity2D;
    collisions: Entity2D[];
}
declare class Key {
    private _pressed;
    constructor();
    isDown(key: string): boolean;
    onKeydown(event: KeyboardEvent): void;
    onKeyup(event: KeyboardEvent): void;
}
declare class Mouse {
    private _hitbox;
    private _clicked;
    private _pressed;
    constructor();
    onClick(event: MouseEvent): void;
    onMouseDown(): void;
    onMouseUp(): void;
    resetData(): void;
    isClick(): Hitbox | boolean;
    isPressed(): boolean;
}
export {};
