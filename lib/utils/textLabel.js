"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var TextLabel = /** @class */ (function () {
    function TextLabel(value, style, color, width, height) {
        this.shape = new _1.Shape(0, 0, width, height);
        this.value = value;
        this.style = style;
        this.color = color;
        this.textY = 0;
        this.textSize = 0;
    }
    TextLabel.prototype.draw = function (ctx) {
        ctx.font = this.textSize + "px " + this.style + " ";
        ctx.fillStyle = this.color;
        ctx.fillText(this.value, this.shape.position.x, this.textY);
    };
    TextLabel.prototype.updateTextPosition = function () {
        var multi = 2.3;
        if (typeof this.value === 'number') {
            this.value = "" + this.value;
            multi = 0.75;
        }
        // compute size
        var textLength = this.value.length;
        this.textSize = this.shape.size.x / textLength * multi;
        // compute Y
        var height = this.shape.position.y + this.shape.size.y;
        this.textY = height / 2 - this.textSize / 2;
        this.textY += this.textSize * 0.73;
    };
    TextLabel.prototype.changeText = function (text) {
        this.value = text;
    };
    return TextLabel;
}());
exports.default = TextLabel;
