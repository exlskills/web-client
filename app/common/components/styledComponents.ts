import styled from 'styled-components'
import { Text, Tag as BTag } from '@blueprintjs/core'
import { Flex } from 'grid-styled'

export const CenterContainer = styled.div`
  margin: 0 auto;
  max-width: 1300px;
  width: 100%;
  height: 100%;
`

interface WrapperProps {
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
}

export const Wrapper = styled.div`
  margin-top: ${(props: WrapperProps) =>
    props.marginTop ? props.marginTop : null};
  margin-bottom: ${(props: WrapperProps) =>
    props.marginBottom ? props.marginBottom : null};
  margin-left: ${(props: WrapperProps) =>
    props.marginLeft ? props.marginLeft : null};
  margin-left: ${(props: WrapperProps) =>
    props.marginRight ? props.marginRight : null};
`

export const AppWrapper = styled.div`
  min-height: 100%;
  width: 100%;
  background-color: ${props => props.theme.background};
`

interface IconProps {
  iconName: string
  large?: boolean
  link?: boolean
}
export const Icon = styled.span.attrs<IconProps>({
  className: (props: IconProps) =>
    `pt-icon${props.large ? '-large' : ''} pt-icon-${props.iconName
      ? props.iconName
      : 'asterisk'}`
})`
  ${props => props.link && 'cursor: pointer;'}
`

interface IContentWrapperProps {
  responsive?: boolean
}

export const ContentWrapper = styled(Flex).attrs<IContentWrapperProps>({
  column: true,
  pt: 3,
  pb: 3
})`
  ${props => (props.responsive ? '' : 'min-width: 900px;')}
  max-width: 1000px;
  padding: 1rem;
  margin: 0 auto;
`

export const Title = styled(Text)`
  display: inline-block;
  font-size: 1.2rem;
`

export const Tag = styled(BTag)`
  margin-right: 0.4rem;
  white-space: nowrap;
  min-width: inherit;
`
