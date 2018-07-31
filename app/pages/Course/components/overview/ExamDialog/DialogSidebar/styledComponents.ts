import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'
import { Text, Button as Btn } from '@blueprintjs/core'

export const Wrapper = styled(Flex).attrs({
  column: true,
  align: 'flex-start'
})`
  height: 100%;
  border-left: 1px solid grey;
  padding: 0px 15px;
`

export const Row = styled(Box).attrs({
  column: true,
  align: 'flex-start'
})`
  width: 100%;
  margin-top: 1.5rem;
  & > .pt-popover-target {
    width: 100%;
  }
`

export const Title = styled(Text)`
  font-size: 1.2rem;
`
export const HintMesssage = styled(Text)`

`
export const Button = styled(Btn).attrs({
  className: 'pt-fill'
})`
  margin-top: 0.5rem;
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
