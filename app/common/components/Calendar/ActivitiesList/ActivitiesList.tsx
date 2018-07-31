import Loading from 'common/components/Loading'
import { Flex, Box } from 'grid-styled'
import { Button, Collapse } from '@blueprintjs/core'
import { Icon } from 'common/components/styledComponents'
import { RendererProps } from 'common/utils/relay'
import * as moment from 'moment'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { createPaginationContainer } from 'react-relay'
import { RouteComponentProps, withRouter } from 'react-router'
import messages from './messages'
import {
  ContentWrapper,
  EventBody,
  EventBodyItem,
  EventBodyList,
  EventIcon,
  EventTime,
  EventTitle,
  EventWrapper,
  EmptyText
} from './styledComponents'
import CollapseList from './CollapseList'
const { graphql } = require('react-relay/compat')

const PER_PAGE = 10

interface IProps {
  isOpen: boolean
  date: string
  group?: string
  relay: any
  activityPaging: {
    activities: {
      edges: {
        node: any
      }[]
      pageInfo: any
    }
  }
}
interface IStates {
  first: number
}

class ActivitiesList extends React.PureComponent<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  state: IStates = {
    first: PER_PAGE
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.group != this.props.group) {
      this.setState({ first: PER_PAGE })
    }
  }

  handleLoadMore = () => {
    //this.setState({ first: this.state.first + PER_PAGE })
    console.log(
      '_loadMore',
      this.props.relay.hasMore(),
      this.props.relay.isLoading()
    )
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      console.log('nothing more')
      return
    }

    this.props.relay.loadMore(PER_PAGE, (e: any) => {
      console.log(`${PER_PAGE} more items are loaded`)
      console.log(e)
    })
  }

  parseActivitiesList(list: any[]) {
    if (this.props.group) {
      let groupedList: { [key: string]: any } = {}
      list.forEach(item => {
        if (!groupedList[item.node.type_desc]) {
          groupedList[item.node.type_desc] = []
        }
        groupedList[item.node.type_desc].push(item.node)
      })
      return Object.keys(groupedList).map(key => {
        return [key, groupedList[key]]
      })
    }

    return list.map(item => item.node)
  }
  render() {
    const { formatMessage } = this.props.intl
    const headerText = formatMessage(messages.lbActivitiesOnDate)

    let itemsList = []
    let hasNext = false
    if (this.props.activityPaging) {
      let activitiesList = this.props.activityPaging.activities
        ? this.props.activityPaging.activities.edges
        : []
      itemsList = this.parseActivitiesList(activitiesList)
      hasNext =
        this.props.activityPaging.activities.pageInfo &&
        this.props.activityPaging.activities.pageInfo.hasNextPage
    }

    if (itemsList.length == 0) {
      return (
        <EmptyText>
          {formatMessage(messages.txtNoActivities)}
        </EmptyText>
      )
    }

    if (this.props.group) {
      return (
        <Flex direction={'column'} style={{ flexDirection: 'column' }}>
          {itemsList.map(item =>
            <CollapseList
              key={item[0]}
              groupText={item[0]}
              itemslist={item[1]}
            />
          )}
          {hasNext &&
            <Button
              text={formatMessage(messages.btnShowMoreActivities)}
              style={{ alignSelf: 'center', minWidth: '20%' }}
              onClick={this.handleLoadMore}
            />}
        </Flex>
      )
    }

    return (
      <Flex direction={'column'} style={{ flexDirection: 'column' }}>
        <ContentWrapper>
          {itemsList.map((item: any) =>
            <EventWrapper key={`listbytime_${item.id}`}>
              <EventTime>
                {moment(item.date).fromNow()}
              </EventTime>
              <EventIcon>
                <Icon iconName="timeline-events" />
              </EventIcon>
              <EventTitle>
                {/* <EventAuthor>Dat Ngo</EventAuthor> */}
                {item.type_desc}
              </EventTitle>
              <EventBody>
                <EventBodyList>
                  <EventBodyItem>
                    <a href={item.activity_link} target="_blank">
                      <span>
                        {item.content}
                      </span>
                    </a>
                  </EventBodyItem>
                </EventBodyList>
              </EventBody>
            </EventWrapper>
          )}
        </ContentWrapper>
        {hasNext &&
          <Button
            text={formatMessage(messages.btnShowMoreActivities)}
            style={{ alignSelf: 'center', minWidth: '20%' }}
            onClick={this.handleLoadMore}
          />}
      </Flex>
    )
  }
}

//export default injectIntl(ActivitiesList)
export default createPaginationContainer<any>(
  injectIntl(withRouter(ActivitiesList)),
  {
    activityPaging: graphql.experimental`
      fragment ActivitiesList_activityPaging on activityPaging {
        activities(first: $count, after: $cursor, resolverArgs: $resolverArgs)
          @connection(key: "ActivitiesList_activities") {
          edges {
            node {
              id
              date
              activity_link
              type
              type_desc
              content
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props: IProps) {
      console.log('in getConnectionFromProps', props)
      return props.activityPaging && props.activityPaging.activities
    },
    getFragmentVariables(prevVars: any, totalCount: any) {
      console.log('in getFragmentVariables', prevVars, totalCount)
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      console.log('in getVariables', fragmentVariables)
      let resolverArgs: any = fragmentVariables.resolverArgs
      return {
        count,
        cursor,
        resolverArgs
      }
    },
    query: graphql.experimental`
      query ActivitiesListPaginationQuery(
        $count: Int!,
        $cursor: String,
        $resolverArgs: [QueryResolverArgs]!
      ) {
        activityPaging {
          ...ActivitiesList_activityPaging
        }
      }
    `
  }
)
