import * as React from 'react'
import { Text } from 'recharts'

interface IProps {
  x?: number
  y?: number
  stroke?: string
  payload?: any
  textWidth?: number
}

export default function CustomizedAxisTick(props: IProps) {
  const { x, y, stroke, payload, textWidth } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <Text
        scaleToFit={false}
        width={textWidth}
        dy={2}
        textAnchor={'middle'}
        verticalAnchor={'start'}
        className="recharts-cartesian-axis-tick-value"
      >
        {payload.value}
      </Text>
    </g>
  )
}
