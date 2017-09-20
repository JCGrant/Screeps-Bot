'use strict';
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');

const roles = {
  BUILDER: {
    initialState: builder.initialState,
    run: builder.run,
    maxNum: 2,
  },
  UPGRADER: {
    initialState: upgrader.initialState,
    run: upgrader.run,
    maxNum: 2,
  },
  HARVESTER: {
    initialState: harvester.initialState,
    run: harvester.run,
    maxNum: 2,
  },
};

module.exports = roles;
