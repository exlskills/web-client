import { CenterContainer } from 'common/components/styledComponents'
import styled, { ThemedOuterStyledProps } from 'styled-components'
import { Dialog, IDialogProps } from '@blueprintjs/core'
import { Flex, FlexProps } from 'grid-styled'

export const Wrapper = styled(Dialog)`
  max-width: 1300px;
  width: 85%;
  min-height: 650px;
  padding-bottom: 0;
`

export const DialogContent = styled.div.attrs<IDialogProps>({
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
`

export const SubHeaderText = styled.div.attrs({
  className: 'pt-text-muted'
})`
  margin-top: 0.3rem;
  font-weight: 400;
  font-size: 0.8rem;
  margin-bottom: 8px;
`

export const ResultWrapper = CenterContainer.extend`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  height: auto;
  h3 {
    margin-bottom: 15px;
  }
  .pt-icon {
    margin-right: 10px;
  }
`
