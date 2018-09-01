import { ErrorMapper } from 'utils/ErrorMapper';
import { findStructuresByPriority } from 'utils/utils';

const roles = ['repairer', 'builder', 'upgrader', 'harvester'];

const TOTALS: { [s: string]: number } = {
  harvester: 3,
  upgrader: 5,
  builder: 1,
  repairer: 4,
};

const towerHeal = (tower: StructureTower) => {
  const damagedStructures = tower.room.find(FIND_STRUCTURES, {
    filter: structure => structure.hits < structure.hitsMax,
  });
  const sortedByRelativeDamage = _.sortBy(damagedStructures, structure => {
    return structure.hits / structure.hitsMax;
  });
  const mostRelativelyDamaged = sortedByRelativeDamage[0];
  tower.repair(mostRelativelyDamaged);
};

const towerAttack = (tower: StructureTower) => {
  const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    tower.attack(closestHostile);
  }
};

const runTower = (tower: StructureTower) => {
  towerHeal(tower);
  towerAttack(tower);
};

const runHarvester = (creep: Creep) => {
  if (creep.memory.working && creep.carry.energy == 0) {
    creep.say('harvest');
    creep.memory.working = false;
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
    if (!source) {
      return;
    }
    creep.memory.sourceID = source.id;
  }
  if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
    creep.say('transfer');
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    const targets = findStructuresByPriority(
      creep,
      [STRUCTURE_SPAWN, STRUCTURE_WALL, STRUCTURE_TOWER],
      {
        filter: structure => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) &&
            structure.energy < structure.energyCapacity
          );
        },
      }
    );
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  } else {
    const source = Game.getObjectById(creep.memory.sourceID) as Source;
    if (!source) {
      return;
    }
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
};

const runUpgrader = (creep: Creep) => {
  if (creep.memory.working && creep.carry.energy == 0) {
    creep.say('harvest');
    creep.memory.working = false;
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
    if (!source) {
      return;
    }
    creep.memory.sourceID = source.id;
  }
  if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
    creep.say('upgrade');
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    if (creep.upgradeController(creep.room.controller!) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller!, {
        visualizePathStyle: { stroke: '#ffffff' },
      });
    }
  } else {
    const source = Game.getObjectById(creep.memory.sourceID) as Source;
    if (!source) {
      return;
    }
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
};

const runBuilder = (creep: Creep) => {
  if (creep.memory.working && creep.carry.energy == 0) {
    creep.say('harvest');
    creep.memory.working = false;
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
    if (!source) {
      return;
    }
    creep.memory.sourceID = source.id;
  }
  if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
    creep.say('build');
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  } else {
    const source = Game.getObjectById(creep.memory.sourceID) as Source;
    if (!source) {
      return;
    }
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
};

const runRepairer = (creep: Creep) => {
  if (creep.memory.working && creep.carry.energy == 0) {
    creep.say('harvest');
    creep.memory.working = false;
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
    if (!source) {
      return;
    }
    creep.memory.sourceID = source.id;
  }
  if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
    creep.say('repair');
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    const targets = findStructuresByPriority(
      creep,
      [STRUCTURE_ROAD, STRUCTURE_WALL],
      {
        filter: structure => structure.hits < structure.hitsMax,
      }
    );
    const targetsWithHealthAscending = targets.sort((t1, t2) => {
      if (t1.hits > t2.hits) {
        return 1;
      }
      if (t1.hits < t2.hits) {
        return -1;
      }
      return 0;
    });
    if (targets.length) {
      const target = targetsWithHealthAscending[0];
      if (creep.repair(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  } else {
    const source = Game.getObjectById(creep.memory.sourceID) as Source;
    if (!source) {
      return;
    }
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
};

const roleFunctions: { [s: string]: (c: Creep) => void } = {
  harvester: runHarvester,
  upgrader: runUpgrader,
  builder: runBuilder,
  repairer: runRepairer,
};

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  for (const key in Game.rooms) {
    const room = Game.rooms[key];
    const towers = room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_TOWER,
    }) as StructureTower[];
    towers.forEach(runTower);
  }

  roles.forEach(role => {
    const creeps_of_role = _.filter(
      Game.creeps,
      creep => creep.memory.role == role
    );
    if (creeps_of_role.length < TOTALS[role]) {
      const creep_name = `${role}-${Game.time}`;
      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], creep_name, {
        memory: {
          role,
          working: true,
          sourceID: '',
        },
      });
    }
  });

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    roleFunctions[creep.memory.role](creep);
  }
});
