import { ContentWrapper } from 'common/components/styledComponents'
import Header from './Header'
import UnitCard from './UnitCard'
import ExamModal from './ExamDialog'
import { IFreactalProps } from 'pages/Course'
import { injectState } from 'freactal'

import * as React from 'react'

interface IProps {
  showHeader?: boolean
  showStatus?: boolean
  userId: string
}

interface IStates {}

class CourseOverviewDump extends React.PureComponent<
  IProps & IFreactalProps,
  IStates
> {
  render() {
    const { showHeader, showStatus } = this.props
    const { unitIds, unitsById } = this.props.state.examAllUnits
    const { last_accessed_unit } = this.props.state.course
    const defaultOpen = !last_accessed_unit
    console.log(this.props.state.examAllUnits)

    return (
      <ContentWrapper>
        {showHeader && <Header showStatus={showStatus} />}
        <div style={{ marginTop: showHeader || showStatus ? '0px' : '-24px' }}>
          {unitIds.map((unitId: string, idx: number) => {
            const unit = unitsById[unitId]
            return (
              <UnitCard
                key={unit.id}
                unit={unit}
                defaultOpen={
                  (idx == 0 && defaultOpen) ||
                  unit.id == last_accessed_unit ||
                  unit.suggestedUnit
                }
              />
            )
          })}
        </div>
        <ExamModal isOpen={this.props.state.examModalOpen} />
      </ContentWrapper>
    )
  }
}

export default injectState(CourseOverviewDump)
