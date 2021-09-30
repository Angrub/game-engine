"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var entity2D_1 = __importDefault(require("./entity2D"));
var Scene = /** @class */ (function () {
    function Scene(name) {
        this._name = name;
        this._entities = [];
    }
    Scene.prototype.addEntity = function (entity) {
        this.deepSearch(entity);
    };
    Scene.prototype.deepSearch = function (subject) {
        var isArray = Array.isArray(subject);
        var isEntity = subject instanceof entity2D_1.default;
        var key;
        if (!isEntity && !isArray) {
            return undefined;
        }
        else if (isEntity) {
            this._entities.push(subject);
        }
        for (key in subject) {
            this.deepSearch(subject[key]);
        }
    };
    Object.defineProperty(Scene.prototype, "entities", {
        get: function () {
            return this._entities;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    return Scene;
}());
exports.default = Scene;
