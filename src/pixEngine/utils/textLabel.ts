import { Shape } from ".";

class TextLabel {
    shape: Shape;
    value: string | number;
    style: string;
    color: string;
    textY: number;
    textSize: number;

    constructor(value: string | number, style: string, color: string, width: number, height: number) {
        this.shape = new Shape(0, 0, width, height);
        this.value = value;
        this.style = style;
        this.color = color;
        this.textY = 0;
        this.textSize = 0;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.font = `${this.textSize}px ${this.style} `;
        ctx.fillStyle = this.color;
        ctx.fillText((<string>this.value), this.shape.position.x, this.textY);
    }

    updateTextPosition(): void {
        let multi = 2.3;
        if(typeof this.value === 'number') {
            this.value = `${this.value}`;
            multi = 0.75;
        }
        // compute size
        let textLength = this.value.length;
        this.textSize = this.shape.size.x / textLength * multi;
        
        // compute Y
        let height = this.shape.position.y + this.shape.size.y;
        this.textY = height / 2 - this.textSize / 2;
        this.textY += this.textSize * 0.73;
        
    }

    changeText(text: string): void {
        this.value = text;
    }
}

export default TextLabel;