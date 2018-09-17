import styled from 'styled-components'
import { ContentWrapper } from 'common/components/styledComponents'
import { Flex, FlexProps, Box, BoxProps } from 'grid-styled'
import ReactSplitPane from 'react-split-pane'
import { mobileBPCSS } from '../../common/utils/screen'

export const Wrapper = ContentWrapper.extend`padding: 0;`

export const NotificationTime = styled.div`
  margin-top: 9px;
  float: right;
  margin-left: auto;
`

export const SidebarBox = styled(Flex).attrs<FlexProps>({
  justify: 'flex-start',
  column: true
})`
  padding: 0;
  background-color: ${props => props.theme.background};
  height: 100%;
`

export const ContentsBox = styled(Box).attrs<BoxProps>({
  px: 2
})`
  width: 100%;
  font-size: 14px;
  max-width: 800px;
  margin: auto;
  margin-top: 34px;
`

export const SplitPane = styled(ReactSplitPane).attrs({
  pane1Style: { height: '100%' as any }
})`
  height: calc(100% - 50px) !important;
  overflow: auto !important;
  
  @media only screen and (max-width: ${mobileBPCSS}) {
      .Pane1 {
        width: 0px !important;
      }
  }
`

export const NotificationsList = styled.ul`
  list-style: none;
  padding: 0;
`
interface NotificationItemProps {
  unread: boolean
}
export const NotificationItem = styled.li`
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
  &:hover a {
    background-color: ${(props: NotificationItemProps) =>
      props.unread ? 'rgba(47, 88, 136, 0.1)' : 'rgba(150, 150, 150, 0.1)'};
  }
  a {
    background-color: ${(props: NotificationItemProps) =>
      props.unread
        ? 'rgba(54, 113, 182, 0.1)'
        : propsx => propsx.theme.background};
    padding: 10px;
    display: block;
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }
`
