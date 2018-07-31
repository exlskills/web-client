import * as React from 'react'
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  PolarRadiusAxis,
  PolarAngleAxis,
  Label
} from 'recharts'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'
import { ProgressOverlay, ProgressOverlaySub } from './styledComponents'

interface IProps {
  width: number | string
  height: number | string
  innerRadius: number | string
  outerRadius: number | string
  startAngle: number
  endAngle: number
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
    let { width, height, children, ...barChartProps } = this.props

    return (
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <ResponsiveContainer width={width} height={height}>
          <RadialBarChart {...barChartProps} cx="50%" cy="50%">
            <Tooltip formatter={this.tooltipFormater} />
            <PolarAngleAxis
              type={'number'}
              domain={[0, 100]}
              dataKey={'predicted'}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar angleAxisId={0} background={true} dataKey="predicted" />
          </RadialBarChart>
        </ResponsiveContainer>
        {barChartProps.data[0].predicted != 0 &&
          <ProgressOverlay>
            {barChartProps.data[0].predicted}%
            <br />
            <ProgressOverlaySub>
              {formatMessage(messages.lbProgressOverviewScoreHeadline)}
            </ProgressOverlaySub>
          </ProgressOverlay>}
        {barChartProps.data[0].predicted == 0 &&
          <ProgressOverlay>
            N/A
            <br />
            <ProgressOverlaySub>
              {formatMessage(messages.lbProgressOverviewNotStarted)}
            </ProgressOverlaySub>
          </ProgressOverlay>}
      </div>
    )
  }
}

export default injectIntl(ProgressChart)
