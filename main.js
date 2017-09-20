'use strict';

const roles = {
  'harvester': require('role.harvester'),
  'upgrader': require('role.upgrader'),
  'builder': require('role.builder'),
}

function deleteDeadCreeps() {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
        delete Memory.creeps[name];
    }
  }
}

function creepsPerformRoles() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    roles[creep.memory.role](creep);
  }
}

module.exports.loop = function () {
  deleteDeadCreeps();
  creepsPerformRoles();
}
