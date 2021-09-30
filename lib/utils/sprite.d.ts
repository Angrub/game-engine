import { Shape } from ".";
export declare type DrawImageMethod = (image: CanvasImageSource, dx: number, dy: number, dW: number, dH: number) => void;
export declare class Sprite {
    private image?;
    private _shape;
    constructor(width: number, height: number);
    loadImage(imageUrl: string): void;
    render(draw: DrawImageMethod): void;
    get shape(): Shape;
}
