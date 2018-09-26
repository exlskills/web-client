import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'
import { Text, Button as Btn, Popover, IPopoverProps } from '@blueprintjs/core'

export const Wrapper = styled.div`padding: 0px 15px;`

export const Row = styled(Box).attrs({
  column: true,
  align: 'flex-start'
})`
  width: 100%;
  & > .pt-popover-target {
    width: 100%;
  }
`

export const AnswerHintRow = styled(Flex)`
  flex-direction: row;
  width: 100%;
  @media (max-width: 769px) {
    flex-direction: column;
  }
`

export const HalfRow = styled.div`
  width: 50%;

  @media (max-width: 769px) {
    width: 100%;
  }
`

export const Title = styled(Text)`
  font-size: 1.2rem;
`
export const HintMesssage = styled(Text)`

`

export const AnswerButtonPopover = styled(Popover).attrs<IPopoverProps>({})`
  @media (max-width: 769px) {
    &.pt-popover-target {
      width: 100%;
    }
  }
`

export const ButtonRow = styled(Box).attrs({
  column: true,
  align: 'flex-start'
})`
  width: 100%;
  
`

export const Button = styled(Btn)`
  margin-top: 10px;
  margin-right: 10px;
  
  @media (max-width: 769px) {
    width: 100%;
    margin-right: 0;
  }
`

export const ResultPopoverContent = styled.div`padding: 10px;`
export const ErrorResult = styled.span`color: red;`
export const WrongResult = styled.div`
  color: orange;
  text-align: center;
`
export const CorrectResult = styled.span`color: green;`
export const ResultButton = styled(Btn)`
  margin-top: 0.5rem;
  margin-right: 8px;
  &::last-child {
    margin-right: 0;
  }
`
