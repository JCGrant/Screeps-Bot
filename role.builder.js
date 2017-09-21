'use strict';
const states = require('states');

function initialise(creep) {
  return states.BUILDING;
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
    return states.BUILDING;
  }
  return states.WITHDRAWING;
}

function build(creep) {
  const site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  if (site !== null) {
    const result = creep.build(site)
    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(site);
    }
  }

  if (creep.carry.energy == 0) {
    return states.WITHDRAWING;
  }
  return states.BUILDING;
}

const actions = {
  [states.INITIALISING]: initialise,
  [states.WITHDRAWING]: withdraw,
  [states.BUILDING]: build,
};

module.exports = {
  actions,
};
