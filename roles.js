'use strict';
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');

const roles = {
  BUILDER: {
    run: builder.run,
    maxNum: 2,
  },
  UPGRADER: {
    run: upgrader.run,
    maxNum: 2,
  },
  HARVESTER: {
    run: harvester.run,
    maxNum: 2,
  },
};

module.exports = roles;
