import * as React from 'react'

import { CenterContainer } from 'common/components/styledComponents'
import { NavItem } from './styledComponents'
import { getFirstPath } from 'common/utils/routes'
import Logo from './Logo'
import NavbarRight from './NavbarRight'
import { RouteComponentProps, withRouter } from 'react-router'
import messages from './messages'
import { Button, IconName } from '@blueprintjs/core'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { isMobile } from 'common/utils/screen'

interface IProps {}

interface IStates {
  mobile: boolean
}

export interface ITopNavItem {
  active: boolean
  text: string
  iconName: IconName
  path: string
}

type MergedProps = IProps & RouteComponentProps<string> & InjectedIntlProps

class Navbar extends React.PureComponent<MergedProps, IStates> {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props: MergedProps) {
    super(props)
    this.state = {
      mobile: isMobile()
    }
  }

  handleNavItemClick = (path: string) => () => {
    this.props.history.push(path)
  }

  updateIsMobile = () => {
    this.setState({ mobile: isMobile() })
  }

  changeRoute = (route: string) => () => {
    this.props.history.push(route)
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateIsMobile)
    document.body.classList.toggle('pad-top', true)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMobile)
    document.body.classList.remove('pad-top')
  }

  render() {
    const { formatMessage } = this.props.intl
    const { mobile } = this.state

    // TODO: change styling on button active state to make it more visible

    const startingPath = getFirstPath(this.props.location.pathname)

    const topNavItems = [
      {
        active: startingPath === 'dashboard',
        text: formatMessage(messages.navbarDashboard),
        iconName: 'dashboard',
        path: '/dashboard'
      },
      {
        active: startingPath === 'courses',
        text: formatMessage(messages.navbarCourses),
        iconName: 'book',
        path: '/courses'
      }
    ] as ITopNavItem[]
    return (
      <nav className="pt-navbar pt-fixed-top">
        <CenterContainer>
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">
              <Logo onClick={this.changeRoute('/dashboard')} />
            </div>
            {mobile
              ? ''
              : topNavItems.map((item, idx) =>
                  <NavItem
                    active={item.active}
                    text={item.text}
                    icon={item.iconName}
                    onClick={this.handleNavItemClick(item.path)}
                    key={idx}
                  />
                )}
          </div>
          <NavbarRight topNavItems={topNavItems} mobile={mobile} />
        </CenterContainer>
      </nav>
    )
  }
}

export default injectIntl(withRouter(Navbar))
