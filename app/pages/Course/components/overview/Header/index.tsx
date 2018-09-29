import * as React from 'react'
import {
  Wrapper,
  ChartWrapper,
  CalloutRowWrapper,
  CalloutsWrapper,
  ActionWrapper,
  BodyWrapper,
  CourseImg,
  TopWrapper,
  CourseTitle,
  CourseDetailsWrapper,
  CourseDescription,
  ActionSeparator,
  CalloutMessage,
  ActionHeader,
  UpNextWrapper,
  CalloutBtn
} from './styledComponents'
import ProgressChart from './ProgressChart'
import { injectState } from 'freactal'
import { StatusCard, IFreactalProps } from 'pages/Course'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'
// import { toUrlId } from '../../../../../common/utils/urlid'
import { RouteComponentProps, withRouter } from 'react-router'
import UpNext from './UpNext'
import { Link } from 'react-router-dom'

interface IProps {
  showStatus: boolean
}

class ProgressHeader extends React.Component<
  IProps & IFreactalProps & InjectedIntlProps & RouteComponentProps<any>,
  {}
> {
  static contextTypes = {
    viewer: React.PropTypes.object
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
          {(course.verified_cert_cost || course.delivery_methods) &&
            <CalloutsWrapper>
              {course.verified_cert_cost &&
                <Link
                  to={`/courses/${this.props.match.params
                    .courseId}/certificate`}
                >
                  <CalloutRowWrapper>
                    <CalloutMessage>
                      {formatMessage(messages.certificateCallout)}
                    </CalloutMessage>
                    <CalloutBtn>
                      {formatMessage(messages.getStartedBtn)}
                    </CalloutBtn>
                  </CalloutRowWrapper>
                </Link>}
              {!!course.delivery_methods.find(method => method === 'live') &&
                <Link to={`/courses/${this.props.match.params.courseId}/live`}>
                  <CalloutRowWrapper>
                    <CalloutMessage>
                      {formatMessage(messages.liveCourseCallout)}
                    </CalloutMessage>
                    <CalloutBtn>
                      {formatMessage(messages.signUpNowBtn)}
                    </CalloutBtn>
                  </CalloutRowWrapper>
                </Link>}
            </CalloutsWrapper>}
        </BodyWrapper>
      </Wrapper>
    )
  }
}

export default injectIntl(withRouter(injectState(ProgressHeader)))
