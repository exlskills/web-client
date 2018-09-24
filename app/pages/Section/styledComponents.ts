import { Button, IPopoverProps, Popover } from '@blueprintjs/core'
import styled from 'styled-components'
import * as ReactSplitPane from 'react-split-pane'
import { CenterContainer } from 'common/components/styledComponents'
import { mobileBPCSS } from 'common/utils/screen'

export const Wrapper = styled(CenterContainer)`
  @media only screen and (max-width: ${mobileBPCSS}) {
    padding: 0;
  }
`

export const InnerWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
  @media only screen and (max-width: ${mobileBPCSS}) {
    padding-left: 0px;
    padding-right: 0px;
  }
`

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

export const Card = styled.div.attrs({
  className: 'pt-card'
})`
  min-height: 300px;
  width: 100%;
  margin-bottom: 90px;
  background-color: ${props => props.theme.contentBackground} !important;
`

export const CardContent = styled.pre`
  word-break: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
`

export const DiscussionWrapper = styled.div`
  padding: 0 20px;
  margin-bottom: 30px;
`

export const ResultPopoverContent = styled.div`padding: 10px;`
export const ErrorResult = styled.span`color: red;`
export const WrongResult = styled.div`
  color: orange;
  text-align: center;
`
export const CorrectResult = styled.span`color: green;`
export const ResultButton = styled(Button)`
  margin-top: 0.5rem;
  margin-right: 8px;
  &::last-child {
    margin-right: 0;
  }
`

export const ActionButton = styled(Button)`
  margin-right: 10px;
  @media (max-width: 769px) {
    width: 50%;
    margin-right: 0;
  }
`

export const ImportantActionButton = styled(Button)`
  margin-right: 10px;
  @media (max-width: 769px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
`

export const HintWrapper = styled.div`margin-top: 10px;`

export const FixedSectionNavigate = styled.div`
  background-color: ${props => props.theme.background};
  z-index: 9;
  margin-bottom: 2px;
`
export const ExamQuestionWrapper = styled.div``
export const ExamWrapper = styled.div`
  background-color: ${props => props.theme.questionBackground};
`

export const ActionButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 769px) {
    flex-direction: column;
  }
`

export const ActionButtonGroup = styled.div`
  width: 50%;
  @media (max-width: 769px) {
    width: 100%;
  }
`

export const AnswerButtonPopover = styled(Popover).attrs<IPopoverProps>({})`
  @media (max-width: 769px) {
    &.pt-popover-target {
      width: 100%;
    }
  }
`
