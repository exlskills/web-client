import styled from 'styled-components'
import { fadeIn } from 'common/utils/animations'

export const Table = styled.table.attrs({
  className: 'pt-table pt-striped'
})`
  width: 100%;
  ${fadeIn(0)}
`
