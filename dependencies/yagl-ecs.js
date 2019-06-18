'use strict';

const ECS = require('yagl-+ecs');

function noop() {}

module.exports = {
    // Components
    Position:   { name: 'Position' },
    Motion:     { name: 'Motion' },
    Display:    { name: 'Display' },
    Body:       { name: 'Body' },

    // Systems
    MovementSystem: (function() {
        function MovementSystem() {
            ECS.System.call(this);
        }

        MovementSystem.prototype = Object.create(ECS.System.prototype);
        MovementSystem.prototype.constructor = MovementSystem;

        MovementSystem.prototype.test = function (entity) {
            return entity.components.Position && entity.components.Motion;
        };

        return MovementSystem;
    })(),

    CollisionSystem: (function() {
        function CollisionSystem() {
            ECS.System.call(this);
        }

        CollisionSystem.prototype = Object.create(ECS.System.prototype);
        CollisionSystem.prototype.constructor = CollisionSystem;

        CollisionSystem.prototype.test = function (entity) {
            return entity.components.Position && entity.components.Motion && entity.components.Body;
        };

        return CollisionSystem;
    })(),

    RenderingSystem: (function() {
        function RenderingSystem() {
            ECS.System.call(this);
        }

        RenderingSystem.prototype = Object.create(ECS.System.prototype);
        RenderingSystem.prototype.constructor = RenderingSystem;

        RenderingSystem.prototype.test = function (entity) {
            return entity.components.Position && entity.components.Display;
        };

        return RenderingSystem;
    })()
};
