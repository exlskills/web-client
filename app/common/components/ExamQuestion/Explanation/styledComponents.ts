import { Button } from '@blueprintjs/core'
import styled from 'styled-components'

export const Wrapper = styled.div`
  font-size: 1em;
  display: ${props => (props.hidden ? 'none' : 'block')};
`

export const Title = styled.h4`
  font-size: 1.43em;
  margin-bottom: 15px;
`

export const Content = styled.div`margin-bottom: 15px;`

export const ActionButton = styled(Button)``
