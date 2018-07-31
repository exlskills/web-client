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
  HorizontalCardImage
} from './styledComponents'

export interface IProps {
  id: string
  title: string
  description: string
  horizontal?: boolean
  type?: string
  onClick?: (card: IProps) => void
  boxWidth?: number | string | [number | string]
  image?: string
  footer?: React.ReactChild
}

class Card extends React.PureComponent<IProps, void> {
  static defaultProps = {
    boxWidth: '300px',
    image: '',
    title: '',
    description: ''
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick({
        id: this.props.id,
        type: this.props.type,
        title: this.props.title,
        description: this.props.description,
        image: this.props.image
      })
    }
  }

  renderVertical() {
    const { id, boxWidth, image, title, description, footer } = this.props
    return (
      <Box p={2} width={boxWidth}>
        <VerticalWrapper onClick={this.handleClick}>
          <CardImage imageUrl={image} />
          <CardTitle>
            {title}
          </CardTitle>
          <CardDesc>
            {description}
          </CardDesc>
          {!!footer && footer}
        </VerticalWrapper>
      </Box>
    )
  }

  renderHorizontal() {
    const { id, boxWidth, image, title, description, footer } = this.props
    return (
      <Box width={boxWidth}>
        <HorizontalWrapper>
          <HorizontalCardImage onClick={this.handleClick} imageUrl={image} />
          <HorizontalInnerWrapper>
            <div style={{ cursor: 'pointer' }} onClick={this.handleClick}>
              <CardTitle>
                {title}
              </CardTitle>
            </div>
            <CardDesc style={{ cursor: 'pointer' }} onClick={this.handleClick}>
              {description}
            </CardDesc>
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
