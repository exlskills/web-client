import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import Helmet from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ContentsBox, SidebarBox, SplitPane, Wrapper } from './styledComponents'
import { Switch, Route } from 'react-router-dom'
import { Help, Profile, Billing, Privacy } from './loaders'
import { removeTrailingSlash } from 'common/utils/routes'
import requireAuthentication from 'routes/requireAuthentication'
import { SideBarMenu } from '../../common/components/loaders'
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
                  text: formatMessage(messages.privacyItem),
                  pathExt: '/settings/privacy',
                  iconName: 'lock'
                },
                {
                  text: formatMessage(messages.billingItem),
                  pathExt: '/settings/billing',
                  iconName: 'credit-card'
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
              <Route
                exact={true}
                path="/settings/privacy"
                component={Privacy}
              />
              <Route
                exact={true}
                path="/settings/billing"
                component={Billing}
              />
              <Route exact={true} path="/settings/help" component={Help} />
            </Switch>
          </ContentsBox>
        </SplitPane>
      </Wrapper>
    )
  }
}

export default injectIntl(SectionPage)
