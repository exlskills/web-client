import { Icon } from 'common/components/styledComponents'
import styled from 'styled-components'

export const Wrapper = styled.div``

interface ArrowProps {
  disabled?: boolean
}

const Arrow = styled(Icon).attrs({
  link: true
})`
  font-weight: bold !important;
  color: ${(props: ArrowProps) => (props.disabled ? '#aaa' : '#666')};
  position: relative;
  max-width: 300px;

  &:after {
    content: "";
    position: absolute;
    top: -10px;
    left: -5px;
    right: -5px;
    bottom: -10px;
  }
`

// TODO: export IconProps or make iconName as optional
export const LeftArrow: any = Arrow.extend.attrs({
  iconName: 'arrow-left'
})``

export const RightArrow: any = Arrow.extend.attrs({
  iconName: 'arrow-right'
})`
  margin-left: 10px;
`
export const MoreIcon = styled(Icon)`
  margin-left: 10px;
  color: #999;
`

interface BulletDotProps {
  active?: boolean
  color?: string // TODO
}
export const BulletDot = styled.span`
  background-color: ${(props: BulletDotProps) =>
    props.active ? '#3671B6' : '#fff'};
  position: relative;
  border-radius: 50%;
  height: 14px;
  margin-left: 10px;
  width: 14px;
  display: inline-block;
  top: 2px;
  cursor: pointer;
  border: 2px solid
    ${(props: BulletDotProps) => (props.active ? '#3671B6' : '#666')};

  &:after {
    content: "";
    position: absolute;
    top: -10px;
    left: -5px;
    right: -5px;
    bottom: -10px;
  }
`
