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
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length > 0) {
    const result = creep.build(targets[0])
    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
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
