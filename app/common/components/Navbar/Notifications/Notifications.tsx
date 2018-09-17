import {
  Button,
  Intent,
  Menu,
  MenuDivider,
  Popover,
  Position
} from '@blueprintjs/core'
import ReadNotificationMutation from 'common/mutations/ReadNotificationMutation'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { createRefetchContainer } from 'react-relay'
import { RouteComponentProps, withRouter } from 'react-router'

import messages from './messages'
import NotificationItem, { IProps as NotifItemProps } from './NotificationItem'
import { Footer, Header, UnreadBadge } from './styledComponents'

const { graphql } = require('react-relay/compat')
interface IProps {
  relay: any
  notificationPaging: {
    notifications: {
      edges: {
        node: any
      }[]
    }
  }
  theme: string
}
interface IStates {
  popoverOpen: boolean
}

class NotificationsDropdown extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  state: IStates = {
    popoverOpen: false
  }

  private _reload() {
    const refetchVariables = (fragmentVariables: any) => fragmentVariables
    this.props.relay.refetch(refetchVariables, null)
  }

  handleArchiveAll = () => {
    ReadNotificationMutation('all').then(res => {
      this.togglePopover()
      this._reload()
    })
  }

  handleNotificationClick = (notif: any) => () => {
    ReadNotificationMutation(notif.id).then(res => {
      this.togglePopover()
      this._reload()
      this.props.history.push(notif.notification_link)
    })
  }

  handleViewAllNotifications = () => {
    this.togglePopover()
    this.props.history.push('/notifications')
  }

  private handleInteraction = (nextOpenState: boolean) => {
    this.setState({ popoverOpen: nextOpenState })
  }
  private onPopoverInteraction = (state: boolean) =>
    this.handleInteraction(state)

  togglePopover = () => {
    if (!this.state.popoverOpen) {
      this._reload()
    }
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }

  renderNotifications(notifications: NotifItemProps[]) {
    const { formatMessage } = this.props.intl

    return (
      <Menu>
        <Header>
          <h6>
            {formatMessage(messages.headerTitle)}
          </h6>
          <div>
            {notifications.length > 0 &&
              <Button
                className="pt-minimal"
                intent={Intent.PRIMARY}
                iconName="inbox"
                text={formatMessage(messages.archiveButton)}
                onClick={this.handleArchiveAll}
              />}
          </div>
        </Header>
        <MenuDivider />
        {notifications.map(notif =>
          <NotificationItem
            key={notif.id}
            {...notif}
            onClick={this.handleNotificationClick(notif)}
          />
        )}
        <Footer onClick={this.handleViewAllNotifications}>
          {formatMessage(messages.lbViewAllNotifications)}
        </Footer>
      </Menu>
    )
  }

  render() {
    let notifications: any = []
    if (this.props.notificationPaging) {
      notifications = this.props.notificationPaging.notifications.edges.map(
        item => ({
          id: item.node.id,
          title: item.node.content,
          // description: '',
          notification_link: item.node.notification_link,
          iconName: '',
          date: item.node.created_at,
          unread: !item.node.is_read
        })
      )
    }

    return (
      <Popover
        isOpen={this.state.popoverOpen}
        onInteraction={this.onPopoverInteraction}
        popoverClassName={`pt-minimal ${this.props.theme == 'pt-dark'
          ? 'pt-dark'
          : ''}`}
        position={Position.BOTTOM_RIGHT}
        content={this.renderNotifications(notifications)}
      >
        <div>
          <Button
            className={'pt-minimal'}
            iconName={'notifications'}
            onClick={this.togglePopover}
          />
          {notifications.length > 0 &&
            <UnreadBadge intent={Intent.DANGER}>
              {notifications.length}
            </UnreadBadge>}
        </div>
      </Popover>
    )
  }
}

export default createRefetchContainer<any>(
  injectIntl(withRouter(NotificationsDropdown)),
  {
    notificationPaging: graphql.experimental`
      fragment Notifications_notif on notificationPaging
        @argumentDefinitions(count: { type: "Int", defaultValue: 5 }) {
        notifications(first: $count, resolverArgs: [{ param: "unread" }]) {
          edges {
            node {
              id
              notification_link
              is_read
              content
              created_at
            }
          }
        }
      }
    `
  },
  graphql.experimental`
    query NotificationsRefetchQuery($count: Int) {
      notificationPaging {
        ...Notifications_notif @arguments(count: $count)
      }
    }
  `
)
