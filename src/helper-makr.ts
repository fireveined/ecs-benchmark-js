import makr from "makr"

export class PositionComponent {

    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}


class RenderComponent {

    public view: {};

    constructor(view: {} = {}) {
        this.view = {};
    }
}

class HistoryComponent {

    public history: string;

    constructor(history = "some history") {
        this.history = history;
    }
}

export class VelocityComponent {

    public dx: number;
    public dy: number;

    constructor(x: number = 1, y: number = 1) {
        this.dx = x;
        this.dy = y;
    }
}

let ecs;

function positionSystem() {
    ecs.query(PositionComponent)
}

let updates = {num: 0};

function velocitySystem() {
    for (let entity of ecs.query(PositionComponent, VelocityComponent)) {
        const pos = entity.get(PositionComponent)
        const vel = entity.get(VelocityComponent)
        pos.x += vel.x;
        pos.y += vel.y;
        updates.num++;
    }
}

function renderingSystem() {
    ecs.query(PositionComponent, VelocityComponent, RenderComponent);
}


export const makr_test = {
    count: updates,
    name: "makr",
    setup: () => {
        ecs = makr(PositionComponent, VelocityComponent, RenderComponent, HistoryComponent)
    },

    createEntities: () => {
        const e1 = ecs.create();
        e1.add(new PositionComponent());

        const e2 = ecs.create();
        e2.add(new PositionComponent());
        e2.add(new VelocityComponent());

        const e3 = ecs.create();
        e3.add(new PositionComponent())
        e3.add(new VelocityComponent());
        e3.add(new RenderComponent());

        const e4 = ecs.create();
        e4.add(new PositionComponent());
        e4.add(new VelocityComponent());
        e4.add(new RenderComponent());
        e4.add(new HistoryComponent());

        return [e1, e2, e3, e4]
    },
    removeEntities: (entities: any[]) => {
        entities.forEach(entity => entity.destroy())
    },
    removeVelocity: (entities: any[]) => {
        entities.forEach(entity => {
            if (entity.has(VelocityComponent)) {
                entity.remove(VelocityComponent);
            }
        })
    },
    addVelocity: (entity) => {
        entity.add(new VelocityComponent());
    },
    update: () => {
        renderingSystem();
        velocitySystem();
        positionSystem();
    }
}
