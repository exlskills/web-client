import Loading from 'common/components/Loading'
import * as React from 'react'
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

import NotificationsContainer from './Notifications'
import { handleQueryRender } from 'common/utils/relay'

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
  queryRender = handleQueryRender(({ props }: { props: any }) => {
    return <NotificationsContainer {...props} />
  })

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
