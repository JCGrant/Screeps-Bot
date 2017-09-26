'use strict';
const roles = require('roles');
const states = require('states');
const actions = require('actions');
const transitions = require('transitions');

const createRole = (states) => (creep) => {
  const state = states[creep.memory.state];
  state.action(creep);
  return state.transition(creep);
};

const bind = (action, transition) => ({ action, transition });

const jobs = {
  [roles.HARVESTER]: createRole({
    [states.HARVESTING]: bind(
      actions.harvest,
      transitions.ifCreepFull(states.TRANSFERRING)
    ),
    [states.TRANSFERRING]: bind(
      actions.transfer,
      transitions.ifCreepEmpty(states.HARVESTING)
    )
  }),

  [roles.UPGRADER]: createRole({
    [states.HARVESTING]: bind(
      actions.harvest,
      transitions.ifCreepFull(states.UPGRADING)
    ),
    [states.UPGRADING]: bind(
      actions.upgrade,
      transitions.ifCreepEmpty(states.HARVESTING)
    )
  }),

  [roles.BUILDER]: createRole({
    [states.HARVESTING]: bind(
      actions.harvest,
      transitions.ifCreepFull(states.BUILDING)
    ),
    [states.BUILDING]: bind(
      actions.build,
      transitions.ifCreepEmpty(states.HARVESTING)
    )
  }),

  [roles.ATTACKER]: createRole({
    [states.TRAVELLING]: bind(
      actions.travel,
      transitions.ifCreepInTargetRoom(states.ATTACKING)
    ),
    [states.ATTACKING]: bind(
      actions.attack,
      transitions.noTransition()
    )
  }),
};

const performAction = (creep) => {
  return jobs[creep.memory.role](creep);
};

module.exports = {
  performAction,
};
