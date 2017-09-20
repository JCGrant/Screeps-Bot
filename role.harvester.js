'use strict';
const states = require('states');

function harvest(creep) {
  const sources = creep.room.find(FIND_SOURCES);
  const result = creep.harvest(sources[1]);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[1]);
  }

  if (creep.carry.energy == creep.carryCapacity) {
    return states.TRANSFERRING;
  }
  return states.HARVESTING;
}

function isStorable(structure) {
  return (
    structure.structureType == STRUCTURE_SPAWN ||
    structure.structureType == STRUCTURE_EXTENSION
  ) && structure.energy < structure.energyCapacity;
}

function transfer(creep) {
  const targets = creep.room.find(FIND_STRUCTURES, { filter: isStorable });
  if (targets.length > 0) {
    const result = creep.transfer(targets[0], RESOURCE_ENERGY);
    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  }

  if (creep.carry.energy == 0) {
    return states.HARVESTING;
  }
  return states.TRANSFERRING
}

const actions = {
  [states.HARVESTING]: harvest,
  [states.TRANSFERRING]: transfer,
};

function run(creep) {
  const currentState = creep.memory.state;
  const nextState = actions[currentState](creep);
  creep.memory.state = nextState;
}

module.exports = {
  initialState: states.HARVESTING,
  run,
};
