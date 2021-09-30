"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var Hitbox = /** @class */ (function () {
    function Hitbox(width, height) {
        this._shape = new _1.Shape(0, 0, width, height);
    }
    Hitbox.prototype.areColliding = function (otherHitbox) {
        var x1, y1, w1, h1, x2, y2, w2, h2;
        x1 = this.shape.position.x;
        y1 = this.shape.position.y;
        w1 = this.shape.size.x;
        h1 = this.shape.size.y;
        x2 = otherHitbox.shape.position.x;
        y2 = otherHitbox.shape.position.y;
        w2 = otherHitbox.shape.size.x;
        h2 = otherHitbox.shape.size.y;
        if (x1 < x2 + w2 && x1 + w1 > x2) {
            if (y1 < y2 + h2 && y1 + h1 > y2) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(Hitbox.prototype, "shape", {
        get: function () {
            return this._shape;
        },
        enumerable: false,
        configurable: true
    });
    return Hitbox;
}());
exports.default = Hitbox;
