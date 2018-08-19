import * as React from 'react'
import { MenuDivider, IconName } from '@blueprintjs/core'
import { ISidebarItem } from '../../SideBarMenu'
import { ITopNavItem } from '../index'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { slide as BurgerMenu } from 'react-burger-menu'
import {
  HeaderAvatar,
  Item,
  ItemWrapper,
  Menu,
  BurgerButton,
  SidebarMenuHeader,
  MenuHeaderIcon,
  InnerItem
} from './styledComponents'
import { RouteComponentProps, withRouter } from 'react-router'
import { replacePathSuffix } from '../../../utils/routes'

interface IProps {
  topNavItems: ITopNavItem[]
  mobileSidebarItems: ISidebarItem[]
  basePath: string
  pathExt: string
  large?: boolean
}

interface IStates {
  menuOpen: boolean
}

type MergedProps = IProps & InjectedIntlProps & RouteComponentProps<any>

// NOTE: Unable to use styled components for this as is it part of the react-burger-menu lib requirements
const bmStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '0px',
    height: '0px',
    right: '0px',
    top: '0px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#27496f',
    paddingTop: '2em',
    paddingRight: '0',
    paddingLeft: '0',
    fontSize: '1.15em'
  },
  bmMenuWrap: {
    marginTop: '-34px'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0',
    paddingTop: '0.8em',
    height: 'unset'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    top: '0',
    left: '0'
  }
}

class MobileSidebar extends React.PureComponent<MergedProps, IStates> {
  static defaultProps = {
    large: true
  }

  constructor(props: MergedProps) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange = (state: any) => {
    this.setState({ menuOpen: state.isOpen })
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu = () => {
    this.setState({ menuOpen: false })
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleClick = (value: string) => () => {
    this.props.history.push(replacePathSuffix(this.props.basePath, value))
    this.closeMenu()
  }

  handleTopNavItemClick = (path: string) => () => {
    this.props.history.push(path)
    this.closeMenu()
  }

  renderItems = () => {
    const { mobileSidebarItems, topNavItems } = this.props

    return (
      <div>
        {topNavItems &&
          topNavItems.map((item, idx) => {
            return (
              <ItemWrapper key={idx}>
                <Item
                  onClick={this.handleTopNavItemClick(item.path)}
                  iconName={item.iconName}
                  active={item.active}
                >
                  <span>
                    {item.text}
                  </span>
                </Item>
              </ItemWrapper>
            )
          })}
        {mobileSidebarItems &&
          mobileSidebarItems.map((item, idx) => this.renderItem(item, idx))}
      </div>
    )
  }

  renderItem = (
    {
      isHeader,
      isDivider,
      pathExt,
      text,
      iconName,
      avatarName,
      avatarSrc,
      submenu
    }: ISidebarItem,
    idx: number
  ) => {
    if (isDivider || (isHeader && iconName == ('book' as IconName))) {
      return <span key={idx} />
    } else if (isHeader) {
      return (
        <SidebarMenuHeader key={idx}>
          {iconName && <MenuHeaderIcon iconSize={20} iconName={iconName} />}
          {avatarName &&
            <HeaderAvatar size={20} name={avatarName} src={avatarSrc} />}
          <span>
            {text}
          </span>
        </SidebarMenuHeader>
      )
    }
    // return <MenuItem text={text} submenu={submenu} />
    return (
      <ItemWrapper key={idx}>
        <InnerItem
          onClick={this.handleClick(pathExt)}
          iconName={iconName}
          active={this.props.pathExt === pathExt}
          style={{
            borderBottomWidth:
              this.props.mobileSidebarItems.length - 1 === idx
                ? '0px'
                : undefined
          }}
        >
          <span>
            {text}
          </span>
        </InnerItem>
      </ItemWrapper>
    )
  }

  render() {
    return (
      <div>
        <BurgerButton iconName={'menu'} onClick={this.toggleMenu} />
        <BurgerMenu
          styles={bmStyles}
          right={true}
          onStateChange={(state: any) => this.handleStateChange(state)}
          isOpen={this.state.menuOpen}
          itemListClassName={'bm-item-list pt-dark'}
        >
          <Menu large={this.props.large}>
            {this.renderItems()}
          </Menu>
        </BurgerMenu>
      </div>
    )
  }
}

export default injectIntl(withRouter<any>(MobileSidebar))
