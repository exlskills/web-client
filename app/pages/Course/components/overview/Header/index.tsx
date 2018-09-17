import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  Wrapper,
  ChartWrapper,
  ActionWrapper,
  BodyWrapper,
  CourseImg,
  TopWrapper,
  CourseTitle,
  CourseDetailsWrapper,
  CourseDescription,
  ActionSeparator,
  ActionHeader,
  UpNextWrapper
} from './styledComponents'
import ProgressChart from './ProgressChart'
import { injectState } from 'freactal'
import { StatusCard, IFreactalProps } from 'pages/Course'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import messages from './messages'
// import { toUrlId } from '../../../../../common/utils/urlid'
import { RouteComponentProps, withRouter } from 'react-router'
import UpNext from './UpNext'

interface IProps {
  showStatus: boolean
}

class ProgressHeader extends React.Component<
  IProps & IFreactalProps & InjectedIntlProps & RouteComponentProps<any>,
  {}
> {
  static contextTypes = {
    viewer: PropTypes.object
  }
  context: any

  render() {
    const { showStatus } = this.props
    const { course, examAllUnits } = this.props.state
    const units = examAllUnits.unitsById
    const userFirstName = this.context.viewer.first_name
    const { formatMessage } = this.props.intl

    let summary = { pSum: 0, aSum: 0 }

    examAllUnits.unitIds.forEach(id => {
      summary.pSum += units[id].ema
      summary.aSum += units[id].grade
    })
    const data = [
      {
        name: course.title,
        predicted: Math.round(summary.pSum / examAllUnits.unitIds.length),
        actual: Math.round(summary.aSum / examAllUnits.unitIds.length),
        fill: `rgba(136, 132, 216, 1)`,
        display: undefined as any
      }
    ]
    // data[0].predicted = 0

    // const data = examAllUnits.unitIds.map((id, idx) => ({
    //   name: units[id].title,
    //   predicted: units[id].ema,
    //   actual: units[id].grade,
    //   fill: `rgba(136, 132, 216, ${1-(((idx+1)/examAllUnits.unitIds.length)/1.4)})`,
    //   display: undefined
    // }))

    const started = !!course.last_accessed_unit
    // const upNext =

    return (
      <Wrapper>
        <TopWrapper>
          <CourseImg src={course.logo_url} />
          <CourseDetailsWrapper>
            <CourseTitle>
              {course.title}
            </CourseTitle>
            <CourseDescription>
              {course.description}
            </CourseDescription>
          </CourseDetailsWrapper>
          {showStatus && <StatusCard />}
        </TopWrapper>
        <BodyWrapper>
          <ActionWrapper style={{ height: '326px' }}>
            <ActionHeader>
              {formatMessage(messages.lbUpNextHeader)}
              <UpNextWrapper>
                <UpNext />
              </UpNextWrapper>
            </ActionHeader>
          </ActionWrapper>
          <ActionSeparator />
          <ActionWrapper>
            <ActionHeader>
              {formatMessage(messages.lbProgressOverviewHeader)}
            </ActionHeader>
            <ChartWrapper>
              <ProgressChart
                data={data}
                width={'100%'}
                height={260}
                innerRadius={100}
                outerRadius={160}
                startAngle={-135}
                endAngle={-405}
              />
            </ChartWrapper>
          </ActionWrapper>
        </BodyWrapper>
      </Wrapper>
    )
  }
}

export default injectIntl(withRouter(injectState(ProgressHeader)))
