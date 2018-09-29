import { CardWrapper } from 'pages/Course/components/styledComponents'
import { Flex } from 'grid-styled'
import styled from 'styled-components'
import { Button, IButtonProps, Intent } from '@blueprintjs/core'

export const Wrapper = styled.div``

export const BodyWrapper = styled(Flex).attrs({
  justify: 'flex-start',
  width: 1,
  wrap: true,
  align: 'flex-start'
})`
  margin-top: 30px;
  margin-bottom: 0px;
`

export const ActionSeparator = styled.div`
  height: 1px;
  width: 20px;
`

export const ActionWrapper = CardWrapper.extend`
  width: calc(50% - 10px);
  min-height: 200px;
  padding: 18px 20px 10px;
`

export const CalloutsWrapper = styled.div`width: 100%;`

export const CalloutRowWrapper = CardWrapper.extend`
  display: flex;
  flex-align: row;
  width: 100%;
  margin-top: 30px;
  padding: 10px 20px;
  text-decoration: none;
  color: #1c222e;
  .pt-dark & {
    color: #f5f8fa;
  }
`

export const CalloutMessage = styled.div`
  margin: auto;
  margin-left: 0;
  font-weight: 700;
  font-size: 18px;
`

export const CalloutBtn = styled(Button).attrs({
  intent: Intent.SUCCESS
})`
  margin: auto;
  margin-right: 0;
`

export const ActionHeader = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 15px;
`

export const ChartWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`

export const TopWrapper = styled(Flex).attrs({
  justify: 'flex-start',
  width: 1,
  align: 'flex-start'
})`
  margin-top: 10px;
  margin-bottom: 20px;
`

export const CourseImg = styled.img`
  margin-right: 30px;
  width: 250px;
`

export const CourseDetailsWrapper = styled.div``

export const CourseTitle = styled.div`
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 10px;
`

export const CourseDescription = styled.div``

export const ProgressOverlay = styled.div`
  position: absolute;
  text-align: center;
  top: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  font-weight: 700;
  font-size: 28px;
  padding-left: 5px;
  margin-top: 93px;
`

export const ProgressOverlaySub = styled.div.attrs({
  className: 'pt-text-muted'
})`
  font-size: 14px;
  width: 160px;
  margin: auto;
`

export const UpNextOverlay = styled.div`
  position: absolute;
  text-align: center;
  top: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  font-weight: 700;
  font-size: 28px;
  padding-left: 5px;
  margin-top: 93px;
`

export const UpNextOverlaySub = styled.div.attrs({
  className: 'pt-text-muted'
})`
  font-size: 14px;
  width: 320px;
  margin: auto;
`

export const UpNextWrapper = styled.div.attrs({})`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 12px 0;
`

export const UpNextPrimaryButton = styled(Button).attrs<IButtonProps>({
  className: 'pt-large',
  intent: Intent.SUCCESS
})`

`

export const UpNextSecondaryButton = styled(Button).attrs<IButtonProps>({
  className: 'pt-large',
  intent: Intent.PRIMARY
})`
  margin-left: 10px;
`

export const ClickableText = styled.div`cursor: pointer;`

export const UpNextMuted = ClickableText.extend.attrs({
  className: 'pt-text-disabled'
})`
  text-transform: uppercase;
  font-weight: 300;
  font-size: 16px;
  margin-top: 18px;
  margin-bottom: 4px;
`

export const UpNextTitle = ClickableText.extend.attrs({})`
  font-size: 22px;
  margin-top: 4px;
  margin-bottom: 14px;
`

export const UpNextHeadline = ClickableText.extend.attrs({
  className: 'pt-text-muted'
})`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 38px;
`
