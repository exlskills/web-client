import * as React from 'react'
import Loading from 'common/components/Loading'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
import { injectState, update, provideState } from 'freactal'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { RouteComponentProps, withRouter } from 'react-router'
import { SchemaType, fromUrlId } from 'common/utils/urlid'

import CourseInfoDump from './CourseInfoDump'
import { IFreactalProps } from 'pages/Course'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import CourseInfoQuery from './queries/CourseInfoQuery'
import { handleQueryRender } from 'common/utils/relay'

interface IProps {}

type Mergedprops = IProps &
  IFreactalProps &
  InjectedIntlProps &
  RouteComponentProps<{ courseId: string; unitId: string }>

class CourseInfo extends React.Component<Mergedprops, {}> {
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
      info_md,
      description,
      logo_url,
      verified_cert_cost
    } = props.courseById

    return (
      <CourseInfoDump
        title={title}
        logoUrl={logo_url}
        description={description}
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
        query={CourseInfoQuery}
        variables={{
          course_id: this.getCourseId()
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default injectIntl<IProps>(injectState(withRouter(CourseInfo)))
