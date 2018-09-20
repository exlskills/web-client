import { CenterContainer } from 'common/components/styledComponents'
import styled from 'styled-components'
import {
  Button,
  Dialog,
  Icon,
  IDialogProps,
  MenuDivider,
  NumericInput
} from '@blueprintjs/core'
import { Flex } from 'grid-styled'
import { mobileBPCSS } from '../../utils/screen'

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
  margin: 20px;
`

export const DialogContentInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
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

interface IDialogDividerProps {
  hide?: boolean
}

export const DialogDivider = styled(MenuDivider).attrs<IDialogDividerProps>({})`
  margin: 16px 0;
  ${props => (props.hide ? 'display: none;' : '')}
`

export const BuyCreditsForm = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: ${mobileBPCSS}) {
    flex-direction: column;
  }
`

export const PurchaseCreditsNumericInput = styled(NumericInput)`
  @media only screen and (max-width: ${mobileBPCSS}) {
    width: 100%;
  }
`

export const PurchaseCreditsButton = styled(Button)`
  margin-left: 4px;
  @media only screen and (max-width: ${mobileBPCSS}) {
    width: 100%;
    margin-top: 8px;
    margin-left: 0px;
  }
`
