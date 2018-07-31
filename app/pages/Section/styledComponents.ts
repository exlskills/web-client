import { Button } from '@blueprintjs/core'
import styled from 'styled-components'

export const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

export const Card = styled.div.attrs({
  className: 'pt-card'
})`
  min-height: 300px;
  width: 100%;
  margin-bottom: 2rem;
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
`

export const HintWrapper = styled.div`margin-top: 10px;`

export const FixedSectionNavigate = styled.div`
  background-color: ${props => props.theme.background};
  z-index: 9;
  margin-bottom: 2px;
`
export const ExamQuestionWrapper = styled.div``
