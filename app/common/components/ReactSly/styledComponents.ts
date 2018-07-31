import styled from 'styled-components'

export const Wrapper = styled.div`width: 100%;`

export const ScrollbarWrapper = styled.div.attrs({
  className: 'scrollbar'
})`
  width: 100%;
  margin: 0 0 1em 0;
  height: 2px;
  background: #ccc;
  line-height: 0;
`
export const Scrollbar = styled.div.attrs({
  className: 'handle'
})`
  width: 50px;
  height: 100%;
  background: #666;
  cursor: pointer;
`
export const Handle = styled.div.attrs({
  className: 'mousearea'
})`
  position: absolute;
  top: -9px;
  left: 0;
  width: 100%;
  height: 20px;
`
