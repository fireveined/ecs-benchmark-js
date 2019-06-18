import { yagl } from "./helper-yagl";
import { perform_ecs, TestPositionSystem, TestVelocitySystem } from "./helper-perform-ecs";
import { ECS } from "perform-ecs";
import { tiny_ecs } from "./helper-tiny-ecs";
import { makr_test } from "./helper-makr";

var Benchmark = require('benchmark');

const {
    performance
} = require('perf_hooks');

const creation = new Benchmark.Suite("creation");
const CREATION_COUNT = 1000;


const test = {
    fn: () => {
        var performECS = new ECS();
        performECS.registerSystem(new TestPositionSystem());
        performECS.registerSystem(new TestVelocitySystem());

        const start = performance.now();
        for (let i = 0; i < CREATION_COUNT; i++) {


            performECS.update(1);
        }


        const end = performance.now();
        return end - start;
    }
}

function createAddUpdateTest(test) {
    return {
        updates: test.count,
        name: test.name,
        fn: () => {
            test.setup();

            const start = performance.now();
            for (let i = 0; i < CREATION_COUNT; i++) {
                test.createEntities();
                test.update();
                test.update();
                test.update();
            }

            const end = performance.now();
            return end - start;
        }
    }
}


function createAddUpdateDestroyTest(test) {
    return {
        updates: test.count,
        name: test.name,
        fn: () => {
            test.setup();

            const all = [];
            const start = performance.now();
            for (let i = 0; i < CREATION_COUNT; i++) {
                const entities = test.createEntities();
                all.push(...entities);
                test.update();
                test.update();
                test.update();
                test.removeEntities([all[i], all[i * 2 + 1]]);
                all.splice(i * 2 + 1, 1);
                all.splice(i, 1);
            }

            const end = performance.now();
            return end - start;
        }
    }
}

function createAddUpdateDestroyRemoveTest(test) {
    return {
        name: test.name,
        updates: test.count,
        fn: () => {
            test.setup();

            const all = [];
            const start = performance.now();
            for (let i = 0; i < CREATION_COUNT; i++) {
                const entities = test.createEntities();
                all.push(...entities);
                test.update();
                test.update();
                test.update();
                test.removeEntities([all[i], all[i * 2 + 1]]);
                all.splice(i * 2 + 1, 1);
                all.splice(i, 1);
                test.removeVelocity([all[i + 1], all[i * 2]]);
            }

            const end = performance.now();
            return end - start;
        }
    }
}

function createAddUpdateDestroyCreateTest(test) {
    return {
        name: test.name,
        updates: test.count,
        fn: () => {
            test.setup();

            const all = [];
            const start = performance.now();
            for (let i = 0; i < CREATION_COUNT; i++) {
                const entities = test.createEntities();
                all.push(...entities);
                test.update();
                test.update();

                test.update();
                test.addVelocity(entities[0]);
                test.removeEntities([all[i], all[i * 2 + 1]]);
                all.splice(i * 2 + 1, 1);
                all.splice(i, 1);

            }

            const end = performance.now();
            return end - start;
        }
    }
}


const TEST_COUNT = 5;


function runTest(test: { fn: () => number, name: string, updates: any }) {
    let total = 0;
    for (let i = 0; i < TEST_COUNT; i++) {
        total += test.fn();
    }

    const avg = total / TEST_COUNT;
    console.log(test.name + ": " + Math.round(total / TEST_COUNT) + "ms avg (" + test.updates.num + " updates)");

}

console.log("Create and update");
runTest(createAddUpdateTest(perform_ecs));
runTest(createAddUpdateTest(yagl));
runTest(createAddUpdateTest(tiny_ecs));
runTest(createAddUpdateTest(makr_test));

console.log("\nCreate, update and destroy");
runTest(createAddUpdateDestroyTest(perform_ecs));
runTest(createAddUpdateDestroyTest(yagl));
runTest(createAddUpdateDestroyTest(tiny_ecs));
runTest(createAddUpdateDestroyTest(makr_test));

console.log("\nCreate, update, destroy and remove components");
runTest(createAddUpdateDestroyRemoveTest(perform_ecs));
runTest(createAddUpdateDestroyRemoveTest(yagl));
runTest(createAddUpdateDestroyRemoveTest(tiny_ecs));
runTest(createAddUpdateDestroyRemoveTest(makr_test));


console.log("\nCreate, update, destroy and add components");
runTest(createAddUpdateDestroyCreateTest(perform_ecs));
runTest(createAddUpdateDestroyCreateTest(yagl));
runTest(createAddUpdateDestroyCreateTest(tiny_ecs));
runTest(createAddUpdateDestroyCreateTest(makr_test));