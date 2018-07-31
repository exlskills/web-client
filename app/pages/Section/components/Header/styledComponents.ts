import styled from 'styled-components'
import { Flex } from 'grid-styled'
import { Tooltip as Tip, Position } from '@blueprintjs/core'
export const Wrapper = styled(Flex).attrs({
  justify: 'space-between',
  align: 'center',
  py: '0.7rem'
})`
  width: 100%;
`
export const Tooltip = styled(Tip).attrs({
  position: Position.TOP
})`
  z-index:99;
`
