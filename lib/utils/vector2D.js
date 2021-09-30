"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Vector2D.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    Vector2D.prototype.addVector = function (otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    };
    Vector2D.prototype.compareVector = function (otherVector) {
        if (this.x === otherVector.x && this.y === otherVector.y) {
            return true;
        }
        return false;
    };
    return Vector2D;
}());
exports.default = Vector2D;
