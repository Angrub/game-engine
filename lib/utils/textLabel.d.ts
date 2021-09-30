import { Shape } from ".";
declare class TextLabel {
    shape: Shape;
    value: string | number;
    style: string;
    color: string;
    textY: number;
    textSize: number;
    constructor(value: string | number, style: string, color: string, width: number, height: number);
    draw(ctx: CanvasRenderingContext2D): void;
    updateTextPosition(): void;
    changeText(text: string): void;
}
export default TextLabel;
