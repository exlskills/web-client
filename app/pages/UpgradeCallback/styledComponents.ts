import { ContentWrapper } from 'common/components/styledComponents'
import { FlexProps } from 'grid-styled'

export const Wrapper = ContentWrapper.extend.attrs<FlexProps>({
  column: false
})`
  padding: 0;
`
