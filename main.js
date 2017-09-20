'use strict';
const roles = require('roles');

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
    roles[creep.memory.role].run(creep);
  }
}

module.exports.loop = function () {
  deleteDeadCreeps();
  creepsPerformRoles();
}
