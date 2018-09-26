import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { QueryRenderer } from 'react-relay'
import { RouteComponentProps } from 'react-router'
import environment from 'relayEnvironment'
import * as Loadable from 'react-loadable'
import { SchemaType, fromUrlId, toUrlId } from 'common/utils/urlid'
import requireAuthentication from 'routes/requireAuthentication'
import Loading from 'common/components/Loading'
import { handleQueryRender } from 'common/utils/relay'
import SectionDump from './SectionDump'

const { graphql } = require('react-relay/compat')
const rootQuery = graphql`
  query SectionQuery(
    $course_id: String,
    $cardsResolverArgs: [QueryResolverArgs]!,
    $unitsResolverArgs: [QueryResolverArgs]!
  ) {
    courseById(course_id: $course_id) {
      id
      title
      headline
    }
    unitPaging(first: 100, resolverArgs: $unitsResolverArgs) {
      edges {
        node {
          id
          index
          title
          sections_list {
            id
            title
            cards_list {
              id
              title
            }
          }
        }
      }
    }
    cardPaging(first: 9999, resolverArgs: $cardsResolverArgs) {
      edges {
        cursor
        node {
          id
          index
          title
          headline
          tags
          content {
            id
            version
            content
          }
          question {
            id
            question_type
            question_text
            data {
              id
              tmpl_files
              environment_key
              use_advanced_features
              explanation
              src_files
              options {
                id
                seq
                text
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
interface IProps {}
interface IStates {
  courseId: string
  unitId: string
  sectionId: string
}

@requireAuthentication(1)
class SectionPage extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  state: IStates = {
    courseId: fromUrlId(SchemaType.Course, this.props.match.params.courseId),
    unitId: fromUrlId(SchemaType.CourseUnit, this.props.match.params.unitId),
    sectionId: fromUrlId(
      SchemaType.UnitSection,
      this.props.match.params.sectionId
    )
  }

  queryRender = handleQueryRender(({ props }: { props: any }) => {
    let cards = props.cardPaging ? props.cardPaging.edges : []
    let units: any[] = props.unitPaging ? props.unitPaging.edges : []

    units = units.map(u => u.node)

    let unit = units.find(u => u.id === this.state.unitId)
    let section = unit.sections_list.find(
      (s: any) => s.id === this.state.sectionId
    )

    return (
      <SectionDump
        initialUnit={unit}
        initialSection={section}
        course={props.courseById}
        initialCards={cards}
        units={units}
      />
    )
  })

  render() {
    let variables: any = {
      course_id: this.state.courseId,
      unitsResolverArgs: [{ param: 'course_id', value: this.state.courseId }],
      cardsResolverArgs: [
        { param: 'course_id', value: this.state.courseId },
        { param: 'unit_id', value: this.state.unitId },
        { param: 'section_id', value: this.state.sectionId }
      ]
    }

    return (
      <QueryRenderer
        query={rootQuery}
        variables={variables}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default injectIntl(SectionPage)
