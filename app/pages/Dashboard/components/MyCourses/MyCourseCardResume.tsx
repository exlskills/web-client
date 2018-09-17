import { RendererProps } from '../../../../common/utils/relay'

import { toUrlId } from '../../../../common/utils/urlid'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { RouteComponentProps, withRouter } from 'react-router'
import * as React from 'react'
import Loading from 'common/components/Loading'
import { CardWrapper } from './styledComponents'
import {
  default as Card,
  IProps as CardProps
} from '../../../../common/components/Card'
// Note: IDE might complain about these as duplicated identifiers, but that's not the case... Ignore..
const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { Button, Intent } from '@blueprintjs/core'
import { CourseFooter } from '../../../CourseListing/styledComponents'

const myCourseCardResumeQuery = graphql`
  query MyCourseCardResumeQuery(
    $i_course_id: ID!,
    $i_section_id: ID!,
    $i_unit_id: ID!,
    $i_card_id: ID!,
    $course_id: String,
    $unit_id: String
  ) {
    cardEntry(
      course_id: $i_course_id,
      unit_id: $i_unit_id,
      section_id: $i_section_id,
      card_id: $i_card_id
    ) {
      id
      title
    }
    courseUnit(course_id: $course_id, unit_id: $unit_id) {
      id
      title
      sections_list {
        id
        title
        headline
        hoverText: title
      }
    }
  }
`

interface IProps {
  item: CardProps
  unit_id: string
  section_id: string
  card_id: string
}
interface IStates {}

class MyCourseCardResumeComponent extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  handleCourseResumeClick = (
    unitId: string,
    sectionId: string,
    cardId: string,
    unitTitle: string,
    sectionTitle: string,
    cardTitle: string
  ) => () => {
    const courseUrlId = toUrlId(this.props.item.title, this.props.item.id)
    const unitUrlId = toUrlId(unitTitle, unitId)
    const sectionUrlId = toUrlId(sectionTitle, sectionId)
    const cardUrlId = toUrlId(cardTitle, cardId)
    this.props.history.push(
      `/courses/${courseUrlId}/units/${unitUrlId}/sections/${sectionUrlId}/card/${cardUrlId}`
    )
  }

  getCourseUrl = (title: string, id: string) => {
    return `/courses/${toUrlId(title, id)}`
  }

  queryRender = ({ error, props }: RendererProps) => {
    if (error) {
      return (
        <div>
          {error}
        </div>
      )
    }
    if (!props) {
      return (
        <div style={{ height: '200px' }}>
          <Loading />
        </div>
      )
    }

    let sectionTitle = ''
    props.courseUnit.sections_list.forEach((sect: any) => {
      if (sect.id == this.props.section_id) {
        sectionTitle = sect.title
      }
    })
    this.props.item.footer = (
      <CourseFooter style={{ padding: '5px 0px 0px 8px' }}>
        <Button
          onClick={this.handleCourseResumeClick(
            props.courseUnit.id,
            this.props.section_id,
            props.cardEntry.id,
            props.courseUnit.title,
            sectionTitle,
            props.cardEntry.title
          )}
          intent={Intent.SUCCESS}
        >
          Resume
        </Button>
      </CourseFooter>
    )

    return (
      <CardWrapper>
        <Card
          cardUrl={this.getCourseUrl(this.props.item.title, this.props.item.id)}
          {...this.props.item as CardProps}
        />
      </CardWrapper>
    )
  }

  render() {
    return (
      <QueryRenderer
        query={myCourseCardResumeQuery}
        variables={{
          course_id: this.props.item.id,
          unit_id: this.props.unit_id,
          i_course_id: this.props.item.id,
          i_unit_id: this.props.unit_id,
          i_section_id: this.props.section_id,
          i_card_id: this.props.card_id
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

// I have no idea why I have to do this... None of the other export methods that I tried worked (compiler errors)
let MyCourseCardResume = injectIntl(withRouter(MyCourseCardResumeComponent))
export { MyCourseCardResume }
