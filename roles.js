'use strict';
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');

const roles = {
  BUILDER: {
    actions: builder.actions,
    maxNum: 4,
  },
  UPGRADER: {
    actions: upgrader.actions,
    maxNum: 4,
  },
  HARVESTER: {
    actions: harvester.actions,
    maxNum: 2,
  },
};

module.exports = roles;
