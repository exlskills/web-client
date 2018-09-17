import { Button } from '@blueprintjs/core'
import { Flex, FlexProps, Box, BoxProps } from 'grid-styled'
import styled from 'styled-components'

export const Wrapper = styled(Flex).attrs<FlexProps>({
  className: 'pt-card',
  column: true,
  align: 'center'
})`
  width: 100%;
  position: relative;
  font-size: 1em;
  padding: 10px 15px;
`

export const InputsWrapper = styled(Box)`
  margin-top: 10px;
`

export const SubmitButton = styled(Button)`
  margin-bottom: 10px;
`
