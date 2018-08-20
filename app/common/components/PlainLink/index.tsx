import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled(Link).attrs({
  style: { color: 'unset' }
})`
  &:hover {
    text-decoration: unset;
  }
`
