'use strict';
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');

const roles = {
  BUILDER: {
    actions: builder.actions,
    body: [ WORK, CARRY, MOVE ],
  },
  UPGRADER: {
    actions: upgrader.actions,
    body: [ WORK, CARRY, MOVE ],
  },
  HARVESTER: {
    actions: harvester.actions,
    body: [ WORK, CARRY, MOVE ],
  },
};

module.exports = roles;
