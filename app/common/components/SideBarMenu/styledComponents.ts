import { Collapse, Icon } from '@blueprintjs/core'
import styled from 'styled-components'

const UserAvatar = require('react-user-avatar') as any

interface MenuProps {
  large?: boolean
}

export const Menu = styled.ul.attrs<MenuProps>({
  className: (props: MenuProps) => `pt-menu ${props.large && 'pt-large'}`
})`
  overflow-x: auto;
  border-radius: 0px;
  padding: 0px;
`

interface ItemProps {
  active?: boolean
  iconName?: string
}

export const ItemWrapper = styled.li``

export const Item = styled.a.attrs<ItemProps>({
  className: (props: ItemProps) =>
    `pt-menu-item ${props.active && 'pt-active'} ${props.iconName &&
      `pt-icon-${props.iconName}`}`
})`
  padding-left: 10px !important;
  border-radius: 0px;
  
  &.pt-active,
  &.pt-active:hover {
    
  }

  &:active,
  &:hover {
    background: rgba(0, 133, 200, 0.1);
  }
`
export const ItemText = Item.withComponent('span')

export const MenuHeader = styled.li.attrs({
  className: 'pt-menu-header'
})``

interface CollapseItemProps {
  isOpen?: boolean
  ml?: any
}
export const CollapseItem = styled(Collapse).attrs<CollapseItemProps>({})`
  .pt-collapse-body {
    margin-top: 5px;
  }
  margin-left: ${(props: CollapseItemProps) => (props.ml ? props.ml : 0)};
`

export const SidebarMenuHeader = styled(MenuHeader)`
  font-size: 16px;
  padding-top: 12px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  div {
    flex: 0 0 40px;
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const MenuHeaderIcon = styled(Icon)`
  margin-left: 6px;
  margin-right: 8px;
`

export const HeaderAvatar: any = styled(UserAvatar)`
  margin-left: 6px;
  margin-right: 8px;
`
