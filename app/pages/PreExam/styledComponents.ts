import { Button, Intent } from '@blueprintjs/core'
import { Box, Flex } from 'grid-styled'
import * as ReactSplitPane from 'react-split-pane'
import styled from 'styled-components'
export const Wrapper = styled.div``
export const TakeButton = styled(Button).attrs({
  intent: Intent.SUCCESS,
  className: 'pt-large'
})`
   margin-bottom: 0.4rem;
`
export const CancelButton = styled(Button).attrs({
  intent: Intent.DANGER,
  className: 'pt-large'
})`
     margin-bottom: 0.4rem;
     margin-left: 5%;
  `
export const SectionContent = styled.div`
  width: 50%;
  display: block;
  margin: auto;
  padding-left: 1%;
`
export const CenterSection = styled.div`
  width: 50%;
  display: block;
  margin: auto;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 4px 8px rgba(16, 22, 26, 0.2),
    0 18px 46px 6px rgba(16, 22, 26, 0.2);
  background: #ebf1f5;
  width: 500px;
  padding-bottom: 10px;
  padding-top: 20px;
  user-select: initial;
`
export const SectionButton = styled.div`
  margin: auto;
  display: block;
  width: 50%;
  padding: 10px;
`
