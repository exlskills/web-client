import * as React from 'react'
import Loading from 'common/components/Loading'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
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
import moment from 'moment'

interface IProps {}

type Mergedprops = IProps &
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
      logo_url
      info_md
      verified_cert_cost
    }
    courseDeliverySchedule(
      course_id: $course_id,
      date_on_or_after: $date_on_or_after
    ) {
      delivery_structure
      delivery_methods
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
      }
      scheduled_runs {
        run_start_date
        run_sessions {
          session_seq
          session_duration {
            months
            weeks
            days
            hours
            minutes
          }
          session_start_date
          instructors {
            username
            full_name
          }
        }
      }
    }
  }
`

class CourseLive extends React.Component<Mergedprops, {}> {
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
    const {
      id,
      title,
      description,
      headline,
      info_md,
      logo_url,
      verified_cert_cost
    } = props.courseById
    return (
      <CourseLiveDump
        title={title}
        description={description}
        logoUrl={logo_url}
        infoMarkdown={info_md}
        verifiedCertCost={verified_cert_cost}
      />
    )
  })

  render() {
    const courseId = fromUrlId(
      SchemaType.Course,
      this.props.match.params.courseId
    )

    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          course_id: this.getCourseId(),
          date_on_or_after: '2018-09-19T00:00:00.000Z'
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default injectIntl<IProps>(injectState(withRouter(CourseLive)))
