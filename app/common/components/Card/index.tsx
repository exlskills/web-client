import { Box } from 'grid-styled'
import * as React from 'react'

import {
  VerticalWrapper,
  HorizontalWrapper,
  CardImage,
  CardTitle,
  CardDesc,
  HorizontalInnerWrapper,
  HorizontalFooterWrapper,
  HorizontalCardImage,
  CardBadge,
  CardImageContainer,
  HorizontalCardImageLink
} from './styledComponents'
import PlainLink from 'common/components/PlainLink'
import { Link } from 'react-router-dom'

export interface IProps {
  id: string
  title: string
  description: string
  horizontal?: boolean
  badge?: string
  type?: string
  boxWidth?: number | string | [number | string]
  image?: string
  footer?: React.ReactChild
  cardUrl: string
}

class Card extends React.PureComponent<IProps, void> {
  static defaultProps = {
    boxWidth: '300px',
    image: '',
    title: '',
    description: ''
  }

  renderVertical() {
    const {
      cardUrl,
      boxWidth,
      image,
      badge,
      title,
      description,
      footer
    } = this.props
    return (
      <Box p={2} width={boxWidth}>
        <PlainLink to={cardUrl}>
          <VerticalWrapper>
            <CardImageContainer>
              {badge && <CardBadge imageUrl={badge} />}
              <CardImage imageUrl={image} />
            </CardImageContainer>
            <CardTitle>
              {title}
            </CardTitle>
            <CardDesc>
              {description}
            </CardDesc>
            {!!footer && footer}
          </VerticalWrapper>
        </PlainLink>
      </Box>
    )
  }

  renderHorizontal() {
    const { cardUrl, boxWidth, image, title, description, footer } = this.props
    return (
      <Box width={boxWidth}>
        <HorizontalWrapper>
          <HorizontalCardImageLink to={cardUrl}>
            <HorizontalCardImage imageUrl={image} />
          </HorizontalCardImageLink>

          <HorizontalInnerWrapper>
            <PlainLink to={cardUrl}>
              <CardTitle>
                {title}
              </CardTitle>
            </PlainLink>
            <PlainLink to={cardUrl}>
              <CardDesc>
                {description}
              </CardDesc>
            </PlainLink>
            {!!footer &&
              <HorizontalFooterWrapper>
                {footer}
              </HorizontalFooterWrapper>}
          </HorizontalInnerWrapper>
        </HorizontalWrapper>
      </Box>
    )
  }

  render() {
    return this.props.horizontal
      ? this.renderHorizontal()
      : this.renderVertical()
  }
}

export default Card
