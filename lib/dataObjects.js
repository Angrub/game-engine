"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalState = void 0;
var utils_1 = require("./utils");
var LocalState = /** @class */ (function () {
    function LocalState() {
        this.collisionRecord = [];
        this.entitiesWithHitbox = [];
        this.keys = new Key();
        this.mouse = new Mouse();
        this.play = true;
    }
    LocalState.prototype.getRecord = function (entity) {
        var record = this.collisionRecord.find(function (_record) {
            return _record.entity === entity;
        });
        return record;
    };
    LocalState.prototype.stop = function () {
        this.play = false;
    };
    return LocalState;
}());
exports.LocalState = LocalState;
var Key = /** @class */ (function () {
    function Key() {
        this._pressed = {};
    }
    Key.prototype.isDown = function (key) {
        return key in this._pressed ? this._pressed[key] : false;
    };
    Key.prototype.onKeydown = function (event) {
        this._pressed[event.key] = true;
    };
    Key.prototype.onKeyup = function (event) {
        this._pressed[event.key] = false;
    };
    return Key;
}());
var Mouse = /** @class */ (function () {
    function Mouse() {
        this._hitbox = new utils_1.Hitbox(0, 0);
        this._hitbox.shape.position.x = 0;
        this._hitbox.shape.position.y = 0;
        this._clicked = false;
        this._pressed = false;
    }
    Mouse.prototype.onClick = function (event) {
        this._clicked = true;
        this._hitbox.shape.position.x = event.offsetX;
        this._hitbox.shape.position.y = event.offsetY;
    };
    Mouse.prototype.onMouseDown = function () {
        this._pressed = true;
    };
    Mouse.prototype.onMouseUp = function () {
        this._pressed = false;
    };
    Mouse.prototype.resetData = function () {
        this._clicked = false;
    };
    Mouse.prototype.isClick = function () {
        if (this._clicked) {
            return this._hitbox;
        }
        else {
            return this._clicked;
        }
    };
    Mouse.prototype.isPressed = function () {
        return this._pressed;
    };
    return Mouse;
}());
