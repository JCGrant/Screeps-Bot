export const findStructuresByPriority = (
  creep: Creep,
  structureTypes: BuildableStructureConstant[],
  opts: FilterOptions<FIND_STRUCTURES>
): Structure[] => {
  const allTargets = creep.room.find(FIND_STRUCTURES, opts);
  for (const structureType of structureTypes) {
    const targets = _.filter(allTargets, { structureType });
    if (targets.length > 0) {
      return targets;
    }
  }
  return [];
};
