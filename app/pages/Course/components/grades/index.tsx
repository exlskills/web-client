import * as React from 'react'
import ProgressHeader from 'pages/Course/components/common/ProgressHeader'
import { ContentWrapper } from 'common/components/styledComponents'
import Loading from 'common/components/Loading'
import GradesTable from './GradesTable'
import { RouteComponentProps, withRouter } from 'react-router'
import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'
import { SchemaType, fromUrlId, toUrlId } from 'common/utils/urlid'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { processCourseData } from '../../utils/course_data_processor'

const rootQuery = graphql`
  query gradesQuery(
    $first: Int!,
    $resolverArgs: [QueryResolverArgs]!,
    $course_id: String
  ) {
    units: unitPaging(first: $first, resolverArgs: $resolverArgs) {
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
            hoverText: title
            cards_list {
              id
              ema
              hoverText: title
            }
          }
          sections(first: 100) @connection(key: "SectionsList_sections") {
            edges {
              node {
                id
                index
                title
                headline
              }
            }
          }
        }
      }
    }
    gradesList: unitStatusPaging(first: $first, resolverArgs: $resolverArgs) {
      edges {
        node {
          id
          title
          last_attempted_at
          attempts
          attempts_left
          final_exam_weight_pct
          grade
          passed
        }
      }
    }
    courseById(course_id: $course_id) {
      id
      title
      logo_url
      last_accessed_unit
    }
  }
`

interface IProps {}

class Grades extends React.PureComponent<
  IProps &
    IFreactalProps &
    RouteComponentProps<{ courseId: string; unitId: string }>,
  any
> {
  componentDidMount() {
    window.addEventListener('load', this.handleLoad)
  }

  handleLoad = () => {
    if (top.location.href.indexOf('#title-') > -1) {
      var element = document.getElementsByClassName('Pane vertical Pane2')[0]
      element.scrollTop = element.scrollTop + window.innerHeight / 2 + 417
    }
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

    let gradesList = []
    if (props.gradesList) {
      gradesList = props.gradesList.edges.map((edge: any) => ({
        id: edge.node.id,
        unit: edge.node.title,
        attempts: edge.node.attempts,
        attemptsLeft: edge.node.attempts_left,
        lastAttempt: edge.node.last_attempted_at,
        weight: edge.node.final_exam_weight_pct,
        grade: edge.node.grade,
        passed: edge.node.passed
      }))
    }

    const units = props.units ? props.units.edges : []
    let unitIds = []
    let unitsById: any = {}
    // TODO: Obviously this O(n^2) mess below is not a smart thing to be doing on render in a client... Need to fix the values returned from the grades GQL queries (server-side)
    for (let item of units) {
      for (let gradeItem of gradesList) {
        if (gradeItem.id == item.node.id) {
          gradeItem.attemptsLeft = item.node.attempts_left
        }
      }
      unitIds.push(item.node.id)
      unitsById[item.node.id] = { ...item.node }
    }

    let course = { ...props.courseById }
    if (this.props.match.params.unitId) {
      const unitId = fromUrlId(
        SchemaType.CourseUnit,
        this.props.match.params.unitId
      )
      course.last_accessed_unit = unitId
    }

    console.log('course', course)
    this.props.effects.setExamAllUnits(
      processCourseData({ unitIds, unitsById })
    )
    this.props.effects.massiveUpdate({
      examAllUnits: processCourseData({ unitIds, unitsById }),
      course: course ? course : {}
    })

    console.log('grade render')
    return (
      <ContentWrapper>
        <ProgressHeader />
        <GradesTable examItems={gradesList} onClick={console.log} />
      </ContentWrapper>
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
          first: 999,
          course_id: courseId,
          resolverArgs: [
            {
              param: 'course_id',
              value: courseId
            }
          ]
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default injectState(withRouter(Grades))
