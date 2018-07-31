import { Button } from '@blueprintjs/core'
import { Box, Flex } from 'grid-styled'
import * as ReactSplitPane from 'react-split-pane'
import styled from 'styled-components'
import { StickyContainer } from 'react-sticky'

export const Wrapper = styled.div``

export const SplitPane = styled(ReactSplitPane).attrs({
  pane1Style: { height: '100%' as any }
})`
  height: calc(100% - 50px) !important;
  overflow: auto !important;
`

export const RightPanelWrapper = styled(StickyContainer)`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
  padding-bottom: 20px;
`

export const ContentWrapper = styled(Flex).attrs({
  column: true,
  align: 'center'
})``

export const HeaderWrapper = styled(Flex).attrs({
  // justify: 'space-between',
  align: 'center',
  // py: '0.7rem',
  px: '20px'
})`
  background-color: ${props => props.theme.background};
  z-index: 10;
  width: 100%;
  margin-bottom: 5px;
`

export const Goback = styled(Button)`
  margin-right: 10px;
  .pt-icon {
    margin-right: 10px;
  }
`

export const Navigator = styled.div`
  flex: 1;
  text-align: center;
`

export const QuestionWrapper = styled(Box).attrs({
  width: [1, 1, 3 / 4]
})`
max-height: ${window.innerHeight - 210}px;
height: ${window.innerHeight - 210}px;
`

export const ExamWrapper = styled.div`
  height: inherit;
  max-height: inherit;
`
