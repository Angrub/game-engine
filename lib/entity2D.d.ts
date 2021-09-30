import { LocalState } from '.';
import { Sprite, Hitbox, Shape, position2D, TextLabel } from './utils';
declare type components = 'entity' | 'sprite' | 'hitbox';
declare abstract class Entity2D {
    private _behaviour;
    private _hitbox?;
    protected text?: TextLabel;
    protected shape: Shape;
    protected sprite?: Sprite;
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    collide: boolean;
    click: boolean;
    constructor(x: number, y: number, width: number, height: number);
    protected addBehaviour(cb: (localState: LocalState) => void): void;
    protected moveTo(x: number, y: number): void;
    protected switchVisibleShape(component: components): void;
    protected setShapeColor(component: components, strokeColor: string, fillColor: string): void;
    setText(value: string | number, style: string, color: string, position: position2D, width: number, height: number): void;
    setHitbox(position: position2D, width: number, height: number): void;
    setSprite(url: string, position: position2D, width: number, height: number): void;
    renderEntity(ctx: CanvasRenderingContext2D): void;
    get behaviour(): ((localState: LocalState) => void)[];
    get hitbox(): Hitbox | undefined;
}
export default Entity2D;
