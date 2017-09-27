'use strict';
const creepManager = require('creepManager');

const towerHeal = (tower) => {
  const damagedStructures = tower.room.find(FIND_STRUCTURES,
    { filter: (structure) => structure.hits < structure.hitsMax });
  const sortedByRelativeDamage = _.sortBy(damagedStructures, (structure) => {
    return structure.hits / structure.hitsMax;
  });
  const mostRelativelyDamaged = sortedByRelativeDamage[0];
  tower.repair(mostRelativelyDamaged);
};

const towerAttack = (tower) => {
  const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    tower.attack(closestHostile);
  }
};

const runTower = () => {
  const tower = Game.getObjectById('59c97cc7d671737894c0da06');
  towerHeal(tower);
  towerAttack(tower);
};

global.killAllCreeps = () => {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    creep.suicide();
  }
};

global.createNewCreep = (spawn, role) => {
  creepManager.createNewCreep(spawn, role);
};

global.printCreepsInfo = () => {
  _.forOwn(Game.creeps, (creep) => {
    console.log(creep.name, creep.memory.role, creep.memory.state.currentState, creep.ticksToLive);
  });
};

module.exports.loop = () => {
  runTower();
  creepManager.deleteDeadCreeps();
  creepManager.spawnNewCreeps();
  creepManager.creepsPerformRoles();
};
