import { Button, AnchorButton, IButtonProps } from '@blueprintjs/core'
import styled from 'styled-components'

interface ILogoWrapper {
  link?: boolean
  onClick?: () => void
}

export const LogoWrapper = styled.div`
  cursor: ${(props: ILogoWrapper) => props.link && 'pointer;'};
`

export const NavItem = styled(Button).attrs({
  className: 'pt-minimal'
})`
  &.pt-active {
    background: ${props => props.theme.activeNavbarItem} !important;
  }
`
export const UserButton = styled(AnchorButton).attrs({
  className: 'pt-minimal'
})`
  padding: 0;
  margin-left: 5px;
  line-height: inherit; // reset
`

export const PinkActionButton = styled(Button).attrs<IButtonProps>({})`
  .pt-light & {
    background-color: rgb(226, 15, 109) !important;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
  }
  .pt-dark & {
    background-color: rgb(226, 15, 109) !important;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
  }
`

export const LoginSignupButton = PinkActionButton.extend.attrs<IButtonProps>(
  {}
)`
  margin-left: 5px;
  @media only screen and (min-width: 769px) {
    min-width: 120px;
  }
`

export const UpgradeButtonStyled = PinkActionButton.extend.attrs<IButtonProps>({
  iconName: 'star'
})`
  margin-right: 15px;
  @media only screen and (min-width: 769px) {
    min-width: 120px;
  }
  
  &::before {
    margin-top: -5px;
  }
`

export const HideXS = styled.span`
  @media only screen and (max-width: 374px) {
    display: none;
  }
`
