import * as React from 'react'
import Loading from 'common/components/Loading'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
import { injectState, update, provideState } from 'freactal'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { RouteComponentProps, withRouter } from 'react-router'
import { SchemaType, fromUrlId } from 'common/utils/urlid'

import CourseCertificateDump from './CourseCertificateDump'
import { IFreactalProps } from 'pages/Course'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import CourseInfoQuery from '../info/queries/CourseInfoQuery'
import { handleQueryRender } from 'common/utils/relay'
import { fromGlobalId } from '../../../../common/utils/graphql'

interface IProps {}

type Mergedprops = IProps &
  IFreactalProps &
  InjectedIntlProps &
  RouteComponentProps<{ courseId: string; unitId: string }>

class CourseCertificate extends React.Component<Mergedprops, {}> {
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
      <CourseCertificateDump
        courseId={fromGlobalId(this.getCourseId()).id}
        title={title}
        description={description}
        logoUrl={logo_url}
        infoMarkdown={info_md}
        verifiedCertCost={verified_cert_cost}
      />
    )
  })

  render() {
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

export default injectIntl<IProps>(injectState(withRouter(CourseCertificate)))
