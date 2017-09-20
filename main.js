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
        { role }
      );
    }
  }
}

function performRole(creep) {
  const role = roles[creep.memory.role];
  let currentState = creep.memory.state;
  if (!role.actions.hasOwnProperty(currentState)) {
    currentState = role.initialState;
  }
  const nextState = role.actions[currentState](creep);
  creep.memory.state = nextState;
}

function creepsPerformRoles() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    performRole(creep);
  }
}

module.exports.loop = function () {
  deleteDeadCreeps();
  spawnNewCreeps();
  creepsPerformRoles();
};
