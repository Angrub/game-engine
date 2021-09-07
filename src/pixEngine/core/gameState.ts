import { Scene, Entity2D} from "..";
import { Input } from "../utils";

class GameState {
    private currentScene?: Scene;
    private entitiesWithHitbox: Entity2D[]

    constructor() {
        this.entitiesWithHitbox = [];
    }

    // Add all listeners
    loadScene(scene: Scene): void {
        this.currentScene = scene;
        
        // add listeners
        this.currentScene.entities.forEach(entity => {
            entity.inputEvents.forEach(ev => {
                const callback = ev.cb.bind(entity);
                document.addEventListener(ev.input, (event) => {
                    callback(event);
                })
                
            })
        })

        // add entities with hitbox
        this.currentScene.entities.forEach(entity => {
            if(entity.hitbox !== undefined){
                this.entitiesWithHitbox.push(entity);
            }
        })
    }

    update(): void {
        this.checkCollisions();
        this.currentScene?.entities.forEach( entity => {
            entity.behaviour.forEach( cb => {
                const callback = cb.bind(entity);
                callback();
            })
        })
    }
    checkCollisions(): void {
        this.entitiesWithHitbox.forEach( entity1 => {
            
            this.entitiesWithHitbox.forEach( entity2 => {
                
                if(entity1 !== entity2) {
                    const hitbox1 = entity1.hitbox;
                    const hitbox2 = entity2.hitbox;

                    if(hitbox1 && hitbox2) {
                        
                        if(hitbox1.areColliding(hitbox2)){
                
                            if(!entity1.entitiesThatCollided.includes(entity2)) {
                                entity1.entitiesThatCollided.push(entity2);
                                
                            }

                        } else {
                            
                            if(entity1.entitiesThatCollided.includes(entity2)) {
                                const index = entity1.entitiesThatCollided.indexOf(entity2);
                                entity1.entitiesThatCollided.splice(index, 1);
                                
                            }
                        }
                    }
                }

            })
            if(entity1.entitiesThatCollided.length > 0) {
                entity1.collide = true;
            } else {
                entity1.collide = false;
            }
        })
    }
}

export default GameState;