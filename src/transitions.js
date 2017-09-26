'use strict';
const utils = require('utils');

const noTransition = () => {
  return (creep) => {
    return creep.memory.state;
  };
};

const ifCreepFull = (nextState) => {
  return (creep) => {
    if (creep.carry.energy == creep.carryCapacity) {
      return nextState;
    }
    return creep.memory.state;
  };
};

const ifCreepEmpty = (nextState) => {
  return (creep) => {
    if (creep.carry.energy == 0) {
      return nextState;
    }
    return creep.memory.state;
  };
};

const ifCreepHasEnergy = (nextState) => {
  return (creep) => {
    if (creep.carry.energy > 0) {
      return nextState;
    }
    return creep.memory.state;
  };
};

const ifCreepOnContainer = (nextState) => {
  return (creep) => {
    const creepOnContainer = utils.positionContainsObject(creep.pos, STRUCTURE_CONTAINER);
    if (creepOnContainer) {
      return nextState;
    }
    return creep.memory.state;
  };
};

const ifCreepInTargetRoom = (nextState) => {
  return (creep) => {
    const creepInTargetRoom = creep.room.name === creep.memory.targetRoom;
    if (creepInTargetRoom) {
      return nextState;
    }
    return creep.memory.state;
  };
};

module.exports = {
  noTransition,
  ifCreepFull,
  ifCreepEmpty,
  ifCreepHasEnergy,
  ifCreepOnContainer,
  ifCreepInTargetRoom,
};
