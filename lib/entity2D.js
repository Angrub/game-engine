"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var Entity2D = /** @class */ (function () {
    function Entity2D(x, y, width, height) {
        // set shape
        this.shape = new utils_1.Shape(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // initialization
        this._behaviour = [];
        this.collide = false;
        this.click = false;
    }
    Entity2D.prototype.addBehaviour = function (cb) {
        this.behaviour.push(cb);
    };
    Entity2D.prototype.moveTo = function (x, y) {
        var _a, _b;
        this.shape.position.addVector(new utils_1.Vector2D(x, y));
        (_a = this.sprite) === null || _a === void 0 ? void 0 : _a.shape.position.addVector(new utils_1.Vector2D(x, y));
        (_b = this.hitbox) === null || _b === void 0 ? void 0 : _b.shape.position.addVector(new utils_1.Vector2D(x, y));
        this.x += x;
        this.y += y;
    };
    Entity2D.prototype.switchVisibleShape = function (component) {
        var _a, _b;
        switch (component) {
            case 'entity':
                this.shape.visible = !this.shape.visible;
                break;
            case 'hitbox':
                if (this.hitbox)
                    this.hitbox.shape.visible = !((_a = this.hitbox) === null || _a === void 0 ? void 0 : _a.shape.visible);
                break;
            case 'sprite':
                if (this.sprite)
                    this.sprite.shape.visible = !((_b = this.sprite) === null || _b === void 0 ? void 0 : _b.shape.visible);
                break;
        }
    };
    Entity2D.prototype.setShapeColor = function (component, strokeColor, fillColor) {
        switch (component) {
            case 'entity':
                this.shape.setColor(strokeColor, fillColor);
                break;
            case 'hitbox':
                if (this.hitbox)
                    this.hitbox.shape.setColor(strokeColor, fillColor);
                break;
            case 'sprite':
                if (this.sprite)
                    this.sprite.shape.setColor(strokeColor, fillColor);
                break;
        }
    };
    Entity2D.prototype.setText = function (value, style, color, position, width, height) {
        var textLabel = new utils_1.TextLabel(value, style, color, width, height);
        textLabel.shape.position2D(this.shape, position);
        this.text = textLabel;
        this.text.updateTextPosition();
    };
    Entity2D.prototype.setHitbox = function (position, width, height) {
        this._hitbox = new utils_1.Hitbox(width, height);
        this._hitbox.shape.position2D(this.shape, position);
        this.collide = true;
    };
    Entity2D.prototype.setSprite = function (url, position, width, height) {
        this.sprite = new utils_1.Sprite(width, height);
        this.sprite.shape.position2D(this.shape, position);
        this.sprite.loadImage(url);
    };
    Entity2D.prototype.renderEntity = function (ctx) {
        var _a, _b, _c, _d;
        (_a = this.sprite) === null || _a === void 0 ? void 0 : _a.render(ctx.drawImage.bind(ctx));
        this.shape.drawShape(ctx);
        (_b = this.sprite) === null || _b === void 0 ? void 0 : _b.shape.drawShape(ctx);
        (_c = this.hitbox) === null || _c === void 0 ? void 0 : _c.shape.drawShape(ctx);
        (_d = this.text) === null || _d === void 0 ? void 0 : _d.draw(ctx);
    };
    Object.defineProperty(Entity2D.prototype, "behaviour", {
        get: function () {
            return this._behaviour;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity2D.prototype, "hitbox", {
        get: function () {
            return this._hitbox;
        },
        enumerable: false,
        configurable: true
    });
    return Entity2D;
}());
exports.default = Entity2D;
