declare class Vector2D {
    private _x;
    private _y;
    constructor(x: number, y: number);
    set x(value: number);
    set y(value: number);
    get x(): number;
    get y(): number;
    addVector(otherVector: Vector2D): void;
    compareVector(otherVector: Vector2D): boolean;
}
export default Vector2D;
