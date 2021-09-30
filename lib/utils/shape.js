"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
var _1 = require(".");
var Shape = /** @class */ (function () {
    function Shape(x, y, width, height) {
        this._position = new _1.Vector2D(x, y);
        this._size = new _1.Vector2D(width, height);
        this.visible = false;
        this.strokeColor = 'black';
        this.fillColor = 'gray';
    }
    Shape.prototype.center1D = function (xA, aristaA, xB, aristaB) {
        var _center = (xA + aristaA / 2) - (xB + aristaB / 2);
        return _center;
    };
    Shape.prototype.position2D = function (otherShape, position) {
        var xA, yA, wA, hA, xB, yB, wB, hB;
        // cordinates ShapeA
        xA = otherShape.position.x;
        yA = otherShape.position.y;
        wA = otherShape.size.x;
        hA = otherShape.size.y;
        // cordinates ShapeB
        xB = this.position.x;
        yB = this.position.y;
        wB = this.size.x;
        hB = this.size.y;
        if (position.x === 'center') {
            this.position.x = this.center1D(xA, wA, xB, wB);
        }
        else if (position.x === 'left') {
            this.position.x = xA;
        }
        else if (position.x === 'right') {
            this.position.x = xA + wA - wB;
        }
        else if (position.x === 'stretch') {
            this.position.x = xA;
            this.size.x = wA;
        }
        if (position.y === 'center') {
            this.position.y = this.center1D(yA, hA, yB, hB);
        }
        else if (position.y === 'top') {
            this.position.y = yA;
        }
        else if (position.y === 'bottom') {
            this.position.y = yA + hA - hB;
        }
        else if (position.y === 'stretch') {
            this.position.y = yA;
            this.size.y = hA;
        }
    };
    Shape.prototype.drawShape = function (ctx) {
        if (this.visible) {
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.strokeColor;
            ctx.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
            ctx.strokeRect(this._position.x, this._position.y, this._size.x, this._size.y);
        }
    };
    Shape.prototype.setColor = function (strokeColor, fillColor) {
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
    };
    Object.defineProperty(Shape.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    return Shape;
}());
exports.Shape = Shape;
