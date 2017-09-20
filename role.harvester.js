'use strict';

const states = {
  HARVESTING: 'harvesting',
  TRANSFERRING: 'transferring',
};

function harvest(creep) {
  const sources = creep.room.find(FIND_SOURCES);
  const result = creep.harvest(sources[0]);
  if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0]);
  }
  if (creep.carry.energy < creep.carryCapacity) {
    return states.HARVESTING;
  } else {
    return states.TRANSFERRING;
  }
}

function transfer(creep) {
  const result = creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(Game.spawns['Spawn1']);
  }
  if (creep.carry.energy > 0) {
    return states.TRANSFERRING;
  } else {
    return states.HARVESTING;
  }
}

const actions = {
  [states.HARVESTING]: harvest,
  [states.TRANSFERRING]: transfer,
}

function run(creep) {
  const currentState = creep.memory.state;
  const nextState = actions[currentState](creep);
  creep.memory.state = nextState;
}

module.exports = run;
