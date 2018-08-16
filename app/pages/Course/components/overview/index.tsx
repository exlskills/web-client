import * as React from 'react'
import Loading from 'common/components/Loading'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
import { injectState, update, provideState } from 'freactal'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { RouteComponentProps, withRouter } from 'react-router'
import { SchemaType, fromUrlId } from 'common/utils/urlid'

import { processCourseData } from '../../utils/course_data_processor'

import CourseOverviewDump from './CourseOverviewDump'
import { IFreactalProps } from 'pages/Course'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

const rootQuery = graphql`
  query overviewQuery(
    $first: Int!,
    $resolverArgs: [QueryResolverArgs]!,
    $course_id: String
  ) {
    unitPaging(first: $first, resolverArgs: $resolverArgs) {
      edges {
        node {
          id
          index
          title
          headline
          attempts_left
          unit_processing
          ema
          grade
          quiz_lvl
          is_continue_exam
          exam_attempt_id
          sections_list {
            id
            ema
            title
            headline
            hoverText: title
            cards_list {
              id
              ema
              hoverText: title
            }
          }
        }
      }
    }
    courseById(course_id: $course_id) {
      id
      title
      logo_url
      headline
      description
      primary_topic
      last_accessed_unit
      last_accessed_section
      last_accessed_card
    }
  }
`

interface IProps {}

type Mergedprops = IProps &
  IFreactalProps &
  InjectedIntlProps &
  RouteComponentProps<{ courseId: string; unitId: string }>

class CourseOverview extends React.Component<Mergedprops, {}> {
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  componentDidMount() {
    const courseId = fromUrlId(
      SchemaType.Course,
      this.props.match.params.courseId
    )
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

    const units = props.unitPaging ? props.unitPaging.edges : []

    let unitIds = []
    let unitsById: any = {}
    for (let item of units) {
      unitIds.push(item.node.id)
      unitsById[item.node.id] = { ...item.node }
    }

    let course = { ...props.courseById }
    if (this.props.match.params.unitId) {
      course.last_accessed_unit = fromUrlId(
        SchemaType.CourseUnit,
        this.props.match.params.unitId
      )
    }

    this.props.effects.massiveUpdate({
      examAllUnits: processCourseData({ unitIds, unitsById }),
      course: course ? course : {}
    })

    let showHeader = true,
      showStatus = true
    if (location.pathname.endsWith('content')) {
      showHeader = false
      showStatus = false
    }

    return (
      <CourseOverviewDump
        userId={this.context.viewer.user_id}
        showHeader={showHeader}
        showStatus={showStatus}
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
        query={rootQuery}
        variables={{
          first: 20,
          course_id: courseId,
          resolverArgs: [
            {
              param: 'course_id',
              value: courseId
            }
          ]
        }}
        environment={environment} // RelayEnvironment
        render={this.queryRender}
      />
    )
  }
}

class CourseContent extends CourseOverview {}

export default injectIntl<IProps>(injectState(withRouter(CourseOverview)))
