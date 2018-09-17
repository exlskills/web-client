import {
  Collapse,
  Tooltip as Tip,
  Position,
  ProgressBar,
  Icon
} from '@blueprintjs/core'
import styled from 'styled-components'
import { Title } from 'common/components/styledComponents'
import { Flex, FlexProps } from 'grid-styled'
import { CardWrapper } from 'pages/Course/components/styledComponents'
import { fadeFromTop } from 'common/utils/animations'

interface WrapperProps {
  index: number
}
export const Wrapper = CardWrapper.extend`
  padding: 0;
  margin-top: 1.5rem;
  background-color: rgb(249, 249, 249);
  &:last-of-type {
    margin-bottom: 75px;
  }
  ${(props: WrapperProps) => fadeFromTop(props.index * 0.1)};
`

interface CardHeaderProps {
  border: boolean
}

export const CardHeader = styled(Flex).attrs<CardHeaderProps>({
  justify: 'space-between',
  width: 1,
  align: 'center'
})`
  padding: 20px;
  ${props => props.border && 'border-bottom: 1px solid rgba(0, 0, 0, 0.15);'}
`

export const UnitIndex = Title.extend`
  padding: 0.7rem 0rem;
  font-weight: 700;
  font-size: 22px;
`

export const UnitTitle = Title.extend`
  padding: 0.7rem .8rem;
  font-weight: 700;
  font-size: 22px;
  margin-right: 20px;
`

interface PIconProps {
  ema?: number
  completed?: number
  haveActivity?: number
}
interface PCircleIconProps {
  ema?: number
}
export const UnitCardProgressBar = styled(ProgressBar)`
  height: 20px;
  width: 180px;
  display: inline-block;
  margin-bottom: -3px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background-color: unset;
  
  .pt-progress-meter {
    background-color: rgb(121, 205, 41) !important;
  }
`
export const CirCleIcon = styled.div.attrs<PCircleIconProps>({
  className: 'pt-icon-circle'
})`
  display: inline-block;
  font-size: 1.2rem;
  padding: 0.7rem;
  background-color: transparent
  }};
`
export const toolTipText = styled.div`
  display:none
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
`

interface ToggleIconProps {
  open: boolean
}

export const ToggleIcon = styled.div.attrs({
  className: 'pt-icon-caret-down'
})`

  margin-left: 10px;
  transition: 0.3s ease all;
  cursor: pointer;
  font-size: 1.3rem;
  vertical-align: middle;
  transform: rotateZ(${(props: ToggleIconProps) => (props.open ? 180 : 0)}deg);
`

export const CardContent = styled(Collapse)`
  & .pt-collapse-body > *:last-child {
    border-bottom: none;
  }
`

export const RowRightWrapper = styled(Flex).attrs<FlexProps>({
  wrap: 'true',
  flex: 2,
  align: 'center',
  justify: 'flex-end'
})`
  
`

export const HeaderLeft = styled.div`cursor: pointer;`

export const HeaderRight = styled(Flex).attrs<FlexProps>({
  align: 'center',
  justify: 'flex-end',
  width: 1 / 4
})``

export const PercentText = styled.div`
  font-style: italic;
  font-size: 1rem;
  margin-left: 0.4rem;
`
interface TooltipProps {
  isActive?: boolean
}

export const Tooltip = styled(Tip).attrs<TooltipProps>({
  position: Position.TOP
})`
  border-color: ${(props: TooltipProps) =>
    props.isActive ? '#000' : 'transparent'};
  display: inline-block;
  
`

export const UnitProgressTooltip = Tooltip.extend`padding-top: 20px;`

export const UnitPassedIcon = styled(Icon)`
  margin-left: 5px;
  color: rgb(121, 205, 41);
`
