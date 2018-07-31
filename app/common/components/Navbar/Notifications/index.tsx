import Loading from 'common/components/Loading'
import * as React from 'react'
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

import NotificationsContainer from './Notifications'

const { graphql } = require('react-relay/compat')
const rootQuery = graphql`
  query NotificationsDropdownQuery {
    notificationPaging {
      ...Notifications_notif
    }
  }
`

interface IProps {
  theme: string
}
interface IStates {}

class NotificationsDropdown extends React.Component<IProps, IStates> {
  queryRender = ({ error, props }: { error: Error; props: any }) => {
    if (error) {
      return (
        <div>
          {error.message}
        </div>
      )
    }

    if (!props) {
      return <Loading mt="0" />
    }

    return <NotificationsContainer {...props} />
  }

  render() {
    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          theme: this.props.theme
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default NotificationsDropdown
