import { RendererProps } from 'common/utils/relay'
import { Icon } from 'common/components/styledComponents'
import Loading from 'common/components/Loading'
import * as moment from 'moment'
import {
  CourseEnrolls,
  CourseFooter,
  CourseViews
} from 'pages/CourseListing/styledComponents'
import * as React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router'
import requireAuthentication from 'routes/requireAuthentication'
import ActivitiesCalendar from 'common/components/Calendar/ActivitiesCalendar'
import CardCarousel from './components/CardCarousel'
import { ACTIVITY_DAYS } from 'common/components/Calendar/constants'
import { MyCourses } from './components/MyCourses'
import messages from './messages'
import {
  CalendarWrapper,
  Metric,
  MetricNumber,
  MetricTitle,
  MetricWrapper,
  MyCoursesWrapper,
  PanelWrapper,
  TopWrapper,
  Wrapper
} from './styledComponents'
import { SchemaType, fromUrlId, toUrlId } from 'common/utils/urlid'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { Button, Intent, Tag } from '@blueprintjs/core'

const rootQuery = graphql`
  query DashboardQuery($start_date: String, $end_date: String) {
    userActivity(start_date: $start_date, end_date: $end_date) {
      id
      date
      count
    }
    recommendedCourses: coursePaging(
      first: 999,
      resolverArgs: [{ param: "list", value: "relevant" }]
    ) {
      edges {
        node {
          id
          title
          headline
          enrolled_count
          view_count
          logo_url
          skill_level
          est_minutes
          primary_topic
        }
      }
    }
    myCourses: coursePaging(
      first: 2,
      resolverArgs: [{ param: "list", value: "mine" }]
    ) {
      edges {
        node {
          id
          title
          headline
          enrolled_count
          view_count
          skill_level
          est_minutes
          primary_topic
          logo_url
          last_accessed_unit
          last_accessed_section
          last_accessed_card
        }
      }
    }
  }
`
interface IProps {}
interface IStates {}

