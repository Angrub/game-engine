import { Scene } from "..";

class Render {
    private ctx: CanvasRenderingContext2D;
    private widthWindow: number;
    private heightWindow: number

    constructor(ctx: CanvasRenderingContext2D, widthWindow: number, heightWindow: number) {
        this.ctx = ctx;
        this.widthWindow = widthWindow;
        this.heightWindow = heightWindow; 
    }

    // render entities
    draw(currentScene: Scene): void {
        currentScene.entities.forEach(entity => {
            entity.renderEntity(this.ctx);
        })
    } 

    // clear canvas
    clear(): void {
        this.ctx.clearRect(0, 0, this.widthWindow, this.heightWindow);
    }
}

export default Render;