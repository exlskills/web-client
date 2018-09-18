import styled from 'styled-components'
import { Icon } from '@blueprintjs/core'

export const BackArrow = styled.span.attrs<any>({
  iconName: 'chevron-left',
  iconSize: 20
})`
  left: 0;
  position: absolute;
  top: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 0;
  padding: 0;
  border: none;
  border-radius: 20px;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.5s;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 25px;
    left: 10px;
    width: 9px;
    height: 3px;
    border-radius: 3px;
    background-color: rgb(180, 180, 190);
    transform-origin: 0% 50%;
  }
  
  &::before {
    transform: rotate(-45deg);
  }
  
  &::after {
    margin-top: -2px;
    transform: rotate(45deg);
  }
`

export const NextArrow = styled.span.attrs<any>({
  iconName: 'chevron-right',
  iconSize: 20
})`
  right: 0;
  position: absolute;
  top: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 0;
  padding: 0;
  border: none;
  border-radius: 20px;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.5s;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 25px;
    right: 10px;
    width: 9px;
    height: 3px;
    border-radius: 3px;
    background-color: rgb(180, 180, 190);
    transform-origin: 100% 50%;
  }
  &::before {
    margin-top: -2px;
    transform: rotate(-45deg);
  }
  
  &::after {
    transform: rotate(45deg);
  }
  &::before {
    transform: rotate(-45deg);
  }
  
  &::after {
    transform: rotate(45deg);
  }
`

export const DotNav = styled.nav`
  position: relative;
  padding: 0 40px;
  border-radius: 20px;
`

export const DotsList = styled.ul`
  padding-left: 0 !important;
  padding-right: 11px !important;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`

interface IDotProps {
  selected?: boolean
  shaded?: boolean
}

export const Dot = styled.li.attrs<IDotProps>({})`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  padding: 5px;
  &::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    ${props =>
      props.selected || props.shaded
        ? 'background-color: rgb(23, 101, 222);'
        : 'background-color: rgb(180, 180, 190);'}
    transition: box-shadow 0.5s;
    ${props => props.selected && `box-shadow: 0 0 0 3px rgb(23, 101, 222);`}
  }
  ${props =>
    !props.selected &&
    `
    &:hover::after,
    &:focus::after {
      box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.5) !important;
    }
    cursor: pointer;
  `}
`
