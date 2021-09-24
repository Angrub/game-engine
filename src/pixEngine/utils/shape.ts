import { Vector2D } from ".";

type positionX = 'center' | 'left' | 'right' | 'stretch';
type positionY = 'center' | 'top' | 'bottom' | 'stretch'; 
export type position2D = {x: positionX, y: positionY};
 
export class Shape {
    private _position: Vector2D;
    private _size: Vector2D;
    private strokeColor: string;
    private fillColor: string;
    visible: boolean;
    
    constructor(x: number, y: number, width: number, height: number) {
        this._position = new Vector2D(x, y);
        this._size = new Vector2D(width, height);
        this.visible = false;
        this.strokeColor = 'black';
        this.fillColor = 'gray';
    }

    private center1D(xA: number, aristaA: number, xB: number, aristaB: number): number {
        const _center: number = (xA + aristaA / 2) - (xB + aristaB / 2);
        return _center;
    }

    position2D(otherShape: Shape, position: position2D): void {
        let xA, yA, wA, hA, xB, yB, wB, hB: number;
        
        // cordinates ShapeA
        xA = otherShape.position.x;
        yA = otherShape.position.y;
        wA = otherShape.size.x;
        hA = otherShape.size.y

        // cordinates ShapeB
        xB = this.position.x;
        yB = this.position.y;
        wB = this.size.x;
        hB = this.size.y;

        
        if(position.x === 'center') {
            this.position.x = this.center1D(xA, wA, xB, wB);
        
        }else if(position.x === 'left') {
            this.position.x = xA;
        
        }else if(position.x === 'right') {
            this.position.x = xA + wA - wB;
        
        }else if(position.x === 'stretch') {
            this.position.x = xA;
            this.size.x = wA;
        
        }
        
        if(position.y === 'center') {
            this.position.y = this.center1D(yA, hA, yB, hB);

        }else if(position.y === 'top') {
            this.position.y = yA;
        
        }else if(position.y === 'bottom') {
            this.position.y = yA + hA - hB; 
        
        }else if(position.y === 'stretch') {
            this.position.y = yA;
            this.size.y = hA;
        }       
    }

    drawShape(ctx: CanvasRenderingContext2D): void {
        if(this.visible) {
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.strokeColor;
            ctx.fillRect(this._position.x, this._position.y, this._size.x, this._size.y);
            ctx.strokeRect(this._position.x, this._position.y, this._size.x, this._size.y);
        }
    }

    setColor(strokeColor: string, fillColor: string) {
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
    }

    get position(): Vector2D {
        return this._position;
    }

    get size(): Vector2D {
        return this._size;
    }
}