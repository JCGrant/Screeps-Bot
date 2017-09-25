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
  const target = Game.getObjectById(creep.memory.targetId);
  const result = creep.build(target);
  if (result == ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
};

const transfer = (creep) => {
  const target = Game.getObjectById(creep.memory.targetId);
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
