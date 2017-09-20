'use strict';

const roles = {
  'harvester': require('role.harvester'),
}

module.exports.loop = function () {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    roles[creep.memory.role](creep);
  }
}
