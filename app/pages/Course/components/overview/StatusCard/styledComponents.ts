import { Collapse, Tooltip as Tip, Position, Icon } from '@blueprintjs/core'
import styled from 'styled-components'
import { Title } from 'common/components/styledComponents'
import { Flex } from 'grid-styled'
import { CardWrapper } from 'pages/Course/components/styledComponents'
import { fadeFromTop } from 'common/utils/animations'

interface WrapperProps {
  index: number
}
export const Wrapper = CardWrapper.extend`
  padding: 0;
  margin: auto;
  width: 20%;
  min-width: 180px;
  max-width: 300px;
  margin-left: 40px;
  margin-right: 0px;
  margin-top: -10px;
  &:last-of-type {
    margin-bottom: 75px;
  }
  ${(props: WrapperProps) => fadeFromTop(props.index * 0.1)};
`

export const CardHeader = styled(Flex).attrs({
  justify: 'space-between',
  width: 1,
  align: 'center'
})`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`

export const UnitTitle = Title.extend`
  padding: 0.7rem 1rem;
  font-weight: 700;
`

export const CardInnerContent = styled.div`padding: 16px;`
