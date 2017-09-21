'use strict';
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');

const roles = {
  BUILDER: {
    actions: builder.actions,
  },
  UPGRADER: {
    actions: upgrader.actions,
  },
  HARVESTER: {
    actions: harvester.actions,
  },
};

module.exports = roles;
