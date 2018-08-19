import { Button } from '@blueprintjs/core'
import { CenterContainer } from 'common/components/styledComponents'
import { DEFAULT_PAGE_SIZE } from 'common/constants'
import ReadNotificationMutation from 'common/mutations/ReadNotificationMutation'
import * as React from 'react'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { createPaginationContainer } from 'react-relay'
import { RouteComponentProps, withRouter } from 'react-router'

import messages from './messages'
import {
  NotificationItem,
  NotificationsList,
  NotificationTime,
  Wrapper
} from './styledComponents'
import * as moment from 'moment'
const UserAvatar = require('react-user-avatar')

const { graphql } = require('react-relay/compat')
interface IProps {
  relay: any
  notificationPaging: {
    notifications: {
      edges: {
        node: any
      }[]
      pageInfo: any
    }
  }
}

interface IStates {}

class AllNotifications extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  private _loadMore = () => {
    console.log(
      '_loadMore',
      this.props.relay.hasMore(),
      this.props.relay.isLoading()
    )
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      console.log('nothing more')
      return
    }

    this.props.relay.loadMore(DEFAULT_PAGE_SIZE, (e: any) => {
      console.log(`${DEFAULT_PAGE_SIZE} more items are loaded`)
      console.log(e)
    })
  }

  handleClickNotification = (notif: any) => (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault()
    ReadNotificationMutation(notif.id).then(res => {
      this.props.history.push(notif.notification_link)
    })
  }
  render() {
    const { formatMessage } = this.props.intl
    const noticesList = this.props.notificationPaging
      ? this.props.notificationPaging.notifications.edges
      : []

    console.log(noticesList)

    return (
      <CenterContainer>
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
          <h2>
            {formatMessage(messages.lbNotifications)}
          </h2>
          <div>
            <NotificationsList>
              {noticesList.length == 0 &&
                <span>
                  {formatMessage(messages.lbNoNotifications)}
                </span>}
              {noticesList.map((item: any) =>
                <NotificationItem
                  key={item.node.id}
                  unread={!item.node.is_read}
                >
                  <a
                    style={{ display: 'flex' }}
                    href={item.node.notification_link}
                    onClick={this.handleClickNotification(item.node)}
                  >
                    {/*TODO once there is a user name and avatar being sent, set this to those values instead*/}
                    <UserAvatar
                      size={36}
                      name={item.node.content.split(' ')[0]}
                    />
                    <span style={{ marginTop: '9px', marginLeft: '10px' }}>
                      {item.node.content}
                    </span>
                    <NotificationTime>
                      {moment(item.node.created_at).fromNow()}
                    </NotificationTime>
                  </a>
                </NotificationItem>
              )}
            </NotificationsList>
            {this.props.relay.hasMore() &&
              <Button
                text="Load more"
                onClick={this._loadMore}
                style={{ marginBottom: 50 }}
              />}
          </div>
        </Wrapper>
      </CenterContainer>
    )
  }
}

export default createPaginationContainer<any>(
  injectIntl(withRouter(AllNotifications)),
  {
    notificationPaging: graphql.experimental`
      fragment AllNotifications_notificationPaging on notificationPaging {
        notifications(first: $count, after: $cursor)
          @connection(key: "AllNotifications_notifications") {
          edges {
            node {
              id
              notification_link
              is_read
              content
              created_at
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
      return props.notificationPaging && props.notificationPaging.notifications
    },
    getFragmentVariables(prevVars: any, totalCount: any) {
      console.log('in getFragmentVariables', prevVars, totalCount)
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      console.log('in getVariables', props, count, cursor, fragmentVariables)
      return {
        count,
        cursor
      }
    },
    query: graphql.experimental`
      query AllNotificationsPaginationQuery($count: Int!, $cursor: String) {
        notificationPaging {
          ...AllNotifications_notificationPaging
        }
      }
    `
  }
)
