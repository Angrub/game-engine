import { Scene } from "..";
import { Hitbox } from "../utils";
import { LocalState, CollisionState } from "../dataObjects";


class GameState {
    private localState: LocalState;

    constructor() {
        this.localState = new LocalState();
    }

    // Add all listeners
    loadScene(scene: Scene): void {
        this.localState.scene = scene;
        const local = this.localState;
        
        // add listeners
        document.addEventListener('keydown', event => this.localState.keys.onKeydown(event))
        document.addEventListener('keyup', event => this.localState.keys.onKeyup(event))

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
        // Update collisions
        this.checkCollisions();

        // Update entities state
        this.localState.scene?.entities.forEach( entity => {
            entity.behaviour.forEach( cb => {
                const run = cb.bind(entity);
                run(this.localState);
            })
        })
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
}

export default GameState;