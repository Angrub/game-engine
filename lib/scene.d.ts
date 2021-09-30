import Entity2D from "./entity2D";
declare class Scene {
    private _entities;
    private _name;
    constructor(name: string);
    addEntity(entity: Entity2D | Entity2D[]): void;
    deepSearch(subject: any): void;
    get entities(): Entity2D[];
    get name(): string;
}
export default Scene;
