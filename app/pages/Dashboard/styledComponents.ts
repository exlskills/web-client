import { CenterContainer } from 'common/components/styledComponents'
import { Box, Flex } from 'grid-styled'
import styled from 'styled-components'

export const Wrapper = CenterContainer.extend`
  padding: 20px;
  background-color: inherit;
  font-size: 1.3rem;
`

export const TopWrapper = styled(Flex).attrs({
  wrap: true,
  justify: 'flex-start'
})`
  margin: 15px 0;
`

export const MyCoursesWrapper = styled.div`
  width: 40%;
  margin-right: 30px;
`

export const PanelWrapper = styled.div.attrs({
  className: 'pt-card'
})`
  margin-top: 25px;
  margin-bottom: 35px;
`

export const CalendarWrapper = PanelWrapper.extend`
  margin-top: 20px;
  margin-bottom: 50px;
`

export const MetricWrapper = styled(Flex).attrs({
  className: 'pt-card',
  wrap: true,
  justify: 'space-around'
})`
  margin: 30px 0;
  font-size: 1rem;
`

export const Metric = styled(Box).attrs({
  width: [1, 1 / 4]
})`
  text-align: center;
`

export const MetricNumber = styled.div`font-size: 5em;`

export const MetricTitle = styled.div`font-size: 1em;`

export const SliderWrapper = styled.div`
  margin: 10px 0;
  padding: 0 25px;

  .slick-prev:before,
  .slick-next:before {
    color: #3671b6;
  }
`
