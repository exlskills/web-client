import Loading from 'common/components/Loading'
import { CenterContainer } from 'common/components/styledComponents'
import * as React from 'react'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { QueryRenderer } from 'react-relay'
import { RouteComponentProps } from 'react-router'
import environment from 'relayEnvironment'
import { SchemaType, fromUrlId, toUrlId } from 'common/utils/urlid'
import requireAuthentication from 'routes/requireAuthentication'

import messages from './messages'
import SectionDump from './SectionDump'

const { graphql } = require('react-relay/compat')
const rootQuery = graphql`
  query SectionQuery($course_id: String, $resolverArgs: [QueryResolverArgs]!) {
    courseById(course_id: $course_id) {
      title
      headline
    }
    cardPaging(first: 9999, resolverArgs: $resolverArgs) {
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
              code
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
interface IStates {}

@requireAuthentication(1)
class SectionPage extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
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

    const { formatMessage } = this.props.intl
    let cards = props.cardPaging ? props.cardPaging.edges : []

    return (
      <CenterContainer>
        <SectionDump course={props.courseById} cards={cards} />
      </CenterContainer>
    )
  }

  render() {
    const courseId = fromUrlId(
      SchemaType.Course,
      this.props.match.params.courseId
    )
    const unitId = fromUrlId(
      SchemaType.CourseUnit,
      this.props.match.params.unitId
    )
    const sectionId = fromUrlId(
      SchemaType.UnitSection,
      this.props.match.params.sectionId
    )

    let variables: any = {
      course_id: courseId,
      resolverArgs: [
        { param: 'course_id', value: courseId },
        { param: 'unit_id', value: unitId },
        { param: 'section_id', value: sectionId }
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
