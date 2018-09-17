import styled from 'styled-components'
import { Dialog } from '@blueprintjs/core'
import { Flex, FlexProps } from 'grid-styled'

export const Wrapper = styled(Dialog)`
  max-width: 1300px;
  width: 85%;
  min-height: 500px;
  padding-bottom: 0;
`

export const DialogContent = styled.div.attrs({
  className: 'pt-dialog-body'
})`
  position: relative;
  margin: 0;
  height: 100%;
`

export const Header = styled(Flex).attrs<FlexProps>({
  column: true,
  justify: 'space-between',
  align: 'flex-start'
})`
  margin-top: 0.4rem;
`
export const ConceptMesssage = styled.div`
  position: relative;
  font-size: 1em;
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
`

export const SubHeaderText = styled.p`
  margin-top: 0.3rem;
  font-weight: 400;
  font-size: 0.8rem;
`
