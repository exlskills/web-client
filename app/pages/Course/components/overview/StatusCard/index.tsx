import * as React from 'react'
import * as PropTypes from 'prop-types'
import Loading from 'common/components/Loading'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
import { injectState, update, provideState } from 'freactal'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import { RouteComponentProps, withRouter } from 'react-router'
import { SchemaType, fromUrlId } from 'common/utils/urlid'

import StatusCardDump from './StatusCardDump'
import { IFreactalProps } from 'pages/Course'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import CourseRolesQuery from '../queries/CourseRolesQuery'
import { toGlobalId } from '../../../../../common/utils/graphql'

interface IProps {}

type Mergedprops = IProps &
  IFreactalProps &
  InjectedIntlProps &
  RouteComponentProps<{ courseId: string; unitId: string }>

class StatusCard extends React.Component<Mergedprops, {}> {
  static contextTypes = {
    viewer: PropTypes.object
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

  queryRender = ({ error, props }: { error: Error; props: any }) => {
    if (error) {
      return (
        <div>
          {error.message}
        </div>
      )
    }

    if (!props) {
      return <Loading />
    }

    let enrolled = false
    const rawRoles = props.userProfile
      ? props.userProfile.course_roles.edges
      : []
    const roles = rawRoles.map((r: any) => r.node)
    if (roles.length > 0) {
      let rolesByCourseId: any = {}
      roles.forEach((r: any) => {
        rolesByCourseId[r.course_id] = r
      })
      const splitCurCourseId = this.props.match.params.courseId.split('-')
      if (rolesByCourseId[splitCurCourseId[splitCurCourseId.length - 1]]) {
        // The state will be set later on
        enrolled = true
      }
    }

    return (
      <StatusCardDump
        defaultOpen={true}
        courseId={fromUrlId(
          SchemaType.Course,
          this.props.match.params.courseId
        )}
        userId={toGlobalId(SchemaType.User, this.context.viewer.user_id)}
        enrolled={enrolled}
      />
    )
  }

  render() {
    const courseId = fromUrlId(
      SchemaType.Course,
      this.props.match.params.courseId
    )

    return (
      <QueryRenderer
        query={CourseRolesQuery}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default injectIntl<IProps & InjectedIntlProps>(
  injectState(withRouter(StatusCard))
)
