'use strict';
const config = require('config');
const roles = require('roles');
const jobManager = require('jobManager');

const deleteDeadCreeps = () => {
  _.forOwn(Memory.creeps, (creep, name) => {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  });
};

const createNewCreep = (spawn, role) => {
  spawn.createCreep(
    config.body[role],
    undefined,
    config.memory[role]
  );
};

const spawnNewCreeps = () => {
  _.forOwn(roles, (role) => {
    const creeps = _.filter(Game.creeps,
      (creep) => creep.memory.role == role);
    if (creeps.length < config.maxNum[role]) {
      createNewCreep(Game.spawns['Spawn1'], role);
    }
  });
};

const performRole = (creep) => {
  creep.memory.state = jobManager.performJob(creep);
};

const creepsPerformRoles = () => {
  _.forOwn(Game.creeps, (creep) => {
    performRole(creep);
  });
};

module.exports = {
  deleteDeadCreeps,
  spawnNewCreeps,
  creepsPerformRoles,
};
