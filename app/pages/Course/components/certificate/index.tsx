import * as React from 'react'
import Loading from 'common/components/Loading'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
import { injectState, update, provideState } from 'freactal'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import { RouteComponentProps, withRouter } from 'react-router'
import { SchemaType, fromUrlId } from 'common/utils/urlid'

import CourseCertificateDump from './CourseCertificateDump'
import { IFreactalProps } from 'pages/Course'
import * as PropTypes from 'prop-types'
const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import CourseInfoQuery from '../info/queries/CourseInfoQuery'

interface IProps {}

type Mergedprops = IProps &
  IFreactalProps &
  InjectedIntlProps &
  RouteComponentProps<{ courseId: string; unitId: string }>

class CourseCertificate extends React.Component<Mergedprops, {}> {
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

  getCourseId() {
    return fromUrlId(SchemaType.Course, this.props.match.params.courseId)
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
        title={title}
        description={description}
        logoUrl={logo_url}
        infoMarkdown={info_md}
        verifiedCertCost={verified_cert_cost}
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

export default injectIntl<IProps & InjectedIntlProps>(
  injectState(withRouter(CourseCertificate))
)
