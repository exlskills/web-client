import { CardFooter } from 'common/components/Card/styledComponents'
import { Flex, FlexProps, Box, BoxProps } from 'grid-styled'
import styled from 'styled-components'
import ReactSplitPane from 'react-split-pane'
import { CenterContainer } from '../../common/components/styledComponents'
import FiltersBar from '../../common/components/FiltersBar'
import { mobileBPCSS } from '../../common/utils/screen'

export const SidebarBox = styled(Flex).attrs<FlexProps>({
  justify: 'flex-start',
  column: true
})`
  padding: 0;
  background-color: ${props => props.theme.background};
  height: 100%;
`

export const ContentsBox = styled(Box).attrs<BoxProps>({
  px: 2
})`
  width: 100%;
  font-size: 14px;
`

export const Listing = styled(Flex).attrs<FlexProps>({
  wrap: 'true'
})``

export const CourseFooter = CardFooter.extend.attrs<FlexProps>({
  className: 'pt-text-muted'
})``

const CourseFooterBox = styled(Box).attrs<BoxProps>({})`
  margin-right: 10px;
`

export const CourseEnrolls = CourseFooterBox.extend`
  .pt-icon {
    top: -1px;
    position: relative;
  }
`

export const CourseViews = CourseFooterBox.extend``

export const Wrapper = styled(CenterContainer)``

export const CardWrapper = styled.div.attrs({
  className: 'pt-card'
})`
  width: 100%;
`

export const SplitPane = styled(ReactSplitPane).attrs({
  pane1Style: { height: '100%' as any }
})`
  height: calc(100% - 50px) !important;
  overflow: auto !important;
  
  @media only screen and (max-width: ${mobileBPCSS}) {
      .Pane1 {
        width: 0px !important;
      }
  }
`

export const FiltersBarWrapper = styled.div`
  margin-top: 30px;
  margin-right: 20px;
  margin-left: 14px;
`

export const FiltersBarHeading = styled(FiltersBar)`
`
