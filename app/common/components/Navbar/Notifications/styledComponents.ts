import styled from 'styled-components'
import { Tag, Text } from '@blueprintjs/core'
import { Flex } from 'grid-styled'

interface NotifItemProps {
  iconName: string
  unread: boolean
}

// TODO: add on active/hover colors
export const NotificationItemWrapper = styled.button.attrs<NotifItemProps>({
  className: (props: NotifItemProps) => `pt-menu-item pt-icon-${props.iconName}`
})`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 400px;
  ${props => !props.unread && 'background-color:#e5efff !important;'}
`

export const UnreadBadge = styled(Tag)`
  border-radius: 12px !important;
  z-index: 9999;
  position: absolute;
  top: -5px;
  left: 18px;
`

export const Header = styled.li.attrs({
  className: 'pt-menu-header'
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const IconWrapper = styled(Flex).attrs({
  align: 'center',
  justify: 'center',
  width: 1 / 7
})`
  margin-right: 0.4rem;
`

export const NotifItemTitle = styled(Text)`
  font-weight: bold;
  1.1rem;
`

export const DateWrapper = styled(Flex).attrs({
  align: 'center',
  justify: 'flex-end',
  className: 'pt-text-muted',
  width: 1,
  mt: '0.4rem'
})``

export const NotifContent = styled(Flex).attrs({
  column: true,
  justify: 'space-around',
  align: 'flex-start',
  className: 'pt-text-overflow-ellipsis',
  width: 6 / 7
})``

// TODO: hide text overflow with ellipsis after 2 lines using webkit-line-clamp
export const NotifDesc = styled.div.attrs({
  className: 'pt-text-overflow-ellipsis'
})`
  margin-top: 0.2rem;
  width: 100%;
`

export const Footer = styled.button.attrs({
  className: 'pt-menu-item'
})`
  text-align: center !important;
  width: 100%;
`
