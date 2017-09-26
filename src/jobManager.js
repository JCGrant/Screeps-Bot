'use strict';
const roles = require('roles');
const states = require('states');
const actions = require('actions');
const transitions = require('transitions');

const createJob = (states) => (creep) => {
  const state = states[creep.memory.state.currentState];
  state.action(creep);
  return state.transition(creep);
};

const bind = (action, transition) => ({ action, transition });

const jobs = {
  [roles.HARVESTER]: createJob({
    [states.HARVESTING]: bind(
      actions.harvest,
      transitions.ifCreepFull({
        'currentState': states.TRANSFERRING,
      })
    ),
    [states.TRANSFERRING]: bind(
      actions.transfer,
      transitions.ifCreepEmpty({
        'currentState': states.HARVESTING,
      })
    )
  }),

  [roles.UPGRADER]: createJob({
    [states.HARVESTING]: bind(
      actions.harvest,
      transitions.ifCreepFull({
        'currentState': states.UPGRADING,
      })
    ),
    [states.UPGRADING]: bind(
      actions.upgrade,
      transitions.ifCreepEmpty({
        'currentState': states.HARVESTING,
      })
    )
  }),

  [roles.BUILDER]: createJob({
    [states.HARVESTING]: bind(
      actions.harvest,
      transitions.ifCreepFull({
        'currentState': states.BUILDING,
      })
    ),
    [states.BUILDING]: bind(
      actions.build,
      transitions.ifCreepEmpty({
        'currentState': states.HARVESTING,
      })
    )
  }),

  [roles.ATTACKER]: createJob({
    [states.TRAVELLING]: bind(
      actions.travel,
      transitions.ifCreepInTargetRoom({
        'currentState': states.ATTACKING,
      })
    ),
    [states.ATTACKING]: bind(
      actions.attack,
      transitions.noTransition()
    )
  }),
};

const performJob = (creep) => {
  const job = jobs[creep.memory.role];
  return job(creep);
};

module.exports = {
  performJob,
};
