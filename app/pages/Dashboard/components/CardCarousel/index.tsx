import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Card, { IProps as CardProps } from 'common/components/Card'
import * as React from 'react'
import Slider, { Settings as SliderProps } from 'react-slick'

import { SliderWrapper } from './styledComponents'
import { Link } from 'react-router-dom'

interface IProps {
  items: CardProps[]
  cardUrlResolver?: (card: any) => string
  sliderSettings?: SliderProps
  viewAllUrl: string
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
              <Card
                {...item}
                boxWidth={1}
                cardUrl={this.props.cardUrlResolver(item)}
              />
            </div>
          )}
        </Slider>
        <br />
        <Link style={{ marginTop: '10px' }} to={this.props.viewAllUrl}>
          {this.props.viewAllMsg}
        </Link>
      </SliderWrapper>
    )
  }
}

export default CardCarousel
