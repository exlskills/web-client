import styled from 'styled-components'
import { Flex, FlexProps } from 'grid-styled'
import { Text, Tooltip as Tip, Position } from '@blueprintjs/core'

interface WrapperProps {
  width?: string
  marginTop?: string
}

export const Wrapper = styled(Flex).attrs<FlexProps>({
  align: 'center',
  justify: 'flex-start'
})`
  z-index: 9999;
  ${(props: WrapperProps) => props.width && `width: ${props.width}`}
  ${(props: WrapperProps) =>
    props.marginTop && `margin-top: ${props.marginTop}`}
`

interface CellProps {
  size: number
  ema: number
}

export const Cell = styled.div`
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 100px;
  display: inline-block;
  height: ${(props: CellProps) => props.size}px;
  width: ${(props: CellProps) => props.size}px;
  background-color: ${(props: CellProps) => {
    if (!props.ema || props.ema == 0) return 'rgba(0,0,0,0)'
    if (props.ema < 80) return 'rgb(247, 227, 27)'
    return 'rgb(175, 229, 123)'
  }};
  &:hover {
    opacity: 0.6;
  }
`

export const PercentText = styled(Text)`
  display: flex;
  margin-left: 0.1rem;
  font-style: italic;
  font-size: 1rem;
`

interface TooltipProps {
  isActive?: boolean
}
export const Tooltip = styled(Tip).attrs<TooltipProps>({
  position: Position.TOP
})`
  outline: 0;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  ${(props: TooltipProps) =>
    props.isActive
      ? `
      border: 1px solid #4195fc;
      -webkit-box-shadow: 0px 0px 4px #4195fc;
      -moz-box-shadow: 0px 0px 4px #4195fc;
      box-shadow: 0px 0px 4px #4195fc;
      `
      : `
      border: 1px solid transparent;
      `};  
  display: flex;
  flex-align: center;
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }
`
