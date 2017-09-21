'use strict';
const harvester = require('role.harvester');
const upgrader = require('role.upgrader');
const builder = require('role.builder');
const miner = require('role.miner');
const lorry = require('role.lorry');

const roles = {
  BUILDER: {
    actions: builder.actions,
    body: [ WORK, CARRY, MOVE ],
  },
  UPGRADER: {
    actions: upgrader.actions,
    body: [ WORK, CARRY, MOVE ],
  },
  MINER: {
    actions: miner.actions,
    body: [ WORK, WORK, WORK, WORK, WORK, MOVE, MOVE ],
  },
  HARVESTER: {
    actions: harvester.actions,
    body: [ WORK, CARRY, MOVE ],
  },
  LORRY: {
    actions: lorry.actions,
    body: [ WORK, CARRY, CARRY, MOVE, MOVE ],
  },
};

module.exports = roles;
