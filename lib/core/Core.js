"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var scene_1 = __importDefault(require("../scene"));
var gameState_1 = __importDefault(require("./gameState"));
var render_1 = __importDefault(require("./render"));
var Core = /** @class */ (function () {
    function Core(config) {
        // config canvas
        this.root = config.root;
        this.widthWindow = config.widthWindow;
        this.heightWindow = config.heightWindow;
        // ----initialization----
        this.play = false;
        this.scenes = [];
        this.currentScene = new scene_1.default('default');
        // Create canvas
        this.canvas = this.createCanvas();
        // insert in the DOM
        this.root.appendChild(this.canvas);
        // Get context 2d
        this.ctx = this.createCanvasRenderingContext();
        // dependencies
        this.state = new gameState_1.default(this.canvas);
        this.render = new render_1.default(this.ctx, this.widthWindow, this.heightWindow);
    }
    Core.prototype.createCanvas = function () {
        // create canvas element
        var canvas = document.createElement('canvas');
        // setting attributes
        var width = String(this.widthWindow);
        var height = String(this.heightWindow);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvas.style.border = '1px black solid';
        return canvas;
    };
    Core.prototype.createCanvasRenderingContext = function () {
        var ctx = this.canvas.getContext('2d');
        if (ctx !== null) {
            return ctx;
        }
        else {
            throw new Error('Get context failed');
        }
    };
    Core.prototype.gameLoop = function () {
        if (this.play) {
            requestAnimationFrame(this.gameLoop.bind(this));
            this.play = this.state.update();
            this.render.clear();
            this.render.draw(this.currentScene);
        }
    };
    Core.prototype.getCurrentScene = function (sceneName) {
        var current = this.scenes.filter(function (scene) {
            return scene.name == sceneName;
        });
        return current[0];
    };
    // add news scenes
    Core.prototype.addScene = function (nameScene) {
        this.scenes.push(nameScene);
    };
    Core.prototype.on = function (sceneName) {
        var _this = this;
        this.play = true;
        this.currentScene = this.getCurrentScene(sceneName);
        this.state.loadScene(this.currentScene);
        window.onload = function () {
            _this.gameLoop();
        };
    };
    return Core;
}());
exports.default = Core;
