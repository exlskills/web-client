import * as React from 'react'
import { LoginSignupButton, UserButton } from './styledComponents'
import messages from './messages'
import { injectIntl } from 'react-intl'
import {
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Position
} from '@blueprintjs/core'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { getViewer } from '../../utils/viewer'
import { isMobile } from '../../utils/screen'
import styled from 'styled-components'
const UserAvatar = styled(require('react-user-avatar') as any).attrs<any>({})`
  .UserAvatar--img {
    background-color: #FFF
  }
`

interface IProps {
  onLogoutClick: () => void
  onSettingsClick: () => void
  onLoginClick: () => void
  isDemoUser: boolean
}
class SettingsDropdown extends React.Component<
  IProps & InjectedIntlProps,
  void
> {
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  renderMenu() {
    const {
      onLogoutClick,
      onSettingsClick,
      intl: { formatMessage }
    } = this.props

    return (
      <Menu>
        <MenuItem
          iconName="cog"
          text={formatMessage(messages.settingsDropdownSettings)}
          onClick={onSettingsClick}
        />
        <MenuDivider />
        <MenuItem
          iconName="log-out"
          text={formatMessage(messages.settingsDropdownLogout)}
          onClick={onLogoutClick}
        />
      </Menu>
    )
  }

  getUserAvatarName = () => {
    const viewer = getViewer()
    return viewer.full_name
      ? viewer.full_name
      : viewer.username
        ? viewer.username
        : viewer.user_id ? viewer.user_id : 'Anonymous'
  }

  renderLoggedIn() {
    return (
      <Popover
        popoverClassName="pt-minimal"
        content={this.renderMenu()}
        position={Position.BOTTOM_RIGHT}
      >
        <UserButton>
          <UserAvatar
            src={getViewer('avatar_url')}
            size={30}
            name={this.getUserAvatarName()}
          />
        </UserButton>
      </Popover>
    )
  }

  renderDemoUser() {
    const { formatMessage } = this.props.intl
    return (
      <div>
        <LoginSignupButton onClick={this.props.onLoginClick}>
          {isMobile()
            ? formatMessage(messages.loginSignUpMobile)
            : formatMessage(messages.loginSignUpDesktop)}
        </LoginSignupButton>
      </div>
    )
  }

  render() {
    if (getViewer().is_demo) {
      return this.renderDemoUser()
    }
    return this.renderLoggedIn()
  }
}

export default injectIntl<IProps>(SettingsDropdown)
