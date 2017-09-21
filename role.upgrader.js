'use strict';
const states = require('states');

function initialise(creep) {
  creep.moveTo(creep.room.controller);

  if (creep.pos.inRangeTo(creep.room.controller, 3)) {
    return states.UPGRADING;
  }
  return states.INITIALISING;
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
    return states.UPGRADING;
  }
  return states.WITHDRAWING;
}

function upgrade(creep) {
  const result = creep.upgradeController(creep.room.controller);
  if (result  == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  }

  if (creep.carry.energy == 0) {
    return states.WITHDRAWING;
  } 
  return states.UPGRADING;
}

const actions = {
  [states.INITIALISING]: initialise,
  [states.WITHDRAWING]: withdraw,
  [states.UPGRADING]: upgrade,
};

module.exports = {
  actions,
};
