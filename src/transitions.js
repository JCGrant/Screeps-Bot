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
      return Object.assign(creep.memory.state, nextState);
    }
    return creep.memory.state;
  };
};

const ifCreepEmpty = (nextState) => {
  return (creep) => {
    if (creep.carry.energy == 0) {
      return Object.assign(creep.memory.state, nextState);
    }
    return creep.memory.state;
  };
};

const ifCreepHasEnergy = (nextState) => {
  return (creep) => {
    if (creep.carry.energy > 0) {
      return Object.assign(creep.memory.state, nextState);
    }
    return creep.memory.state;
  };
};

const ifCreepOnContainer = (nextState) => {
  return (creep) => {
    const creepOnContainer = utils.positionContainsObject(creep.pos, STRUCTURE_CONTAINER);
    if (creepOnContainer) {
      return Object.assign(creep.memory.state, nextState);
    }
    return creep.memory.state;
  };
};

const ifCreepInTargetRoom = (nextState) => {
  return (creep) => {
    const creepInTargetRoom = creep.room.name === creep.memory.state.targetRoom;
    if (creepInTargetRoom) {
      return Object.assign(creep.memory.state, nextState);
    }
    return creep.memory.state;
  };
};

const ifCreepInHomeRoom = (nextState) => {
  return (creep) => {
    const creepInHomeRoom = creep.room.name === creep.memory.state.homeRoom;
    if (creepInHomeRoom) {
      return Object.assign(creep.memory.state, nextState);
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
  ifCreepInHomeRoom,
};
