import styled from 'styled-components'
import { Button } from '@blueprintjs/core'
import { mobileBPCSS } from '../../../../common/utils/screen'

export const ActionWrapper = styled.div`
  margin: 20px 64px;
  @media only screen and (max-width: ${mobileBPCSS}) {
    margin: 20px 22px;
  }
`

export const ActionButton = styled(Button)`
  margin-left: 5px;
`
