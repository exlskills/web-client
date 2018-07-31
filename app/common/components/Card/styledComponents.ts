import styled from 'styled-components'
import { Text } from '@blueprintjs/core'
import { Flex } from 'grid-styled'

export const VerticalWrapper = styled.div.attrs({
  className: 'pt-card pt-interactive'
})`
  border-radius: 0;
  padding: 0;
  width: 100%;
`

export const HorizontalWrapper = styled(Flex).attrs({
  className: 'pt-card',
  justify: 'flex-start'
})`
  border-radius: 0;
  padding: 0;
  width: 100%;
  height: 130px;
`

export const HorizontalInnerWrapper = styled.div``

export const HorizontalFooterWrapper = styled.div``

interface CardImageProps {
  imageUrl: string
}

export const CardImage = styled.div`
  color: #ffffff;
  background-image: url(${(props: CardImageProps) => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: relative;
  width: 100%;
  height: 168px;
  margin-bottom: 8px;
  box-shadow: 0px 1px 1px rgba(80, 80, 80, 0.25);
  color: #ffffff;
`

export const HorizontalCardImage = CardImage.extend`
  width: 120px;
  height: auto;
  box-shadow: unset;
  cursor: pointer;
`

export const CardTitle = styled(Text).attrs({
  ellipsize: true
})`
  font-size: 22px;
  padding: 8px;
  position: relative;
  left: 0;
  bottom: 0;
  right: 0;
`

export const CardDesc = styled.div.attrs({
  className: 'pt-text-muted'
})`
  font-size: 16px;
  padding: 0 8px;
  padding-bottom: 2px;
  height: 40px;
  overflow: hidden;
`

export const CardFooter = styled(Flex).attrs({
  wrap: true
})`
  padding: 8px;
`
