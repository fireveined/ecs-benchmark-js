// create component
import { Component, ECS, EntityViewFactory, makeComponent, System } from "perform-ecs";
import { VelocityComponent } from "./helper-makr";

@makeComponent
export class TestPositionComponent extends Component {

    public x: number;
    public y: number;

    // this method will be called on every entity
    // parameters after the first one can be used for passing some data when creating entity
    public reset(obj: this, x: number = 0, y: number = 0): void {
        obj.x = x;
        obj.y = y;
    }
}


@makeComponent
class RenderComponent extends Component {

    public view: {};

    public reset(obj: this, view: {} = {}): void {
        obj.view = view;
    }
}

@makeComponent
class HistoryComponent extends Component {

    public history: string;

    public reset(obj: this, history = "some string"): void {
        obj.history = history;
    }
}

@makeComponent
export class TestVelocityComponent extends Component {

    public dx: number;
    public dy: number;

    // this method will be called on every entity
    // parameters after the first one can be used for passing some data when creating entity
    public reset(obj: this, dx: number = 1, dy: number = 1): void {
        obj.dx = dx;
        obj.dy = dy;
    }
}

// create system
export class TestPositionSystem extends System {

    // create view which will contain all entities that have 'TestPositionComponent'
    // types are fully supported here!
    public view = EntityViewFactory.createView({
        components: [TestPositionComponent]
    });


    public update(delta: number): void {
        for (const entity of this.view.entities) {
        }
    }
}

// create system
export class TestRenderSystem extends System {

    // create view which will contain all entities that have 'TestPositionComponent'
    // types are fully supported here!
    public view = EntityViewFactory.createView({
        components: [TestPositionComponent, RenderComponent, TestVelocityComponent]
    });


    public update(delta: number): void {

    }
}

let updates = {num: 0};

// create system
export class TestVelocitySystem extends System {

    // create view which will contain all entities that have 'TestPositionComponent'
    // types are fully supported here!
    public view = EntityViewFactory.createView({
        components: [TestPositionComponent, TestVelocityComponent]
    });


    public update(delta: number): void {
        for (const entity of this.view.entities) {
            entity.x += entity.dx;
            entity.y += entity.dy;
            updates.num++;
        }
    }
}

let ecs: ECS;
export const perform_ecs = {
    count: updates,
    name: "perform-ecs",
    setup: () => {
        ecs = new ECS();
        ecs.registerSystem(new TestPositionSystem());
        ecs.registerSystem(new TestVelocitySystem());
        ecs.registerSystem(new TestRenderSystem());
    },

    createEntities: () => {
        const e1 = ecs.createEntity([{component: TestPositionComponent}]);

        const e2 = ecs.createEntity([
            {component: TestVelocityComponent},
            {component: TestPositionComponent}]);

        const e3 = ecs.createEntity([
            {component: TestVelocityComponent},
            {component: TestPositionComponent},
            {component: RenderComponent}]);

        const e4 = ecs.createEntity([
            {component: TestVelocityComponent},
            {component: TestPositionComponent},
            {component: RenderComponent},
            {component: HistoryComponent}]);

        return [e1, e2, e3, e4]
    },
    removeEntities: (entities: any[]) => {
        entities.forEach(entity => ecs.removeEntity(entity))
    },
    removeVelocity: (entities: any[]) => {
        entities.forEach(entity => {
            ecs.removeComponentsFromEntity(entity, TestVelocityComponent)
        })
    },
    addVelocity: (entity) => {
        ecs.addComponentsToEntity(entity, [{component: TestVelocityComponent}]);
    },
    update: () => {
        ecs.update(1);
    },
}
