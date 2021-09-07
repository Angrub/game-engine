import { Shape } from ".";

class Hitbox {
    private _shape: Shape

    constructor(width: number, height: number) {
        this._shape = new Shape(0, 0, width, height);
    }

    areColliding(otherHitbox: Hitbox): boolean {
        let x1, y1, w1, h1, x2, y2, w2, h2: number;
        x1 = this.shape.position.x;
        y1 = this.shape.position.y;
        w1 = this.shape.size.x;
        h1 = this.shape.size.y;
        x2 = otherHitbox.shape.position.x;
        y2 = otherHitbox.shape.position.y;
        w2 = otherHitbox.shape.size.x;
        h2 = otherHitbox.shape.size.y;

        if(x1 < x2 + w2 && x1 + w1 > x2) {
            if(y1 < y2 + h2 && y1 + h1 > y2) {
                return true;
            }
        }
        return false; 
    }

    get shape(): Shape {
        return this._shape;
    }
}

export default Hitbox;