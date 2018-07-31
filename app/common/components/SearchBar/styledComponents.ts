import { Button } from '@blueprintjs/core'
import styled from 'styled-components'

interface SearchWrapperProps {
  hasButton?: boolean
}
export const SearchWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: ${(props: SearchWrapperProps) => (props.hasButton ? '75%' : '100%')};

  .pt-popover-target {
    width: 100%;
  }
`

export const SearchButton = styled(Button)`
  margin-left: 5px;
  width: calc(25% - 5px);
`
