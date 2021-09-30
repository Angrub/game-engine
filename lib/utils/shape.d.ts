import { Vector2D } from ".";
declare type positionX = 'center' | 'left' | 'right' | 'stretch';
declare type positionY = 'center' | 'top' | 'bottom' | 'stretch';
export declare type position2D = {
    x: positionX;
    y: positionY;
};
export declare class Shape {
    private _position;
    private _size;
    private strokeColor;
    private fillColor;
    visible: boolean;
    constructor(x: number, y: number, width: number, height: number);
    private center1D;
    position2D(otherShape: Shape, position: position2D): void;
    drawShape(ctx: CanvasRenderingContext2D): void;
    setColor(strokeColor: string, fillColor: string): void;
    get position(): Vector2D;
    get size(): Vector2D;
}
export {};
