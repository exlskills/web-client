import * as React from 'react'
import { injectState, update, provideState } from 'freactal'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { RouteComponentProps, withRouter } from 'react-router'
import { SchemaType, fromUrlId } from 'common/utils/urlid'

import CourseLiveDump from './CourseLiveDump'
import { IFreactalProps } from 'pages/Course'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { handleQueryRender } from 'common/utils/relay'
import * as moment from 'moment-timezone'
import {
  LIVE_COURSE_SCHEDULE_MOMENT_PARSE_FMT,
  LIVE_COURSE_SCHEDULE_MOMENT_OUT_FMT
} from 'common/constants'

interface IProps {}

type MergedProps = IProps &
  IFreactalProps &
  InjectedIntlProps &
  RouteComponentProps<{ courseId: string; unitId: string }>

const rootQuery = graphql`
  query liveDeliveryScheduleQuery(
    $course_id: String,
    $date_on_or_after: DateTime
  ) {
    courseById(course_id: $course_id) {
      id
      title
      headline
      description
      logo_url
      info_md
      verified_cert_cost
    }
    courseDeliverySchedule(
      course_id: $course_id,
      date_on_or_after: $date_on_or_after
    ) {
      _id
      delivery_structure
      delivery_methods
      course_notes
      course_duration {
        months
        weeks
        days
        hours
        minutes
      }
      session_info {
        session_seq
        headline
        desc
        session_notes
      }
      scheduled_runs {
        _id
        offered_at_price {
          amount
        }
        seat_purchased
        run_start_date
        run_sessions {
          _id
          session_seq
          session_duration {
            months
            weeks
            days
            hours
            minutes
          }
          session_start_date
          session_run_notes
          instructors {
            username
            full_name
            headline
            biography
            avatar_url
          }
        }
      }
    }
  }
`

class CourseLive extends React.Component<MergedProps, {}> {
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  componentDidMount() {
    // const courseId = fromUrlId(
    //   SchemaType.Course,
    //   this.props.match.params.courseId
    // )
    //
    // wsclient.sendEvent(WS_EVENTS.courseUserView, {
    //   cour_id: courseId,
    //   user_id: this.context.viewer.user_id
    // })
  }

  getCourseId() {
    return fromUrlId(SchemaType.Course, this.props.match.params.courseId)
  }

  queryRender = handleQueryRender(({ props }: { props: any }) => {
    // This is to get a deep copy
    let sched = JSON.parse(JSON.stringify(props.courseDeliverySchedule))
    sched.instructors = {} as any
    sched.session_info.sort((a: any, b: any) => a.session_seq - b.session_seq)
    const sessions = sched.session_info.map((item: any) => {
      return {
        headline: item.headline,
        desc: item.desc,
        session_notes: item.session_notes
      }
    })
    for (let run of sched.scheduled_runs) {
      run.run_start_date = moment(
        run.run_start_date,
        LIVE_COURSE_SCHEDULE_MOMENT_PARSE_FMT
      ).format('LL')
      run.run_sessions.sort((a: any, b: any) => a.session_seq - b.session_seq)
      for (let rInd = 0; rInd < run.run_sessions.length; rInd++) {
        run.run_sessions[rInd].headline = sessions[rInd].headline
        run.run_sessions[rInd].desc = sessions[rInd].desc
        run.run_sessions[rInd].session_notes = sessions[rInd].session_notes
        run.run_sessions[rInd].session_duration_hrs = moment
          .duration(run.run_sessions[rInd].session_duration)
          .asHours()
        run.run_sessions[rInd].session_start_date = `${moment(
          run.run_sessions[rInd].session_start_date,
          LIVE_COURSE_SCHEDULE_MOMENT_PARSE_FMT
        ).format('LLLL')} ${moment()
          .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
          .format('z')}`
        for (let inst of run.run_sessions[rInd].instructors) {
          sched.instructors[inst.username] = inst
        }
      }
    }
    return <CourseLiveDump course={props.courseById} schedule={sched} />
  })

  render() {
    this.props.match.params
    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          course_id: this.getCourseId(),
          date_on_or_after: moment().format(LIVE_COURSE_SCHEDULE_MOMENT_OUT_FMT)
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default injectIntl<IProps>(injectState(withRouter(CourseLive)))
