import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Card, { IProps as CardProps } from 'common/components/Card'
import * as React from 'react'
import Slider, { Settings as SliderProps } from 'react-slick'

import { SliderWrapper } from './styledComponents'

interface IProps {
  items: CardProps[]
  onCardClick?: (card: CardProps) => void
  sliderSettings?: SliderProps
  viewAll: () => void
  viewAllMsg: string
}

interface IStates {}

class CardCarousel extends React.PureComponent<IProps, IStates> {
  // eslint-disable-line react/prefer-stateless-function
  getSliderSettings() {
    const settings = this.props.sliderSettings || {}
    const defaultSettings = {
      infinite: false,
      speed: 500,
      slidesToScroll: 3,
      slidesToShow: 3,
      responsive: [
        { breakpoint: 650, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 950, settings: { slidesToShow: 2, slidesToScroll: 2 } }
      ]
    }

    return Object.assign({}, defaultSettings, settings)
  }

  render() {
    const sliderSettings = this.getSliderSettings()

    return (
      <SliderWrapper>
        <Slider {...sliderSettings}>
          {this.props.items.map(item =>
            <div key={item.id}>
              <Card {...item} boxWidth={1} onClick={this.props.onCardClick} />
            </div>
          )}
        </Slider>
        <br />
        <a style={{ marginTop: '10px' }} onClick={this.props.viewAll}>
          {this.props.viewAllMsg}
        </a>
      </SliderWrapper>
    )
  }
}

export default CardCarousel
