import { Scene } from "..";
declare class GameState {
    private localState;
    private canvas;
    constructor(canvas: HTMLCanvasElement);
    loadScene(scene: Scene): void;
    update(): boolean;
    checkCollisions(): void;
    checkClicks(): void;
}
export default GameState;
