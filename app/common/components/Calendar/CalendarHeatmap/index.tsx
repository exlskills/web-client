import { SVGTooltip } from '@blueprintjs/core'
import { range, reduce } from 'lodash'
import * as React from 'react'

import {
  convertToDate,
  formatDate,
  getBeginningTimeForDate,
  shiftDate
} from './helpers'
import {
  CalendarContainer,
  DayCell,
  MonthLabel,
  WeekdayLabel
} from './styledComponents'

const DAYS_IN_WEEK = 7
const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000
const SQUARE_SIZE = 10
const MONTH_LABEL_GUTTER_SIZE = 4
const WEEK_DAY_LABEL_SIZE = 16

interface IProps {
  values: {
    // object of objects with key as date string and arbitrary metadata
    [key: string]: {
      [key: string]: any
    }
  }
  weekdayNames?: [string] // list of week lables
  monthNames?: [string] // list of month lables
  numDays?: number // number of days back from endDate to show
  endDate?: string | number | Date // end of date range
  gutterSize?: number // size of space between squares
  horizontal?: boolean // whether to orient horizontally or vertically
  showWeekdayLabels?: boolean // whether to show weekday labels
  showMonthLabels?: boolean // whether to show month labels
  showOutOfRangeDays?: boolean // whether to render squares for extra days in week after endDate, and before start date
  tooltipDataAttrs?:
    | { [key: string]: any }
    | ((data: any) => { [key: string]: any }) // data attributes to add to square for setting 3rd party tooltips, e.g. { 'data-toggle': 'tooltip' } for bootstrap tooltips
  tooltipForDay?: (data: any) => string // function which returns tooltip text for the day
  colorsList?: [string] // list of colors for render based on the cell value
  colorForDay?: (data: any) => number | string // function which returns the index of colorsList OR the color hex code for the day
  onClick?: (data: any) => void // callback function when a square is clicked
}

interface IStates {
  valueCache: any
}

class CalendarHeatmap extends React.PureComponent<IProps, IStates> {
  static defaultProps = {
    weekdayNames: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
    monthNames: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    numDays: 365,
    endDate: new Date(),
    gutterSize: 1,
    horizontal: true,
    showWeekdayLabels: true,
    showMonthLabels: true,
    showOutOfRangeDays: false,
    tooltipForDay: (data: any) =>
      data.value && data.value.tooltip ? data.value.tooltip : data.date,
    colorsList: ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823'],
    colorForDay: (data: any) => (data.value ? data.value.value || 0 : 0)
  }

