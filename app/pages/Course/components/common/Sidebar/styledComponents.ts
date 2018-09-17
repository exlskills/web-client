import { Flex, FlexProps } from 'grid-styled'
import styled from 'styled-components'

export const Wrapper = styled(Flex).attrs<FlexProps>({
  justify: 'flex-start',
  column: true
})`
  padding: 0;
  background-color: ${props => props.theme.background};
  height: 100%;
`

interface CourseImageProps {
  imageUrl: string
}

export const CourseImage = styled.div`
  color: #ffffff;
  background-image: url(${(props: CourseImageProps) => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: relative;
  width: 100%;
  height: 200px;
  padding-top: 200px;
`
