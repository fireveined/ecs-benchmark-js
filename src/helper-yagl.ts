import ECS from 'yagl-ecs';


const Position = {
    name: 'pos',
    defaults: {x: 0, y: 0}
};

const Velocity = {
    name: 'vel',
    defaults: {dx: 1, dy: 1}
};

const Render = {
    name: 'render',
    defaults: {view: {}}
};

const History = {
    name: 'history',
    defaults: {history: "some string"}
};

class PositionSysten extends ECS.System {


    test(entity) {
        // the entity must have a position component
        return !!entity.components.pos;
    }

    update(entity) {
    }
}


class RenderSystem extends ECS.System {


    test(entity) {
        // the entity must have a position component
        return !!entity.components.pos && !!entity.components.render && !!entity.components.vel;
    }

    update(entity) {
    }
}

let updates = {num: 0};

class VelocitySystem extends ECS.System {


    test(entity) {
        // the entity must have a position component
        return !!entity.components.pos && !!entity.components.vel;
    }

    update(entity) {
        entity.components.pos.x += entity.components.vel.dx;
        entity.components.pos.y += entity.components.vel.dy;
        updates.num++;
    }
}

let ecs: ECS;
export const yagl = {
    count: updates,
    name: "yagl",
    setup: () => {
        ecs = new ECS();
        ecs.addSystem(new PositionSysten());
        ecs.addSystem(new VelocitySystem());
        ecs.addSystem(new RenderSystem());
    },

    createEntities: () => {
        const entity = new ECS.Entity(undefined, [Position]);
        const entity2 = new ECS.Entity(undefined, [Position, Velocity]);
        const entity3 = new ECS.Entity(undefined, [Position, Velocity, Render]);
        const entity4 = new ECS.Entity(undefined, [Position, Velocity, Render, History]);
        ecs.addEntity(entity);
        ecs.addEntity(entity2);
        ecs.addEntity(entity3);
        ecs.addEntity(entity4);
        return [entity, entity2, entity3, entity4]
    },

    removeEntities: (entities: []) => {
        entities.forEach(entity => ecs.removeEntity(entity))
    },
    removeVelocity: (entities: any[]) => {
        entities.forEach(entity => {
            if (entity.components["vel"]) {
                entity.removeComponent("vel");
            }
        })
    },
    addVelocity: (entity) => {
        entity.addComponent("vel");
    },
    update: () => {
        ecs.update();
    }
}
