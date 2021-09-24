import Entity2D from "./entity2D"

class Scene {
    private _entities: Entity2D[];
    private _name: string;

    constructor(name: string) {
        this._name = name;
        this._entities = []
    }

    addEntity(entity: Entity2D | Entity2D[]): void {
        this.deepSearch(entity);
    }

    deepSearch(subject: any): void {
        const isArray = Array.isArray(subject);
        const isEntity = subject instanceof Entity2D;
        let key: any;
        
        if(!isEntity && !isArray) {
            return undefined;
        } else if(isEntity) {
            this._entities.push(subject);
        }

        for(key in subject) {
            
            this.deepSearch(subject[key]);
        }
    }

    get entities(): Entity2D[] {
        return this._entities;
    }

    get name(): string {
        return this._name;
    }
}

export default Scene;