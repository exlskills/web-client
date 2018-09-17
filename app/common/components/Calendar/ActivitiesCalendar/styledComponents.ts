import { Flex, FlexProps, Box, BoxProps } from 'grid-styled'
import styled from 'styled-components'
import { Collapse } from '@blueprintjs/core'

export const ActivitiesCollapse = styled(Collapse)`
  margin-top: 20px;
  padding: 10px 20px;
`
export const ActivitiesHeader = styled(Flex).attrs<FlexProps>({
  align: 'center'
})`
  h4 {
    margin: 0;
  }
  .pt-select {
    flex: none;
    margin-left: auto;
  }
`
