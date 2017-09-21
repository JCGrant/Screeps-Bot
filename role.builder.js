'use strict';
const states = require('states');

function harvest(creep) {
  const source = creep.pos.findClosestByRange(FIND_SOURCES);
  const result = creep.harvest(source);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }

  if (creep.carry.energy == creep.carryCapacity) {
    return states.BUILDING;
  }
  return states.HARVESTING;
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
    return states.HARVESTING;
  }
  return states.BUILDING;
}

const actions = {
  [states.HARVESTING]: harvest,
  [states.BUILDING]: build,
};

const initialState = states.BUILDING;

module.exports = {
  actions,
  initialState,
};
