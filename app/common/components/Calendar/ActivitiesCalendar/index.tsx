import { Collapse } from '@blueprintjs/core/dist'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import Activities from '../ActivitiesList/index'
import CalendarHeatmap from '../CalendarHeatmap'
import { ACTIVITY_DAYS } from '../constants'
import { ActivitiesCollapse, ActivitiesHeader } from './styledComponents'
import messages from './messages'
import moment = require("moment");

interface IProps {
  activities: any
}
interface IStates {
  showList: boolean
  selectedDate: string
  group: string
}
type MergedProps = IProps & InjectedIntlProps

class ActivitiesCalendar extends React.PureComponent<MergedProps, any> {
  state: Partial<IStates> = {
    showList: false,
    group: 'type'
  }

  toggleActivitiesList = () =>
    this.setState({ showList: !this.state.showList, selectedDate: null })

  onCalendarClick = (data: any) => {
    // if (!data.value) {
    //   return
    // }

    this.setState({
      showList: true,
      selectedDate: data.date
    })
  }

  renderCalendarTooltip = (data: any) => {
    return this.props.intl.formatMessage(messages.lbNumActivitiesOnDate, {
      number: data.value && data.value.value ? data.value.value : 0,
      date: data.date
    })
  }

  handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ group: e.target.value })
  }

  renderList() {
    const { formatMessage } = this.props.intl
    if (!this.state.showList) {
      return null
    }
    return (
      <ActivitiesCollapse isOpen={this.state.showList}>
        <ActivitiesHeader>
          <h4>
            {formatMessage(messages.lbActivitiesOnDate, {
              date: moment(this.state.selectedDate, 'YYYY-MM-DD').format('LL')
            })}
          </h4>
          <div className="pt-select">
            <select value={this.state.group} onChange={this.handleSortChange}>
              <option value="type">
                {formatMessage(messages.txtSortByType)}
              </option>
              <option value="">
                {formatMessage(messages.txtSortByTime)}
              </option>
            </select>
          </div>
        </ActivitiesHeader>
        <Activities
          isOpen={this.state.showList}
          date={this.state.selectedDate}
          group={this.state.group}
        />
      </ActivitiesCollapse>
    )
  }

  render() {
    return (
      <div>
        <CalendarHeatmap
          numDays={ACTIVITY_DAYS}
          endDate={new Date()}
          values={this.props.activities}
          onClick={this.onCalendarClick}
          tooltipForDay={this.renderCalendarTooltip}
        />
        {this.renderList()}
      </div>
    )
  }
}

export default injectIntl<IProps>(ActivitiesCalendar)
