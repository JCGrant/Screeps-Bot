'use strict';
const utils = require('utils');

const harvest = (creep) => {
  const target = Game.getObjectById(creep.memory.sourceId);
  const result = creep.harvest(target);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
};

const withdraw = (creep) => {
  const target = Game.getObjectById(creep.memory.sourceId);
  const result = creep.withdraw(target, RESOURCE_ENERGY, creep.memory.withdrawAmount);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
};

const gather = (creep) => {
  const target = Game.getObjectById(creep.memory.sourceId);
  const result = creep.pickup(target);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
};

const upgrade = (creep) => {
  const target = creep.room.controller;
  const result = creep.upgradeController(target);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller);
  }
};

const build = (creep) => {
  const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  const result = creep.build(target);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
};

const strcuturesByPriority = [
  STRUCTURE_SPAWN,
  STRUCTURE_EXTENSION,
  STRUCTURE_TOWER,
];

const transfer = (creep) => {
  const specifiedTarget = Game.getObjectById(creep.memory.targetId);
  let target;
  if (specifiedTarget) {
    target = specifiedTarget;
  } else {
    const targets = utils.findStructuresByPriority(creep, strcuturesByPriority,
      { filter: (structure) => structure.energy < structure.energyCapacity });
    target = creep.pos.findClosestByPath(targets);
  }
  const result = creep.transfer(target, RESOURCE_ENERGY);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
};

module.exports = {
  harvest,
  withdraw,
  gather,
  upgrade,
  build,
  transfer,
};
