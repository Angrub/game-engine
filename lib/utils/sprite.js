"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprite = void 0;
var _1 = require(".");
var Sprite = /** @class */ (function () {
    function Sprite(width, height) {
        this._shape = new _1.Shape(0, 0, width, height);
    }
    // load image
    Sprite.prototype.loadImage = function (imageUrl) {
        // load
        this.image = new Image();
        this.image.src = imageUrl;
    };
    // render sprite on the canvas
    Sprite.prototype.render = function (draw) {
        var dx = this.shape.position.x;
        var dy = this.shape.position.y;
        var dW = this.shape.size.x;
        var dH = this.shape.size.y;
        if (this.image) { // this.image !== undefined
            draw(this.image, dx, dy, dW, dH);
        }
        else {
            throw new Error('Sprite undefined');
        }
    };
    Object.defineProperty(Sprite.prototype, "shape", {
        get: function () {
            return this._shape;
        },
        enumerable: false,
        configurable: true
    });
    return Sprite;
}());
exports.Sprite = Sprite;
