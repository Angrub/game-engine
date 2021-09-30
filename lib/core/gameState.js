"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var dataObjects_1 = require("../dataObjects");
var GameState = /** @class */ (function () {
    function GameState(canvas) {
        this.localState = new dataObjects_1.LocalState();
        this.canvas = canvas;
    }
    // Add all listeners
    GameState.prototype.loadScene = function (scene) {
        var _this = this;
        var _a;
        this.localState.scene = scene;
        var local = this.localState;
        // add listeners
        document.addEventListener('keydown', function (event) { return _this.localState.keys.onKeydown(event); });
        document.addEventListener('keyup', function (event) { return _this.localState.keys.onKeyup(event); });
        this.canvas.addEventListener('click', function (event) { return _this.localState.mouse.onClick(event); });
        this.canvas.addEventListener('mousedown', function (event) { return _this.localState.mouse.onMouseDown(); });
        this.canvas.addEventListener('mouseup', function (event) { return _this.localState.mouse.onMouseUp(); });
        // add entities with hitbox
        (_a = local.scene) === null || _a === void 0 ? void 0 : _a.entities.forEach(function (entity) {
            if (entity.hitbox !== undefined) {
                local.entitiesWithHitbox.push(entity);
            }
        });
        // create collision record
        local.entitiesWithHitbox.forEach(function (entity) {
            var record = {
                entity: entity,
                collisions: []
            };
            local.collisionRecord.push(record);
        });
    };
    // Update game state
    GameState.prototype.update = function () {
        var _this = this;
        var _a;
        // Update collisions & clicks
        this.checkCollisions();
        this.checkClicks();
        // Update entities state
        (_a = this.localState.scene) === null || _a === void 0 ? void 0 : _a.entities.forEach(function (entity) {
            entity.behaviour.forEach(function (cb) {
                var run = cb.bind(entity);
                run(_this.localState);
            });
        });
        // clean old data
        this.localState.mouse.resetData();
        // stop?
        return this.localState.play;
    };
    // validate collisions
    GameState.prototype.checkCollisions = function () {
        var local = this.localState;
        // collision detection with big O quadratic :c
        local.entitiesWithHitbox.forEach(function (entity1) {
            var record = local.getRecord(entity1);
            local.entitiesWithHitbox.forEach(function (entity2) {
                if (entity1 !== entity2) {
                    var hitbox1 = entity1.hitbox;
                    var hitbox2 = entity2.hitbox;
                    var itsIncluded = record.collisions.includes(entity2);
                    if (hitbox1.areColliding(hitbox2)) {
                        if (!itsIncluded) {
                            record.collisions.push(entity2);
                        }
                    }
                    else {
                        if (itsIncluded) {
                            var index = record.collisions.indexOf(entity2);
                            record.collisions.splice(index, 1);
                        }
                    }
                }
            });
            if (record.collisions.length > 0) {
                entity1.collide = true;
            }
            else {
                entity1.collide = false;
            }
        });
    };
    GameState.prototype.checkClicks = function () {
        var _this = this;
        this.localState.entitiesWithHitbox.forEach(function (entity) {
            var _a;
            var data = _this.localState.mouse.isClick();
            if (data instanceof utils_1.Hitbox) {
                if ((_a = entity.hitbox) === null || _a === void 0 ? void 0 : _a.areColliding(data)) {
                    entity.click = true;
                }
            }
            else {
                entity.click = false;
            }
        });
    };
    return GameState;
}());
exports.default = GameState;
