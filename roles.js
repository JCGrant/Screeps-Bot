'use strict';
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');

const roles = {
  BUILDER: {
    actions: builder.actions,
    initialState: builder.initialState,
    maxNum: 2,
  },
  UPGRADER: {
    actions: upgrader.actions,
    initialState: upgrader.initialState,
    maxNum: 2,
  },
  HARVESTER: {
    actions: harvester.actions,
    initialState: harvester.initialState,
    maxNum: 2,
  },
};

module.exports = roles;
