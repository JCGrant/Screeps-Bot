'use strict';
const roles = require('roles');
const states = require('states');

function deleteDeadCreeps() {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }
}

function spawnNewCreeps() {
  for (const role in roles) {
    const creeps = _.filter(Game.creeps,
      (creep) => creep.memory.role == role);
    if (creeps.length < Memory.config.maxNum[role]) {
      Game.spawns['Spawn1'].createCreep(
        roles[role].body,
        undefined,
        { role, state: states.INITIALISING }
      );
    }
  }
}

function performRole(creep) {
  const role = roles[creep.memory.role];
  let currentState = creep.memory.state;
  if (!role.actions.hasOwnProperty(currentState)) {
    currentState = states.INITIALISING;
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

function killAllCreeps() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    creep.suicide();
  }
}

module.exports.loop = function () {
  deleteDeadCreeps();
  spawnNewCreeps();
  creepsPerformRoles();
};
