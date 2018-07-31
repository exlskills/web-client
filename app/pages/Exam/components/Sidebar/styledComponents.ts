import { Flex } from 'grid-styled'
import styled from 'styled-components'
import { Button } from '@blueprintjs/core'

export const Wrapper = styled(Flex).attrs({
  justify: 'flex-start',
  column: true
})`
  padding: 0;
  background-color: ${props => props.theme.background};
  height: 100%;
`

interface SidebarImageProps {
  imageUrl: string
}
export const TextTitle = styled.p`
  text-align: center;
  font-weight: bold;
  padding-top: 20px;
  font-size: 1.5em;
  padding-bottom: 20px;
  margin-bottom: 0;
`
export const SidebarImage = styled.div`
  color: #ffffff;
  background-image: url(${(props: SidebarImageProps) => props.imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: relative;
  width: 100%;
  height: 200px;
  padding-top: 200px;
`

export const ActionButton = styled(Button)`
  margin-top: 5px;
`

export const AnsweredCal = styled.div`margin: 5px auto;`

export const Timer = styled.div`
  margin: 5px auto;
  font-size: 20px;
`
