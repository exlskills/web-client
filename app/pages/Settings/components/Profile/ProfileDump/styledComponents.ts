import { Flex, Box } from 'grid-styled'
import styled from 'styled-components'

export const Wrapper = styled(Flex)`
  font-size: 1rem;
  flex-wrap: wrap-reverse;

  .pt-label {
    font-weight: bold;
    font-size: 1.1em;
  }
`

export const InputsWrapper = styled(Box).attrs({
  width: [1, 1, 2 / 3]
})``

export const AvatarWrapper = styled(Box).attrs({
  width: [1, 1, 1 / 3]
})``
