import styled from 'styled-components'
import { Flex, FlexProps } from 'grid-styled'
import { Button, IButtonProps, Icon } from '@blueprintjs/core'

export const Wrapper = styled(Flex).attrs<FlexProps>({
  align: 'center',
  justify: 'space-between'
})``

export const PracticeLink = styled.span.attrs({
  className: 'pt-text-muted'
})`
  text-decoration: underline;
  cursor: pointer;
  margin-left: 16px;
`

export const PracticeIcon = styled(Button).attrs<IButtonProps>({
  className: 'pt-minimal pt-icon-edit'
})`
  margin-left: 16px;
`

export const SectionCheckedIcon = styled(Icon)`
  margin-left: 10px;
  color: rgb(121, 205, 41);
`

export const SectionProgPct = styled.span`
  margin-left: 10px;
  color: rgb(243, 166, 41);
  &:hover {
    text-decoration: none !important;
  }
`

export const SectionProgText = styled.span.attrs({
  className: 'pt-text-muted'
})`
  margin-left: 8px;
  text-transform: uppercase;
  &:hover {text-decoration: none !important;}
`
