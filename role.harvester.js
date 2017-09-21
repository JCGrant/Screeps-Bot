'use strict';
const states = require('states');

function initialise(creep) {
  return states.HARVESTING;
}

function harvest(creep) {
  const source = creep.pos.findClosestByRange(FIND_SOURCES);
  const result = creep.harvest(source);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
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
  [states.INITIALISING]: initialise,
  [states.HARVESTING]: harvest,
  [states.TRANSFERRING]: transfer,
};

module.exports = {
  actions,
};
