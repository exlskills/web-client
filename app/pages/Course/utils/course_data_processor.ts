import * as _ from 'lodash'

export const processCourseData = (input: {
  unitIds: string[]
  unitsById: any
}) => {
  let d = _.cloneDeep(input)
  let completedUnits = 0
  let markedSuggestedUnit = false
  for (let i = 0; i < d.unitIds.length; i++) {
    const curUnitId = d.unitIds[i]
    const unitComplete = d.unitsById[curUnitId].unit_progress_state === 1
    if (unitComplete) {
      completedUnits++
      d.unitsById[curUnitId].suggestedUnit = false
    } else if (!markedSuggestedUnit) {
      markedSuggestedUnit = true
      d.unitsById[curUnitId].suggestedUnit = true
    } else {
      d.unitsById[curUnitId].suggestedUnit = false
    }
    let allSectionsProficient = true
    let markedCurrentSection = false
    for (let s = 0; s < d.unitsById[curUnitId].sections_list.length; s++) {
      if (d.unitsById[curUnitId].sections_list[s].ema > 80) {
        d.unitsById[curUnitId].sections_list[s].proficient = true
      } else {
        d.unitsById[curUnitId].sections_list[s].proficient = false
        allSectionsProficient = false
      }
      if (
        d.unitsById[curUnitId].sections_list[s].ema > 0 &&
        !d.unitsById[curUnitId].sections_list[s].proficient &&
        !markedCurrentSection
      ) {
        d.unitsById[curUnitId].sections_list[s].current = true
        markedCurrentSection = true
      } else {
        d.unitsById[curUnitId].sections_list[s].current = false
      }
      if (s === d.unitsById[curUnitId].sections_list.length - 1) {
        if (!allSectionsProficient && !markedCurrentSection) {
          d.unitsById[curUnitId].sections_list[0].current = true
        }
      }
    }
    if (allSectionsProficient && !unitComplete) {
      d.unitsById[curUnitId].examIsNextStep = true
    } else {
      d.unitsById[curUnitId].examIsNextStep = false
    }
  }
  return {
    unitIds: d.unitIds,
    unitsById: d.unitsById,
    courseComplete: completedUnits === d.unitIds.length
  }
}
