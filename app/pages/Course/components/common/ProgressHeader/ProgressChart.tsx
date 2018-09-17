import * as React from 'react'
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import messages from './messages'
import CustomizedAxisTick from './CustomizedAxisTick'

interface IProps {
  width: number
  height: number
  barGap: number
  barCategoryGap: number
  barSize: number
  maxBarSize: number
  data: any[]
}

class ProgressChart extends React.PureComponent<
  IProps & InjectedIntlProps,
  {}
> {
  tooltipFormater = (value: any) => {
    return value ? `${value}%` : '-'
  }

  render() {
    const { formatMessage } = this.props.intl
    const { width, height, children, ...barChartProps } = this.props
    const textWidth =
      barChartProps.barSize * 2 +
      barChartProps.barGap +
      barChartProps.barCategoryGap

    return (
      <ResponsiveContainer width={width} height={height}>
        <BarChart {...barChartProps}>
          <XAxis
            dataKey="name"
            interval={0}
            tick={<CustomizedAxisTick textWidth={textWidth} />}
            height={40}
          />
          <YAxis domain={[0, 100]} width={30} />
          <Tooltip formatter={this.tooltipFormater} />
          <Legend />
          <Bar
            dataKey="predicted"
            fill="#0C61E1"
            name={formatMessage(messages.lbProgressChartPredictedScore)}
          />
          <Bar
            dataKey="actual"
            fill="#5DBCD2"
            name={formatMessage(messages.lbProgressChartTopScore)}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default injectIntl(ProgressChart)
