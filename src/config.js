'use strict';
module.exports = {
  maxNum: {
    'harvester': 5,
    'upgrader': 5,
  },
  body: {
    'harvester': [ WORK, CARRY, MOVE, MOVE ],
    'upgrader': [ WORK, WORK, CARRY, MOVE ],
  },
  memory: {
    'harvester': {
      'role': 'harvester',
      'state': 'harvesting',
      'sourceId': '59bbc48b2052a716c3ce81ab',
      'targetId': '59c82ff363e5512ce3c99339',
    },
    'upgrader': {
      'role': 'upgrader',
      'state': 'upgrading',
      'sourceId': '59bbc48b2052a716c3ce81ad',
    }
  }
};
