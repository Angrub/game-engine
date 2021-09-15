import Entity2D from "./entity2D"

class Scene {
    private _entities: Entity2D[];
    private _name: string;

    constructor(name: string) {
        this._name = name;
        this._entities = []
    }

    addEntity(entity: Entity2D | Entity2D[]): void {
        if(Array.isArray(entity)) {
            this._entities = this.entities.concat(entity);
            
        } else {
            this.entities.push(entity);
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