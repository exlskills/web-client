import { Button } from '@blueprintjs/core'
import { Flex } from 'grid-styled'
import styled from 'styled-components'

export const Wrapper = styled.div``

interface DividerProps {
  children?: any // workaround for props types!
  lineWidth?: string
}
export const Divider = styled.div`
  margin: 0.5em auto;
  min-height: 1em;
  position: relative;
  text-align: center;

  &:before,
  &:after {
    display: inline-block;
    width: ${(props: DividerProps) =>
      props.children ? props.lineWidth || '43%' : '50%'};
    border-top: 1px solid #333;
    content: ' ';
    position: absolute;
    top: .5em;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`

export const SocialButtons = styled(Flex).attrs({
  wrap: true
})``

const SocialButton = styled(Button)`
  width: 50%;
  svg {
    margin-right: 5px;
    top: -1px;
    position: relative;
  }
`

export const GoogleButton = SocialButton.extend`
  &.pt-button {
    // overrides default styles
    color: #fff;
    background: #dd4b39;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    &:hover {
      background: #c23321;
    }
    &:active {
      background: #a32b1c;
    }
  }
`

export const GithubButton = SocialButton.extend`
  &.pt-button {
    // overrides default styles
    color: #fff;
    background: #444;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:hover {
      background: #2b2b2b;
    }
    &:active {
      background: #191919;
    }
  }
`
