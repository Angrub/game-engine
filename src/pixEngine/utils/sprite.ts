import { Shape } from ".";

// type of method: CanvasRenderingContext2D.drawImage()
export type DrawImageMethod = (image: CanvasImageSource, dx: number, dy: number, dW: number, dH: number) => void;

export class Sprite {
    private image?: CanvasImageSource;
    private _shape: Shape;

    constructor(width: number, height: number) {
        this._shape = new Shape(0, 0, width, height);
    }

    // load image
    loadImage(imageUrl: string): void {
        // load
        this.image = new Image();
        this.image.src = imageUrl;
    }
    
    // render sprite on the canvas
    render(draw: DrawImageMethod): void {
        const dx = this.shape.position.x;
        const dy = this.shape.position.y;
        const dW = this.shape.size.x;
        const dH = this.shape.size.y;

        if(this.image) {  // this.image !== undefined
            draw(this.image, dx, dy, dW, dH);
            
        } else {
            throw new Error('Sprite undefined');
        } 
    }

    get shape(): Shape {
        return this._shape;
    }
}

