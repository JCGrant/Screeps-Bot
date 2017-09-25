'use strict';
const objectPredicates = {
  STRUCTURE_CONTAINER: {
    type: 'structure',
    structure: { structureType: STRUCTURE_CONTAINER },
  },
};

const positionContainsObject = (pos, objectName) => {
  return _.some(pos.look(), objectPredicates[objectName]);
};

const findStructuresByPriority = (creep, structureTypes, filter) => {
  const allTargets = creep.room.find(FIND_STRUCTURES, filter);
  for (const structureType of structureTypes) {
    const targets = _.filter(allTargets, { structureType });
    if (targets.length > 0) { return targets; }
  }
  return null;
};

module.exports = {
  positionContainsObject,
  findStructuresByPriority,
};
