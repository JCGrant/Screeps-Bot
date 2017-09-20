'use strict';
const states = require('states');

function harvest(creep) {
  const source = creep.pos.findClosestByRange(FIND_SOURCES);
  const result = creep.harvest(source);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }

  if (creep.carry.energy == creep.carryCapacity) {
    return states.UPGRADING;
  }
  return states.HARVESTING;
}

function upgrade(creep) {
  const result = creep.upgradeController(creep.room.controller);
  if (result  == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  }

  if (creep.carry.energy == 0) {
    return states.HARVESTING;
  } 
  return states.UPGRADING;
}

const actions = {
  [states.HARVESTING]: harvest,
  [states.UPGRADING]: upgrade,
};

function run(creep) {
  const currentState = creep.memory.state;
  const nextState = actions[currentState](creep);
  creep.memory.state = nextState;
}

module.exports = {
  initialState: states.UPGRADING,
  run,
};
