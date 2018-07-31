import { Flex } from 'grid-styled'
import styled from 'styled-components'

export const Wrapper = styled(Flex).attrs({
  align: 'flex-start',
  wrap: true
})``

export const UploaderWrapper = styled.label.attrs({
  className: 'pt-file-upload'
})`
  margin-top: 10px;
  width: 100%;
`

export const UploaderInput = styled.input.attrs({
  type: 'file'
})`
  width: 100%;
  min-width: 100% !important;
`

export const UploaderButton = styled.span.attrs({
  className: 'pt-button pt-fill'
})`
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
