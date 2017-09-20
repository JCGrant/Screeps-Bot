'use strict';

const states = {
  HARVESTING: 'harvesting',
  BUILDING: 'building',
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
    return states.BUILDING;
  }
}

function build(creep) {
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length > 0) {
    const result = creep.build(targets[0])
    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0]);
    }
  }

  if (creep.carry.energy > 0) {
    return states.BUILDING;
  } else {
    return states.HARVESTING;
  }
}

const actions = {
  [states.HARVESTING]: harvest,
  [states.BUILDING]: build,
}

function run(creep) {
  const currentState = creep.memory.state;
  const nextState = actions[currentState](creep);
  creep.memory.state = nextState;
}

module.exports = run;
