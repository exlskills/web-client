import { CenterContainer } from 'common/components/styledComponents'
import styled from 'styled-components'
import { Dialog, Icon, IDialogProps } from '@blueprintjs/core'
import { Flex } from 'grid-styled'

export const Wrapper = styled(Dialog)`
  max-width: 1300px;
  width: 85%;
  min-height: 650px;
  padding-bottom: 0;
  
  @media (max-width: 769px) {
    width: 100%;
    margin: 0;
    top: 0;
    bottom: 0;
    border-radius: 0;
  }
`

export const DialogContent = styled.div.attrs({
  className: 'pt-dialog-body'
})`
  padding: 20px;
  margin: 0;
`

export const DialogContentInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

export const Header = styled(Flex).attrs({
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
    color: #333;
    margin-bottom: 15px;
  }
  .pt-icon {
    margin-right: 10px;
  }
`
