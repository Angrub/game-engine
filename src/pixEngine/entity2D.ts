import { LocalState } from '.'
import { 
    Sprite, 
    Hitbox,
    Shape,
    position2D,
    Vector2D,
    TextLabel
} from './utils'

type components = 'entity' | 'sprite' | 'hitbox';

abstract class Entity2D {
    
    private _behaviour: ((localState: LocalState) => void)[];
    private _hitbox?: Hitbox;
    protected text?: TextLabel;
    protected shape: Shape;
    protected sprite?: Sprite;
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    collide: boolean;
    click: boolean;

    constructor(x: number, y: number, width: number, height: number) {
        // set shape
        this.shape = new Shape(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // initialization
    
        this._behaviour = [];
        this.collide = false;
        this.click = false;

    }
    
    protected addBehaviour(cb: (localState: LocalState) => void): void {
        this.behaviour.push(cb);
    }

    protected moveTo(x: number, y: number) {
        this.shape.position.addVector(new Vector2D(x, y));
        this.sprite?.shape.position.addVector(new Vector2D(x, y));
        this.hitbox?.shape.position.addVector(new Vector2D(x, y));
        this.x += x;
        this.y += y;
    }

    protected switchVisibleShape(component: components): void {
        switch(component) {
            case 'entity':
                this.shape.visible = !this.shape.visible;
                break;
            case 'hitbox':
                if (this.hitbox)
                this.hitbox.shape.visible = !this.hitbox?.shape.visible;
                break;
            case 'sprite':
                if(this.sprite)
                this.sprite.shape.visible = !this.sprite?.shape.visible;
                break;
        }
    }

    protected setShapeColor(component: components, strokeColor: string, fillColor: string): void {
        switch(component) {
            case 'entity':
                this.shape.setColor(strokeColor, fillColor);
                break;
            case 'hitbox':
                if (this.hitbox)
                this.hitbox.shape.setColor(strokeColor, fillColor);
                break;
            case 'sprite':
                if(this.sprite)
                this.sprite.shape.setColor(strokeColor, fillColor);
                break;
        }
    }

    setText(value: string | number, style: string, color: string, position: position2D, width: number, height: number): void {
        const textLabel = new TextLabel(value, style, color, width, height);
        textLabel.shape.position2D(this.shape, position);
        this.text = textLabel;
        this.text.updateTextPosition();
    }

    setHitbox(position: position2D, width: number, height: number): void {
        this._hitbox = new Hitbox(width, height);
        this._hitbox.shape.position2D(this.shape, position);
        this.collide = true;
    }
    
    setSprite(url: string, position: position2D, width: number, height: number): void {
        this.sprite = new Sprite(width, height);
        this.sprite.shape.position2D(this.shape, position);
        this.sprite.loadImage(url);
    }
    
    renderEntity(ctx: CanvasRenderingContext2D): void {
        this.sprite?.render(ctx.drawImage.bind(ctx));
        this.shape.drawShape(ctx);
        this.sprite?.shape.drawShape(ctx);
        this.hitbox?.shape.drawShape(ctx);
        this.text?.draw(ctx);
    }

    get behaviour(): ((localState: LocalState)=> void)[] {
        return this._behaviour;
    }

    get hitbox(): Hitbox | undefined {
        return this._hitbox
    }
}

export default Entity2D;