'use strict';
const states = require('states');

function initialise(creep) {
  return states.WITHDRAWING;
}

function isWithdrawable(structure) {
  return structure.structureType == STRUCTURE_CONTAINER &&
    structure.store[RESOURCE_ENERGY] > 0;
}

function withdraw(creep) {
  const container = creep.pos.findClosestByRange(FIND_STRUCTURES,
    { filter: isWithdrawable });
  const result = creep.withdraw(container, RESOURCE_ENERGY);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(container);
  }

  if (creep.carry.energy == creep.carryCapacity) {
    return states.TRANSFERRING;
  }
  return states.WITHDRAWING;
}

function isStorable(structure) {
  return (
    structure.structureType == STRUCTURE_SPAWN ||
    structure.structureType == STRUCTURE_EXTENSION ||
    structure.structureType == STRUCTURE_TOWER
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
    return states.WITHDRAWING;
  }
  return states.TRANSFERRING
}

const actions = {
  [states.INITIALISING]: initialise,
  [states.WITHDRAWING]: withdraw,
  [states.TRANSFERRING]: transfer,
};

module.exports = {
  actions,
};
