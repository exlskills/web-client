import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Wrapper, ChartWrapper } from './styledComponents'
import ProgressChart from './ProgressChart'
import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import messages from './messages'

interface IProps {}

class ProgressHeader extends React.Component<
  IProps & IFreactalProps & InjectedIntlProps,
  {}
> {
  static contextTypes = {
    viewer: PropTypes.object
  }
  context: any

  render() {
    const { examAllUnits } = this.props.state
    const units = examAllUnits.unitsById
    const userFirstName = this.context.viewer.first_name
    const { formatMessage } = this.props.intl

    const multiplier = Math.pow(10, 2 || 0)
    const data = examAllUnits.unitIds.map(id => ({
      name: units[id].title,
      predicted: Math.round(units[id].ema * multiplier) / multiplier,
      actual: Math.round(units[id].grade * multiplier) / multiplier
    }))

    const numBars = 2
    const barSize = 35
    const barGap = 5
    const barCategoryGap = 20
    const yaxisWidth = 30
    const categorySize = numBars * barSize + (numBars - 1) * barGap
    const numCats = data.length

    let chartWidth: any =
      numCats * categorySize + (numCats + 1) * barCategoryGap + yaxisWidth
    if (chartWidth < 910) {
      chartWidth = '100%'
    }

    return (
      <Wrapper>
        <h2 style={{ textAlign: 'center' }}>
          {formatMessage(messages.lbProgressChartWelcome, {
            name: userFirstName
          })}
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          {formatMessage(messages.lbProgressChartDescription)}
        </p>
        <ChartWrapper>
          <ProgressChart
            data={data}
            width={chartWidth}
            height={300}
            barGap={barGap}
            barCategoryGap={barCategoryGap}
            barSize={barSize}
            maxBarSize={barSize}
          />
        </ChartWrapper>
      </Wrapper>
    )
  }
}

export default injectIntl(injectState(ProgressHeader))
