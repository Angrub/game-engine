import { ConfigCanvas } from "..";
import Scene from "../scene";
import GameState from "./gameState";
import Render from "./render";

class Core {
    private root: Element;
    private widthWindow: number;
    private heightWindow: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private scenes: Scene[];
    private currentScene: Scene;
    private state: GameState;
    private render: Render;

    constructor(config: ConfigCanvas) {
        // config canvas
        this.root = config.root;
        this.widthWindow = config.widthWindow;
        this.heightWindow = config.heightWindow;

        // ----initialization----
        this.scenes = [];
        this.currentScene = new Scene('default');

        // Create canvas
        this.canvas = this.createCanvas();

        // insert in the DOM
        this.root.appendChild(this.canvas);

        // Get context 2d
        this.ctx = this.createCanvasRenderingContext();
        
        // dependencies
        this.state = new GameState(this.canvas);
        this.render = new Render(this.ctx, this.widthWindow, this.heightWindow);
        
    }
    
    private createCanvas(): HTMLCanvasElement{
        // create canvas element
        const canvas: HTMLCanvasElement = document.createElement('canvas');

        // setting attributes
        const width: string = String(this.widthWindow);
        const height: string = String(this.heightWindow);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvas.style.border = '1px black solid';

        return canvas;
    }

    private createCanvasRenderingContext():  CanvasRenderingContext2D {
        const ctx = this.canvas.getContext('2d');
        if(ctx !== null){
            return ctx;
        } else {
            throw new Error('Get context failed');
        }
    }

    private gameLoop(): void {
        requestAnimationFrame(this.gameLoop.bind(this))
        
        this.state.update();
        this.render.clear();
        this.render.draw(this.currentScene);
    }
    
    private getCurrentScene(sceneName: string): Scene {
        const current = this.scenes.filter(scene => {
            return scene.name == sceneName;
        })

        return current[0];
    }
    
    // add news scenes
    addScene(nameScene: Scene): void {
        this.scenes.push(nameScene);
    }
    
    on(sceneName: string): void {
        this.currentScene = this.getCurrentScene(sceneName);
        
        this.state.loadScene(this.currentScene);
        window.onload = () => {
            this.gameLoop();
        }
    }
}

export default Core;