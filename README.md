# ECS Benchmark

It's just simple benchmark of 4 JS/TS ECS frameworks: 

 - `perform-ecs`(TS) - [https://github.com/fireveined/perform-ecs](https://github.com/fireveined/perform-ecs)
 - `yagl`(JS) - [https://github.com/yagl/ecs](https://github.com/yagl/ecs)
 - `tiny-ecs` (JS) - [https://github.com/bvalosek/tiny-ecs](https://github.com/bvalosek/tiny-ecs)
 - `makr`(JS) - [https://github.com/makrjs/makr](https://github.com/makrjs/makr)

## Scenarios

I tried to create life-like scenarios:
1. Repeatedly create entities and update systems 
2. Repeatedly create/delete entities and update systems 
3. Repeatedly create/delete entities, remove components from them and update systems

Each scenario operates on 4000 entities, 4 components and 3 systems.

## Results
|  | perform-ecs | yagl | tiny-ecs | makr 
|--|--|--|--|--|
| Scenario 1 |     **43ms**   |  242ms | 64ms | 208ms
| Scenario 2 |     **27ms**   | 142ms | 98ms | 109ms
| Scenario 3 |     **23ms**   | 184ms | 80ms | 79ms

## How to run

Clone and: 
`npm i && npm start`

If you have idea for new framework to add feel free to create issue.
