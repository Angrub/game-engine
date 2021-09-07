class Vector2D {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    set x(value: number) {
        this._x = value;
    }

    set y(value: number) {
        this._y = value;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    addVector(otherVector: Vector2D): void {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }

    compareVector(otherVector: Vector2D): boolean {
        if(this.x === otherVector.x && this.y === otherVector.y) {
            return true;
        }

        return false;
    }
}

export default Vector2D;