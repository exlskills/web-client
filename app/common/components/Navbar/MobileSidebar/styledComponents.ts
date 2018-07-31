import styled from 'styled-components'
import { Button, Collapse, Icon } from '@blueprintjs/core'
const UserAvatar = require('react-user-avatar') as any

export const BurgerButton = styled(Icon)`
  margin-left: 8px;
  font-size: 18px;
  cursor: pointer;
`

interface MenuProps {
  large?: boolean
}

export const Menu = styled.ul.attrs<MenuProps>({
  className: (props: MenuProps) => `pt-menu ${props.large && 'pt-large'}`
})`
  overflow-x: auto;
  border-radius: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  background-color: unset !important;
`

interface ItemProps {
  active?: boolean
  iconName?: string
}

export const ItemWrapper = styled.li``

export const Item = styled.a.attrs<ItemProps>({
  className: (props: ItemProps) =>
    `pt-menu-item ${props.active && 'pt-active'} ${props.iconName &&
      `pt-icon-${props.iconName}`} exl-item`
})`
  padding-left: 30px !important;
  border-radius: 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.30);
  
  &.exl-item.pt-active,
  &.exl-item.pt-active:hover {
    color: #ffffff;
    background: unset;
  }

  &.exl-item:active,
  &.exl-item:hover {
    background: unset;
  }
`

export const InnerItem = styled.a.attrs<ItemProps>({
  className: (props: ItemProps) =>
    `pt-menu-item ${props.active && 'pt-active'} ${props.iconName &&
      `pt-icon-${props.iconName}`} exl-inner-item`
})`
  padding-left: 60px !important;
  border-radius: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.30);
  background: rgb(44, 88, 137);
  
  &.exl-inner-item.pt-active,
  &.exl-inner-item.pt-active:hover {
    color: #ffffff;
    background: #0085c8;
  }

  &.exl-inner-item:active,
  &.exl-inner-item:hover {
    background: rgba(41, 84, 128, 1);
  }
`

export const ItemText = Item.withComponent('span')

export const MenuHeader = styled.li.attrs({
  className: 'pt-menu-header'
})`
  border-top: none;
`

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
  padding: 10px 7px;
  display: flex;
  align-items: center;
  margin: 0px;
  padding-left: 30px;
  background: rgb(44, 88, 137);
  border-bottom: 1px solid rgba(0, 0, 0, 0.30) !important;
  
  div {
    flex: 0 0 20px;
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const MenuHeaderIcon = styled(Icon)`
  margin-left: 0px;
  margin-right: 12px;
`

export const HeaderAvatar: any = styled(UserAvatar)`
  margin-left: 0px;
  margin-right: 12px;
`
