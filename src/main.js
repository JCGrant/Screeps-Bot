'use strict';
const creepManager = require('creepManager');

module.exports.loop = () => {
  creepManager.deleteDeadCreeps();
  creepManager.spawnNewCreeps();
  creepManager.creepsPerformRoles();
};
