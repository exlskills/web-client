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
import { MyCourseCardResume } from './MyCourseCardResume'
import { isExtraSmallMobile, isMobile } from '../../../../common/utils/screen'

const myCourseCardWrapperQuery = graphql`
  query MyCourseCardWrapperQuery($course_id: String) {
    courseById(course_id: $course_id) {
      last_accessed_unit
      last_accessed_section
      last_accessed_card
    }
  }
`

type MyCourseCardProps = CardProps & LastAccessedFields

interface LastAccessedFields {
  last_accessed_unit: string
  last_accessed_section: string
  last_accessed_card: string
}

interface IProps {
  item?: CardProps
  unit_id?: string
  section_id?: string
  card_id?: string
}
interface IStates {}

class MyCourseCardWrapperComponent extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  getCourseUrl = (title: string, id: string) => {
    return `/courses/${toUrlId(title, id)}`
  }

  handleCourseClick = (card: any) => {
    const cardUrlId = toUrlId(card.title, card.id)
    if (card.type == 'course') {
      this.props.history.push(`/courses/${cardUrlId}`)
    } else {
      this.props.history.push(`/classes/${cardUrlId}`)
    }
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
      return <Loading />
    }

    const {
      last_accessed_unit,
      last_accessed_section,
      last_accessed_card
    } = props.courseById
    if (isExtraSmallMobile()) {
      this.props.item.image = undefined
    }
    if (!last_accessed_card || !last_accessed_unit || !last_accessed_section) {
      return (
        <CardWrapper>
          <Card
            cardUrl={this.getCourseUrl(
              this.props.item.title,
              this.props.item.id
            )}
            {...this.props.item as CardProps}
          />
        </CardWrapper>
      )
    }

    return (
      <MyCourseCardResume
        unit_id={last_accessed_unit}
        section_id={last_accessed_section}
        card_id={last_accessed_card}
        item={this.props.item}
      />
    )
  }

  render() {
    return (
      <QueryRenderer
        query={myCourseCardWrapperQuery}
        variables={{ course_id: this.props.item.id }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

// I have no idea why I have to do this... None of the other export methods that I tried worked (compiler errors)
let MyCourseCardWrapper = injectIntl(withRouter(MyCourseCardWrapperComponent))
export { MyCourseCardWrapper }
