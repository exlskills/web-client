import Card from 'common/components/Card'
import SideBarMenu from 'common/components/SideBarMenu'
import Loading from 'common/components/Loading'
import { Icon } from 'common/components/styledComponents'
import * as React from 'react'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { toUrlId } from 'common/utils/urlid'
import requireAuthentication from 'routes/requireAuthentication'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

import messages from './messages'
import {
  ContentsBox,
  CourseFooter,
  CourseEnrolls,
  CourseViews,
  Listing,
  SidebarBox,
  SplitPane,
  Wrapper,
  FiltersBarHeading,
  FiltersBarWrapper
} from './styledComponents'
import { RouteComponentProps, withRouter } from 'react-router'
import { Intent, Tag } from '@blueprintjs/core'

const rootQuery = graphql`
  query CourseListingQuery(
    $first: Int,
    $resolverArgs: [QueryResolverArgs],
    $filterValues: FilterValues
  ) {
    coursePaging(
      first: $first,
      resolverArgs: $resolverArgs,
      filterValues: $filterValues
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
    topicFilter {
      value
    }
  }
`

enum MenuItems {
  EMPTY = 0,
  RELEVANT_COURSES,
  MY_COURSES,
  TRENDING_COURSES
}
// TODO: consider to upgrade typescript to 2.4 in order to create enum with string values
const MenuItemsText = {
  0: '',
  1: '',
  2: 'enrolled',
  3: 'trending'
}

type MergedProps = IProps & InjectedIntlProps & RouteComponentProps<any>

interface IProps {}

interface IStates {
  pathExt: string
  selectedMenuItem: MenuItems
  first: number
  searchText: string
  filterTopic: string
}

@requireAuthentication(1)
class CourseListing extends React.PureComponent<MergedProps, IStates> {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props: MergedProps) {
    super(props)
    this.state = {
      pathExt: `/${props.location.pathname.endsWith('enrolled')
        ? MenuItemsText[MenuItems.MY_COURSES]
        : MenuItemsText[MenuItems.RELEVANT_COURSES]}`,
      selectedMenuItem: props.location.pathname.endsWith('enrolled')
        ? MenuItems.MY_COURSES
        : MenuItems.RELEVANT_COURSES,
      first: 20,
      searchText: '',
      filterTopic: ''
    }
  }

  componentWillReceiveProps = (nextProps: MergedProps) => {
    if (nextProps.location.pathname.endsWith('enrolled')) {
      this.handleMenuChange(MenuItems.MY_COURSES)
      return
    }
    this.handleMenuChange(MenuItems.RELEVANT_COURSES)
  }

  handleMenuChange = (menu: MenuItems) => {
    this.setState({
      searchText: '',
      filterTopic: '',
      selectedMenuItem: menu,
      pathExt: `/${(MenuItemsText as any)[menu]}`
    })
  }

  handleTopicChange = (topic: string) => {
    const menu = topic ? MenuItems.EMPTY : MenuItems.RELEVANT_COURSES
    this.setState({
      searchText: '',
      selectedMenuItem: menu,
      pathExt: `/${(MenuItemsText as any)[menu]}`,
      filterTopic: topic
    })
  }

  handleCourseClick = (card: any) => {
    const urlId = toUrlId(card.title, card.id)
    this.props.history.push(`/courses/${urlId}`)
  }

  handleSearchSubmit = (value: string) => {
    const menu = value ? MenuItems.EMPTY : MenuItems.RELEVANT_COURSES
    this.setState({
      filterTopic: '',
      selectedMenuItem: menu,
      pathExt: `/${(MenuItemsText as any)[menu]}`,
      searchText: value
    })
  }

  getSearchQuery() {
    const text = this.state.searchText
    return text
      ? `{ "title": { "$regex": "${this.state.searchText}", "$options": "i" } }`
      : ''
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
    const { pathExt, searchText, filterTopic } = this.state
    const coursesList = props.coursePaging ? props.coursePaging.edges : []
    let optionsFilter = []
    let objAllTopic = {
      name: formatMessage(messages.lbAllTopics),
      value: ''
    }
    optionsFilter.push(objAllTopic)
    for (let opt of props.topicFilter) {
      let objOptions = {
        name: opt.value,
        value: opt.value
      }
      optionsFilter.push(objOptions)
    }
    return (
      <Wrapper>
        <Helmet>
          <title>
            {formatMessage(messages.pageTitle)}
          </title>
          <meta
            name="description"
            content={formatMessage(messages.pageDescription)}
          />
        </Helmet>
        <SplitPane
          defaultSize={250}
          pane2Style={{ overflowY: 'overlay' as any, width: '100%' as any }}
        >
          <SidebarBox>
            <SideBarMenu
              items={[
                {
                  text: 'Courses',
                  iconName: 'book',
                  isHeader: true
                },
                {
                  isDivider: true
                },
                {
                  text: formatMessage(messages.lbRelevantCourses),
                  iconName: 'menu',
                  pathExt: `/${MenuItemsText[MenuItems.RELEVANT_COURSES]}`
                },
                {
                  text: formatMessage(messages.lbMyCourses),
                  iconName: 'endorsed',
                  pathExt: `/${MenuItemsText[MenuItems.MY_COURSES]}`
                }
                // {
                //   text: formatMessage(messages.lbTrendingCourses),
                //   iconName: 'flash',
                //   value: MenuItems.TRENDING_COURSES
                // }
              ]}
              pathExt={pathExt}
              basePath={'/courses'}
              large={true}
            />
          </SidebarBox>
          <ContentsBox>
            <FiltersBarWrapper>
              <FiltersBarHeading
                // label={formatMessage(messages.lbFilters)}
                groupStyle={{ marginRight: '25px' }}
                filters={[
                  {
                    defaultValue: filterTopic,
                    options: optionsFilter,
                    onChange: this.handleTopicChange
                  }
                ]}
                search={{
                  display: true,
                  placeholder: formatMessage(messages.searchbarPlaceholder),
                  defaultValue: searchText,
                  onSearchSubmit: this.handleSearchSubmit
                }}
              />
            </FiltersBarWrapper>
            <Listing>
              {coursesList.map((edge: any) =>
                <Card
                  key={edge.node.id}
                  id={edge.node.id}
                  image={edge.node.logo_url}
                  title={edge.node.title}
                  description={edge.node.headline}
                  onClick={this.handleCourseClick}
                  footer={
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
                  }
                />
              )}
            </Listing>
          </ContentsBox>
        </SplitPane>
      </Wrapper>
    )
  }

  render() {
    const searchQuery = this.getSearchQuery()
    const { first, filterTopic, selectedMenuItem } = this.state
    let variables: any = {
      first: first
    }
    if (searchQuery) {
      variables.filterValues = { filterValuesString: searchQuery }
    } else if (filterTopic) {
      variables.resolverArgs = [{ param: 'topic', value: filterTopic }]
    } else {
      let listText = (MenuItemsText as any)[selectedMenuItem]
      if (listText === 'enrolled') {
        listText = 'mine'
      } else if (listText === '') {
        listText = 'relevant'
      }
      variables.resolverArgs = [{ param: 'list', value: listText }]
    }

    return (
      <QueryRenderer
        query={rootQuery}
        variables={variables}
        environment={environment} // RelayEnvironment
        render={this.queryRender}
      />
    )
  }
}

export default injectIntl(withRouter<any>(CourseListing))
