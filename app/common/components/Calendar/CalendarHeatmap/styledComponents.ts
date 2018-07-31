import styled from 'styled-components'
export const CalendarContainer = styled.svg`
  font-family: Helvetica, arial, nimbussansl, liberationsans, freesans, clean,
    sans-serif;
  width: 100%;
`

export const MonthLabel = styled.text`
  font-size: 8px;
  fill: #aaa;
`

export const WeekdayLabel = styled.text`
  font-size: 7px;
  fill: #aaa;
`

export const DayCell = styled.rect`
  &:hover {
    stroke: #555;
    stroke-width: 1px;
    cursor: pointer;
  }
`
