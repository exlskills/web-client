import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'
import { Tab2 } from '@blueprintjs/core'
export const Wrapper = styled(Flex)`
  font-size: 1rem;
  flex-wrap: wrap-reverse;
  width: 80%;
  margin: auto;
  padding: 30px;
  .pt-label {
    font-weight: bold;
    font-size: 1.1em;
  }
`
export const ClassTab = styled(Tab2).attrs({
  width: '65%'
})``
export const InputsWrapper = styled(Box).attrs({
  width: [1, 1, 1 / 3],
  pr: [0, 0, 4]
})``

export const AvatarWrapper = styled(Box).attrs({
  width: [1, 1, 1 / 3]
})``
