import styled from 'styled-components'
import { Flex, FlexProps, Grid, GridProps } from 'grid-styled'

export const Wrapper = styled(Flex)``

export const MainLabel = styled.div`
  line-height: 30px;
  display: inline-block;
  width: 100px;
  @media screen and (min-width: 40em) {
    text-align: center;
  }
`

export const FilterBox = styled(Grid)`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: 40em) {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`

export const Filter = styled.div.attrs({
  className: 'pt-select pt-fill'
})`
  select {
    background: #ffffff;
  }
`
