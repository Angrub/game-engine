import { Scene } from "..";
declare class Render {
    private ctx;
    private widthWindow;
    private heightWindow;
    constructor(ctx: CanvasRenderingContext2D, widthWindow: number, heightWindow: number);
    draw(currentScene: Scene): void;
    clear(): void;
}
export default Render;
