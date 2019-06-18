import { VelocityComponent } from "./helper-makr";

var EntityManager = require('tiny-ecs').EntityManager;


let ecs;


function Position() {
    this.x = 0;
    this.y = 0
}

function Velocity() {
    this.dx = 1;
    this.dy = 1
}

function Render() {
    this.view = {};
}

function History() {
    this.history = "some string";
}

class PositionSystem {

    public update() {
        var toUpdate = ecs.queryComponents([Position]);
        var a = toUpdate.length;
    }
}

let updates = {num: 0};

class VelocitySystem {

    public update() {
        var toUpdate = ecs.queryComponents([Position, Velocity]);

        for (const entity of toUpdate) {
            entity.position.x += entity.velocity.x;
            entity.position.y += entity.velocity.y;
            updates.num++;
        }
    }
}

class RenderSystem {

    public update() {
        var toUpdate = ecs.queryComponents([Position, Velocity, Render]);

        var a = toUpdate.length;
    }
}


let systems = [new PositionSystem(), new VelocitySystem(), new RenderSystem()];
export const tiny_ecs = {
    count: updates,
    name: "tiny-ecs",
    setup: () => {
        ecs = new EntityManager();

    },

    createEntities: () => {
        const e1 = ecs.createEntity().addComponent(Position);
        const e2 = ecs.createEntity().addComponent(Position).addComponent(Velocity)
        const e3 = ecs.createEntity().addComponent(Position).addComponent(Velocity).addComponent(Render)
        const e4 = ecs.createEntity().addComponent(Position).addComponent(Velocity).addComponent(Render).addComponent(History);

        return [e1, e2, e3, e4]
    },
    removeEntities: (entities: any[]) => {
        entities.forEach(entity => entity.remove())
    },
    removeVelocity: (entities: any[]) => {
        entities.forEach(entity => {
            if (entity.hasComponent(Velocity)) {
                entity.removeComponent(Velocity);
            }
        })
    },
    addVelocity: (entity) => {
        entity.addComponent(Velocity);
    },
    update: () => {
        systems.forEach(system => system.update());
    }
}
