import { Scene } from "..";
import { Hitbox } from "../utils";
import { LocalState, CollisionState } from "../dataObjects";


class GameState {
    private localState: LocalState;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.localState = new LocalState();
        this.canvas = canvas;
    }

    // Add all listeners
    loadScene(scene: Scene): void {
        this.localState.scene = scene;
        const local = this.localState;
        
        // add listeners
        document.addEventListener('keydown', event => this.localState.keys.onKeydown(event))
        document.addEventListener('keyup', event => this.localState.keys.onKeyup(event))
        this.canvas.addEventListener('click', event => this.localState.mouse.onClick(event));
        this.canvas.addEventListener('mousedown', event => this.localState.mouse.onMouseDown());
        this.canvas.addEventListener('mouseup', event => this.localState.mouse.onMouseUp());

        // add entities with hitbox
        local.scene?.entities.forEach(entity => {
            if(entity.hitbox !== undefined){
                local.entitiesWithHitbox.push(entity);
            }
        })

        // create collision record
        local.entitiesWithHitbox.forEach(entity => {
            const record: CollisionState = {
                entity: entity,
                collisions: []
            };
            local.collisionRecord.push(record);
        })
    }

    // Update game state
    update(): void {
        // Update collisions & clicks
        this.checkCollisions();
        this.checkClicks();

        // Update entities state
        this.localState.scene?.entities.forEach( entity => {
            entity.behaviour.forEach( cb => {
                const run = cb.bind(entity);
                run(this.localState);
            })
        })

        // clean old data
        this.localState.mouse.resetData();
    }

    // validate collisions
    checkCollisions(): void {
        const local = this.localState;

        // collision detection with big O quadratic :c
        local.entitiesWithHitbox.forEach( entity1 => {
            const record = local.getRecord(entity1);

            local.entitiesWithHitbox.forEach( entity2 => {
                
                if(entity1 !== entity2) {
                    const hitbox1 = (<Hitbox>entity1.hitbox);
                    const hitbox2 = (<Hitbox>entity2.hitbox);
                
                    const itsIncluded = record.collisions.includes(entity2);
                    if(hitbox1.areColliding(hitbox2)){
                        if(!itsIncluded) {
                            record.collisions.push(entity2);
                        }

                    } else {
                        if(itsIncluded) {
                            const index = record.collisions.indexOf(entity2);
                            record.collisions.splice(index, 1);
                        }
                    }
                }

            })
            if(record.collisions.length > 0) {
                entity1.collide = true;
            } else {
                entity1.collide = false;
            }
        })
    }

    checkClicks(): void {
        this.localState.entitiesWithHitbox.forEach(entity => {
            const data = this.localState.mouse.isClick();
            if(data instanceof Hitbox) {
                if(entity.hitbox?.areColliding(data)) {
                    entity.click = true;
                } 
            } else {
                entity.click = false;
            }
        })
    }
}

export default GameState;