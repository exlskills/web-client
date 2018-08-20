import { MenuDivider, IconName } from '@blueprintjs/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import {
  HeaderAvatar,
  Item,
  ItemWrapper,
  Menu,
  SidebarMenuHeader
} from './styledComponents'
import CollapsibleItem from './CollapsibleItem'
import { MenuHeaderIcon } from './styledComponents'
import { InjectedIntlProps } from 'react-intl'
import { setMobileSidebarData } from '../../store/actions'
import { createStructuredSelector } from 'reselect'
import { RouteComponentProps, withRouter } from 'react-router'
import { replacePathSuffix } from 'common/utils/routes'
import { injectIntl } from 'react-intl'
import { isMobile } from 'common/utils/screen'
import PlainLink from 'common/components/PlainLink'

export interface ISidebarItem {
  pathExt?: string
  text?: string
  iconName?: IconName
  avatarName?: string
  avatarSrc?: string
  isHeader?: boolean
  isDivider?: boolean
  submenu?: any
}

interface IProps {
  large?: boolean
  items: ISidebarItem[]
  pathExt: string
  basePath: string
}

interface IStates {
  mobile: boolean
}

interface IStateToProps {}

interface IDispatchToProps {
  setMobileSidebarData: typeof setMobileSidebarData
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setMobileSidebarData
    },
    dispatch
  )
})

type MergedProps = IProps &
  IDispatchToProps &
  IStateToProps &
  RouteComponentProps<any>

class SideBarMenu extends React.PureComponent<MergedProps, IStates> {
  static defaultProps = {
    large: false
  }

  constructor(props: MergedProps) {
    super(props)
    this.state = {
      mobile: isMobile()
    }
  }

  updateIsMobile = () => {
    this.setState({ mobile: isMobile() })
    if (this.state.mobile) {
      this.deferToGlobalNavbar(this.props)
    }
  }

  componentWillReceiveProps = (p: MergedProps) => {
    if (isMobile()) {
      this.deferToGlobalNavbar(p)
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateIsMobile)
    if (isMobile()) {
      this.deferToGlobalNavbar(this.props)
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateIsMobile)
    this.clearGlobalNavbar()
  }

  getUrl = (value: string) => {
    return replacePathSuffix(this.props.basePath, value)
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
    if (isDivider) {
      return <MenuDivider key={idx} />
    } else if (isHeader) {
      return (
        <SidebarMenuHeader key={idx}>
          {iconName && <MenuHeaderIcon iconName={iconName} />}
          {avatarName &&
            <HeaderAvatar size={30} name={avatarName} src={avatarSrc} />}
          {/* TODO put text and avatar on the same line*/}
          <span>
            {text}
          </span>
        </SidebarMenuHeader>
      )
    } else if (submenu) {
      return (
        <CollapsibleItem
          key={idx}
          iconName={iconName}
          text={text}
          items={submenu}
          active={this.props.pathExt === pathExt}
          value={this.props.pathExt}
        />
      )
    }

    return (
      <PlainLink key={idx} to={this.getUrl(pathExt)}>
        <ItemWrapper>
          <Item iconName={iconName} active={this.props.pathExt === pathExt}>
            <span>
              {text}
            </span>
          </Item>
        </ItemWrapper>
      </PlainLink>
    )
  }

  deferToGlobalNavbar = (p: MergedProps) => {
    p.setMobileSidebarData({
      items: p.items,
      pathExt: p.pathExt,
      basePath: p.basePath
    })
  }

  clearGlobalNavbar = () => {
    this.props.setMobileSidebarData({
      items: [],
      pathExt: undefined,
      basePath: undefined
    })
  }

  render() {
    const { large } = this.props
    const { mobile } = this.state

    return mobile
      ? <div />
      : <Menu large={large}>
          {this.props.items.map(this.renderItem)}
        </Menu>
  }
}

export default connect<IStateToProps, IDispatchToProps, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withRouter<any>(SideBarMenu)))
