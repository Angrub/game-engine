import { Shape } from ".";
declare class Hitbox {
    private _shape;
    constructor(width: number, height: number);
    areColliding(otherHitbox: Hitbox): boolean;
    get shape(): Shape;
}
export default Hitbox;