@requireAuthentication(1)
class Dashboard extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  handleCalendarClick = (data: any) => {
    console.log(`Clicked on date ${data.date} with value:`, data.value)
  }

  handleViewAllEnrolled = () => {
    this.props.history.push('/courses/enrolled')
  }

  handleViewAllRecommended = () => {
    this.props.history.push('/courses')
  }

  handleCourseClick = (card: any) => {
    const cardUrlId = toUrlId(card.title, card.id)
    if (card.type == 'course') {
      this.props.history.push(`/courses/${cardUrlId}`)
    } else {
      this.props.history.push(`/classes/${cardUrlId}`)
    }
  }

  handleWorkspaceClick = (card: any) => {
    const cardUrlId = toUrlId(card.title, card.id)
    this.props.history.push(`/workspaces/${cardUrlId}`)
  }

  minsToText = (mins: number) => {
    if (mins < 60) {
      return `${Math.round(mins)}${this.props.intl.formatMessage(
        messages.cardFooterMinsAbbrv
      )}`
    }
    const hours = Math.round(mins / 60)
    return `${Math.round(hours)}${this.props.intl.formatMessage(
      messages.cardFooterHourAbbrv
    )}`
  }

  levelToText = (lvl: number) => {
    const fmtMsg = this.props.intl.formatMessage
    switch (lvl) {
      case 0:
        return fmtMsg(messages.cardFooterIntroductoryLevel)
      case 1:
        return fmtMsg(messages.cardFooterBeginnerLevel)
      case 2:
        return fmtMsg(messages.cardFooterIntermediateLevel)
      case 3:
        return fmtMsg(messages.cardFooterAdvancedLevel)
      case 4:
        return fmtMsg(messages.cardFooterExpertLevel)
      default:
        return fmtMsg(messages.cardFooterIntroductoryLevel)
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

    const { formatMessage } = this.props.intl
    let recommended: any = []
    let mine: any = []

    if (props.recommendedCourses) {
      recommended.push(
        ...props.recommendedCourses.edges.map((edge: any) => ({
          id: edge.node.id,
          type: 'course',
          image: edge.node.logo_url,
          title: edge.node.title,
          description: edge.node.headline,
          footer: (
            <CourseFooter>
              <CourseEnrolls>
                <Icon iconName="time" />{' '}
                {this.minsToText(edge.node.est_minutes)}
              </CourseEnrolls>
              <CourseViews>
                <Icon iconName="ninja" />{' '}
                {this.levelToText(edge.node.skill_level)}
              </CourseViews>
              {edge.node.primary_topic &&
                <div>
                  <Tag intent={Intent.PRIMARY}>
                    {edge.node.primary_topic}
                  </Tag>
                </div>}
            </CourseFooter>
          )
        }))
      )
    }

    if (props.myCourses) {
      mine.push(
        ...props.myCourses.edges.map((edge: any) => ({
          id: edge.node.id,
          type: 'course',
          image: edge.node.logo_url,
          title: edge.node.title,
          boxWidth: '100%',
          horizontal: true,
          description: edge.node.headline,
          last_accessed_unit: edge.node.last_accessed_unit,
          last_accessed_section: edge.node.last_accessed_section,
          last_accessed_card: edge.node.last_accessed_card,
          footer: (
            <CourseFooter>
              <CourseEnrolls>
                <Icon iconName="time" />{' '}
                {this.minsToText(edge.node.est_minutes)}
              </CourseEnrolls>
              <CourseViews>
                <Icon iconName="ninja" />{' '}
                {this.levelToText(edge.node.skill_level)}
              </CourseViews>
              {edge.node.primary_topic &&
                <div>
                  <Tag intent={Intent.PRIMARY}>
                    {edge.node.primary_topic}
                  </Tag>
                </div>}
            </CourseFooter>
          )
        }))
      )
    }

    console.log(props.myCourses)

    let activitiesList: { [date: string]: any } = {}
    if (props.userActivity) {
      for (let data of props.userActivity) {
        activitiesList[data.date] = { value: data.count }
      }
    }

    return (
      <div>
        <Helmet
          title={formatMessage(messages.pageTitle)}
          meta={[
            {
              name: 'description',
              content: formatMessage(messages.pageDescription)
            }
          ]}
        />
        <Wrapper>
          <TopWrapper>
            {mine.length > 0 &&
              <MyCoursesWrapper>
                <div style={{ marginTop: '10px' }}>
                  <FormattedMessage {...messages.lbMyCourses} />
                  <PanelWrapper style={{ height: '426px' }}>
                    <MyCourses
                      viewAll={this.handleViewAllEnrolled}
                      viewAllMsg={formatMessage(messages.lbViewAllMsg)}
                      items={mine}
                    />
                  </PanelWrapper>
                </div>
              </MyCoursesWrapper>}
            {recommended.length > 0 &&
              <div
                style={{
                  marginTop: '10px',
                  width: mine.length > 0 ? 'calc(60% - 30px)' : '100%'
                }}
              >
                <FormattedMessage {...messages.lbRecommended} />
                <PanelWrapper style={{ height: '426px' }}>
                  <CardCarousel
                    sliderSettings={
                      mine.length > 0
                        ? {
                            slidesToScroll: 2,
                            slidesToShow: 2,
                            responsive: [
                              { breakpoint: 768, settings: { slidesToShow: 1 } }
                            ]
                          }
                        : {}
                    }
                    items={recommended}
                    onCardClick={this.handleCourseClick}
                    viewAll={this.handleViewAllRecommended}
                    viewAllMsg={formatMessage(messages.lbViewAllMsg)}
                  />
                </PanelWrapper>
              </div>}
          </TopWrapper>
          <div style={{ marginTop: '10px' }} />
          <FormattedMessage {...messages.lbLearningActivity} />
          <CalendarWrapper>
            <ActivitiesCalendar activities={activitiesList} />
          </CalendarWrapper>
        </Wrapper>
      </div>
    )
  }

  render() {
    const start_date = moment()
      .subtract(ACTIVITY_DAYS, 'days')
      .format('YYYY-MM-DD')
    const end_date = moment().format('YYYY-MM-DD')

    return (
      <QueryRenderer
        query={rootQuery}
        variables={{ start_date, end_date }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default injectIntl(Dashboard)