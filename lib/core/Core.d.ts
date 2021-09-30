import { ConfigCanvas } from "..";
import Scene from "../scene";
declare class Core {
    private root;
    private widthWindow;
    private heightWindow;
    private canvas;
    private ctx;
    private scenes;
    private currentScene;
    private state;
    private render;
    play: boolean;
    constructor(config: ConfigCanvas);
    private createCanvas;
    private createCanvasRenderingContext;
    private gameLoop;
    private getCurrentScene;
    addScene(nameScene: Scene): void;
    on(sceneName: string): void;
}
export default Core;
