import Loading from 'common/components/Loading'
import * as React from 'react'
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { DEFAULT_PAGE_SIZE } from 'common/constants'
import requireAuthentication from 'routes/requireAuthentication'
import { Switch, Route } from 'react-router-dom'

import AllNotifications from './AllNotifications'
import messages from './messages'
import { removeTrailingSlash } from '../../common/utils/routes'
import { SplitPane, Wrapper, SidebarBox, ContentsBox } from './styledComponents'
import { SideBarMenu } from '../../common/components/loaders'
import { RouteComponentProps } from 'react-router'

import { InjectedIntlProps, injectIntl } from 'react-intl'

const { graphql } = require('react-relay/compat')
const rootQuery = graphql`
  query NotificationsQuery($count: Int!, $cursor: String) {
    notificationPaging {
      ...AllNotifications_notificationPaging
    }
  }
`

interface IProps {}

interface IStates {
  count: number
}

@requireAuthentication(1)
class Notifications extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  state: IStates = {
    count: DEFAULT_PAGE_SIZE
  }

  render() {
    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          count: this.state.count
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
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
      return <Loading mt="0" />
    }

    // return <NotificationsContainer {...props} />
    const { formatMessage } = this.props.intl
    const parentProps = this.props
    // const allNotificationsWithProps = cloneElement(NotificationsContainer, {...props})

    return (
      <Wrapper>
        <SplitPane
          defaultSize={250}
          pane2Style={{ overflowY: 'overlay' as any, width: '100%' as any }}
        >
          <SidebarBox>
            <SideBarMenu
              large={true}
              items={[
                {
                  isHeader: true,
                  text: formatMessage(messages.sidebarTitle),
                  iconName: 'notifications'
                },
                {
                  isDivider: true
                },
                {
                  text: formatMessage(messages.sidebarAllNotifications),
                  pathExt: '/notifications',
                  iconName: 'history'
                }
              ]}
              basePath={'/'}
              pathExt={removeTrailingSlash(this.props.location.pathname)}
            />
          </SidebarBox>
          <ContentsBox>
            <Switch>
              <Route
                exact={true}
                path="/notifications"
                render={fwdProps => {
                  console.log(fwdProps)
                  console.log(props)
                  const mergedProps = Object.assign({}, props, fwdProps)
                  return <AllNotifications {...mergedProps} />
                }}
              />
            </Switch>
          </ContentsBox>
        </SplitPane>
      </Wrapper>
    )
  }
}

export default injectIntl(Notifications)
