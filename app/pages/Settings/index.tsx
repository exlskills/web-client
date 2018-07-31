import * as React from 'react'
import { injectIntl } from 'react-intl'
import Helmet from 'react-helmet'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { RouteComponentProps } from 'react-router'
import { ContentsBox, SidebarBox, SplitPane, Wrapper } from './styledComponents'
import { Switch, Route } from 'react-router-dom'
import { Help, Profile, Auth } from './loaders'
import { removeTrailingSlash } from 'common/utils/routes'
import requireAuthentication from 'routes/requireAuthentication'
import SideBarMenu from '../../common/components/SideBarMenu'
import messages from './messages'

interface IProps {}

@requireAuthentication(1)
class SectionPage extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  {}
> {
  render() {
    const { formatMessage } = this.props.intl

    return (
      <Wrapper>
        <Helmet>
          <title>
            {formatMessage(messages.pageTitle)}
          </title>
        </Helmet>
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
                  text: formatMessage(messages.personalSettingsHeader),
                  iconName: 'cog'
                },
                {
                  isDivider: true
                },
                {
                  text: formatMessage(messages.profileItem),
                  pathExt: '/settings',
                  iconName: 'user'
                },
                {
                  text: formatMessage(messages.authItem),
                  pathExt: '/settings/auth',
                  iconName: 'lock'
                },
                { isDivider: true },
                {
                  text: formatMessage(messages.helpItem),
                  pathExt: '/settings/help',
                  iconName: 'help'
                }
              ]}
              basePath={'/'}
              pathExt={removeTrailingSlash(this.props.location.pathname)}
            />
          </SidebarBox>
          <ContentsBox>
            <Switch>
              <Route exact={true} path="/settings" component={Profile} />
              <Route exact={true} path="/settings/auth" component={Auth} />
              <Route exact={true} path="/settings/help" component={Help} />
            </Switch>
          </ContentsBox>
        </SplitPane>
      </Wrapper>
    )
  }
}

export default injectIntl(SectionPage)
