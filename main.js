'use strict';
const roles = require('roles');

function deleteDeadCreeps() {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
        delete Memory.creeps[name];
    }
  }
}

function spawnNewCreeps() {
  for (const role in roles) {
    const roleInfo = roles[role];
    const creeps = _.filter(Game.creeps,
      (creep) => creep.memory.role == role);
    if (creeps.length < roleInfo.maxNum) {
      Game.spawns['Spawn1'].createCreep(
        [ WORK, CARRY, MOVE ],
        undefined,
        { role: role, state: roleInfo.initialState });
    }
  }
}

function creepsPerformRoles() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    roles[creep.memory.role].run(creep);
  }
}

module.exports.loop = function () {
  deleteDeadCreeps();
  spawnNewCreeps();
  creepsPerformRoles();
}