  constructor(props: any) {
    super(props)

    this.state = {
      valueCache: this.getValueCache(props.values)
    }
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      valueCache: this.getValueCache(nextProps.values)
    })
  }

  getSquareSizeWithGutter() {
    return SQUARE_SIZE + this.props.gutterSize
  }

  getMonthLabelSize() {
    if (!this.props.showMonthLabels) {
      return 0
    } else if (this.props.horizontal) {
      return SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE
    }
    return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE)
  }

  getStartDate() {
    return shiftDate(this.getEndDate(), -this.props.numDays + 1) // +1 because endDate is inclusive
  }

  getEndDate() {
    return getBeginningTimeForDate(convertToDate(this.props.endDate))
  }

  getStartDateWithEmptyDays() {
    return shiftDate(this.getStartDate(), -this.getNumEmptyDaysAtStart())
  }

  getNumEmptyDaysAtStart() {
    return this.getStartDate().getDay()
  }

  getNumEmptyDaysAtEnd() {
    return DAYS_IN_WEEK - 1 - this.getEndDate().getDay()
  }

  getWeekCount() {
    const numDaysRoundedToWeek =
      this.props.numDays +
      this.getNumEmptyDaysAtStart() +
      this.getNumEmptyDaysAtEnd()
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK)
  }

  getWeekdayLabelWidth() {
    return this.props.horizontal && this.props.showWeekdayLabels
      ? WEEK_DAY_LABEL_SIZE
      : 0
  }

  getWeekWidth() {
    return DAYS_IN_WEEK * this.getSquareSizeWithGutter()
  }

  getWidth() {
    return (
      this.getWeekdayLabelWidth() +
      this.getWeekCount() * this.getSquareSizeWithGutter() -
      this.props.gutterSize
    )
  }

  getHeight() {
    return (
      this.getWeekWidth() + (this.getMonthLabelSize() - this.props.gutterSize)
    )
  }

  getValueCache(values: any) {
    const startDate = this.getStartDateWithEmptyDays()
    let nextDate = startDate

    return reduce(
      range(this.getWeekCount() * DAYS_IN_WEEK),
      (memo: any, idx: number) => {
        const nextDateString = formatDate(nextDate)
        const value = values[nextDateString]

        memo[idx] = { value, date: nextDateString }

        nextDate = shiftDate(nextDate, 1)
        return memo
      },
      {}
    )
  }

  getCellDataForIndex(index: number) {
    if (this.state.valueCache[index]) {
      return this.state.valueCache[index]
    }
    return {}
  }

  getColorForIndex(index: number) {
    const cellData = this.getCellDataForIndex(index)
    let color = this.props.colorForDay(cellData)

    if (typeof color == 'number') {
      if (color > this.props.colorsList.length - 1) {
        color = this.props.colorsList.length - 1
      }
      return this.props.colorsList[color]
    }
    return color
  }

  getTooltipForIndex(index: number) {
    const cellData = this.getCellDataForIndex(index)
    return this.props.tooltipForDay ? this.props.tooltipForDay(cellData) : null
  }

  getTooltipDataAttrsForIndex(index: number) {
    const cellData = this.getCellDataForIndex(index)
    return this.getTooltipDataAttrsForValue(cellData)
  }

  getTooltipDataAttrsForValue(value: any) {
    const { tooltipDataAttrs } = this.props

    if (typeof tooltipDataAttrs === 'function') {
      return tooltipDataAttrs(value)
    }
    return tooltipDataAttrs
  }

  getTransformForWeek(weekIndex: number) {
    if (this.props.horizontal) {
      return `translate(${weekIndex * this.getSquareSizeWithGutter()}, 0)`
    }
    return `translate(0, ${weekIndex * this.getSquareSizeWithGutter()})`
  }

  getTransformForMonthLabels() {
    if (this.props.horizontal) {
      return `translate(${this.getWeekdayLabelWidth()}, 0)`
    }
    return `translate(${this.getWeekWidth() + MONTH_LABEL_GUTTER_SIZE}, 0)`
  }

  getTransformForWeekdayLabels() {
    if (this.props.horizontal) {
      return `translate(0, ${this.getMonthLabelSize() + 8})`
    }
    return null
  }

  getTransformForDaysPanel() {
    if (this.props.horizontal) {
      return `translate(${this.getWeekdayLabelWidth()}, ${this.getMonthLabelSize()})`
    }
    return null
  }

  getViewBox() {
    if (this.props.horizontal) {
      return `0 0 ${this.getWidth()} ${this.getHeight()}`
    }
    return `0 0 ${this.getHeight()} ${this.getWidth()}`
  }

  getSquareCoordinates(dayIndex: number) {
    if (this.props.horizontal) {
      return [0, dayIndex * this.getSquareSizeWithGutter()]
    }
    return [dayIndex * this.getSquareSizeWithGutter(), 0]
  }

  getMonthLabelCoordinates(weekIndex: number) {
    if (this.props.horizontal) {
      return [
        weekIndex * this.getSquareSizeWithGutter(),
        this.getMonthLabelSize() - MONTH_LABEL_GUTTER_SIZE
      ]
    }
    const verticalOffset = -2
    return [
      0,
      (weekIndex + 1) * this.getSquareSizeWithGutter() + verticalOffset
    ]
  }

  handleClick = (value: any) => () => {
    if (this.props.onClick) {
      this.props.onClick(value)
    }
  }

  renderDayCell(dayIndex: number, index: number) {
    const indexOutOfRange =
      index < this.getNumEmptyDaysAtStart() ||
      index >= this.getNumEmptyDaysAtStart() + this.props.numDays
    if (indexOutOfRange && !this.props.showOutOfRangeDays) {
      return null
    }
    const [x, y] = this.getSquareCoordinates(dayIndex)

    const cellJsx = (
      <DayCell
        key={`day_${index}`}
        width={SQUARE_SIZE}
        height={SQUARE_SIZE}
        x={x}
        y={y}
        fill={this.getColorForIndex(index)}
        onClick={this.handleClick(this.getCellDataForIndex(index))}
      />
    )

    const tooltip = this.getTooltipForIndex(index)
    if (tooltip) {
      return (
        <SVGTooltip
          key={`tooltip_${index}`}
          content={tooltip}
          {...this.getTooltipDataAttrsForIndex(index)}
        >
          {cellJsx}
        </SVGTooltip>
      )
    }

    return cellJsx
  }

  renderWeek(weekIndex: number) {
    return (
      <g
        key={`week_${weekIndex}`}
        transform={this.getTransformForWeek(weekIndex)}
      >
        {range(DAYS_IN_WEEK).map(dayIndex =>
          this.renderDayCell(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex)
        )}
      </g>
    )
  }

  renderDaysPanel() {
    return range(this.getWeekCount()).map(weekIndex =>
      this.renderWeek(weekIndex)
    )
  }

  renderMonthLabels() {
    if (!this.props.showMonthLabels) {
      return null
    }
    const weekRange = range(this.getWeekCount() - 1) // don't render for last week, because label will be cut off
    return weekRange.map(weekIndex => {
      const endOfWeek = shiftDate(
        this.getStartDateWithEmptyDays(),
        (weekIndex + 1) * DAYS_IN_WEEK
      )
      const [x, y] = this.getMonthLabelCoordinates(weekIndex)
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK
        ? <MonthLabel
            key={`monthlabel_${weekIndex}`}
            x={x}
            y={y}
            textAnchor="midle"
          >
            {this.props.monthNames[endOfWeek.getMonth()]}
          </MonthLabel>
        : null
    })
  }

  renderWeekdayLabels() {
    if (!this.props.horizontal || !this.props.showWeekdayLabels) {
      return null
    }

    return this.props.weekdayNames.map((value, i) => {
      const y = i * (SQUARE_SIZE + this.props.gutterSize)
      return (
        <WeekdayLabel key={`weekday_${value + i}`} x={0} y={y}>
          {value}
        </WeekdayLabel>
      )
    })
  }

  render() {
    return (
      <CalendarContainer viewBox={this.getViewBox()}>
        <g transform={this.getTransformForMonthLabels()}>
          {this.renderMonthLabels()}
        </g>
        <g transform={this.getTransformForWeekdayLabels()}>
          {this.renderWeekdayLabels()}
        </g>
        <g transform={this.getTransformForDaysPanel()}>
          {this.renderDaysPanel()}
        </g>
      </CalendarContainer>
    )
  }
}

export default CalendarHeatmap
