'use strict';
const states = require('states');

function positionContainsObject(pos, predicate) {
  return _.some(pos.look(), predicate);
}

function containerIsAvailable(structure) {
  const creepInWay = positionContainsObject(structure.pos, { type: 'creep' });
  return structure.structureType == STRUCTURE_CONTAINER && !creepInWay;
}

function initialise(creep) {
  const container = creep.pos.findClosestByRange(FIND_STRUCTURES,
    { filter: containerIsAvailable });
  if (container !== null) {
    creep.moveTo(container);
  }

  const creepOnContainer = positionContainsObject(
    creep.pos, {
      type: 'structure',
      structure: { structureType: STRUCTURE_CONTAINER },
    });
  if (creepOnContainer) {
    return states.HARVESTING;
  }
  return states.INITIALISING;
}

function harvest(creep) {
  const source = creep.pos.findClosestByRange(FIND_SOURCES);
  const result = creep.harvest(source);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }

  return states.HARVESTING;
}

const actions = {
  [states.INITIALISING]: initialise,
  [states.HARVESTING]: harvest,
};

module.exports = {
  actions,
};
