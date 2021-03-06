import { ContentWrapper } from 'common/components/styledComponents'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'
import * as ReactSplitPane from 'react-split-pane'
import { mobileBPCSS } from '../../common/utils/screen'

export const Wrapper = ContentWrapper.extend.attrs({
  column: false
})`
  padding: 0;
`

export const SidebarBox = styled(Flex).attrs({
  justify: 'flex-start',
  column: true
})`
  padding: 0;
  background-color: ${props => props.theme.background};
  height: 100%;
`

export const ContentsBox = styled(Box).attrs({
  px: 2
})`
  width: 100%;
  font-size: 14px;
  max-width: 800px;
  padding: 34px;
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
