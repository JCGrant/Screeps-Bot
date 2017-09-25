const objectPredicates = {
  STRUCTURE_CONTAINER: {
    type: 'structure',
    structure: { structureType: STRUCTURE_CONTAINER },
  },
};

const positionContainsObject = (pos, objectName) => {
  return _.some(pos.look(), objectPredicates[objectName]);
};

module.exports = {
  positionContainsObject,
};
