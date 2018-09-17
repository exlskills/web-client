import styled from 'styled-components'
import ReactSplitPane from 'react-split-pane'
import { CenterContainer } from 'common/components/styledComponents'
import { mobileBPCSS } from 'common/utils/screen'

export const Wrapper = styled(CenterContainer)``

export const CardWrapper = styled.div.attrs({
  className: 'pt-card'
})`
  width: 100%;
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
