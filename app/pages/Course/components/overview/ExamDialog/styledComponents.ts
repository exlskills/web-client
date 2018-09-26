import { CenterContainer } from 'common/components/styledComponents'
import styled from 'styled-components'
import { Dialog, IDialogProps, IPopoverProps, Popover } from '@blueprintjs/core'
import { Flex } from 'grid-styled'

export const Wrapper = styled(Dialog)`
  max-width: 1300px;
  width: 85%;
  min-height: 650px;
  padding-bottom: 0;
  height: 90%;
  margin-top: 0px;
  
  @media (max-width: 768px) {
    width: 100%;
    height: unset;
    margin: 0;
    top: 0;
    bottom: 0;
    border-radius: 0;
  }
`

export const DialogContent = styled.div.attrs({
  className: 'pt-dialog-body'
})`
  margin: 0;
`

export interface IFooterWrapperProps {
  isMobile?: boolean
  examCardOpen?: boolean
}

export const DialogContentInner = styled.div.attrs<IFooterWrapperProps>({})`
  position: absolute;
  width: 100%;
  ${props => {
    if (props.isMobile && props.examCardOpen) {
      return `height: calc(100% - 60px);`
    } else if (props.isMobile) {
      return `height: calc(100% - 200px);`
    } else if (props.examCardOpen) {
      return `height: calc(100% - 60px);`
    } else {
      return `height: calc(100% - 110px);`
    }
  }}
  overflow-y: scroll;
`

export const Header = styled(Flex).attrs({
  column: true,
  justify: 'space-between',
  align: 'flex-start'
})`
  margin-top: 0.4rem;
`

export const FooterWrapper = styled.div.attrs<IFooterWrapperProps>({})`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
  ${props => {
    if (props.isMobile && props.examCardOpen) {
      return `height: 60px;`
    } else if (props.isMobile) {
      return `height: 240px;`
    } else if (props.examCardOpen) {
      return `height: 60px;`
    } else {
      return `height: 110px;`
    }
  }}
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
