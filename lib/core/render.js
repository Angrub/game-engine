"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Render = /** @class */ (function () {
    function Render(ctx, widthWindow, heightWindow) {
        this.ctx = ctx;
        this.widthWindow = widthWindow;
        this.heightWindow = heightWindow;
    }
    // render entities
    Render.prototype.draw = function (currentScene) {
        var _this = this;
        currentScene.entities.forEach(function (entity) {
            entity.renderEntity(_this.ctx);
        });
    };
    // clear canvas
    Render.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.widthWindow, this.heightWindow);
    };
    return Render;
}());
exports.default = Render;
