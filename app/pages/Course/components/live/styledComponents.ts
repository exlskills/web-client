import styled from 'styled-components'
import { Button, Collapse, Intent, MenuDivider } from '@blueprintjs/core'
import { mobileBPCSS, mobileBreakPoint } from '../../../../common/utils/screen'
const UserAvatar = require('react-user-avatar') as any

export const InstructorAvatar: any = styled(UserAvatar)`
  margin-right: 20px;
  margin-bottom: 10px;
  .UserAvatar--img {
    background-color: #FFF
  }
`

export const ContentCard = styled.div.attrs({
  className: 'pt-card'
})`
  width: 100%;
`

export const LiveRunsWrapper = styled.div`margin-bottom: 40px;`

export const InstructorsWrapper = styled.div``

export const InstructorItemWrapper = styled.div`
  display: flex;
  flex-align: row;
  margin-bottom: 20px;
  @media only screen and (max-width: ${mobileBPCSS}) {
    flex-align: column;
  }
`

export const LiveRunWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

export const LiveRunRow = styled.div`
  display: flex;
  flex-align: row;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  padding: 3px;
  background: rgb(226, 237, 252);
  .pt-dark & {
    background: rgb(47, 52, 62);
  }
  @media only screen and (max-width: ${mobileBPCSS}) {
    height: 80px;
  }
`

export const LiveRunRowLeft = styled.div`
  user-select: none;
  cursor: pointer;
  margin: auto;
  margin-left: 0;
`

export const LiveRunRowRight = styled.div`
  user-select: none;
  margin: auto;
  margin-right: 0;
  text-align: center;
`

export const RunStartSessionsCount = styled.span.attrs({
  className: 'pt-text-muted'
})`

`

export const AlreadyPurchasedWrapper = styled.span.attrs({
  className: 'pt-text-muted'
})`
  margin-right: 2px;
`

export const SessionNote = styled.span.attrs({
  className: 'pt-text-muted'
})`
  margin-right: 2px;
`

export const PriceWrapper = styled.span`
  margin-right: 4px;
  @media only screen and (max-width: ${mobileBPCSS}) {
    margin-right: 0;
    margin-bottom: 4px;
  }
`

export const SessionRowWrapper = styled.div`
  margin-top: 18px;
  @media only screen and (max-width: ${mobileBPCSS}) {
  }
`

export const RunStartDate = styled.strong`margin-right: 5px;`

interface ToggleIconProps {
  open: boolean
}

export const StartDateSessionsMobileBr = styled.br`
  display: none;
  @media only screen and (max-width: ${mobileBPCSS}) {
    display: block;
  }
`

export const ToggleIcon = styled.div.attrs({
  className: 'pt-icon-caret-down'
})`
  transition: 0.3s ease all;
  cursor: pointer;
  margin: auto 5px;
  font-size: 1.3rem;
  vertical-align: middle;
  transform: rotateZ(${(props: ToggleIconProps) => (props.open ? 180 : 0)}deg);
`

export const LiveRunCollapse = styled(Collapse)`
  & .pt-collapse-body > *:last-child {
    border-bottom: none;
  }
`

export const LiveSessionWrapper = styled.div``

export const RegisterButton = styled(Button).attrs({
  intent: Intent.SUCCESS
})`
  @media only screen and (max-width: ${mobileBPCSS}) {
    width: 100%;
  }
`
