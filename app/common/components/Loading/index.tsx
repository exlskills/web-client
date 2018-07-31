import * as React from 'react'
import styled from 'styled-components'
import { CenterContainer } from 'common/components/styledComponents'
import { Spinner } from '@blueprintjs/core'

interface IProps {
  mt?: string
  height?: string
}

const Wrapper = CenterContainer.extend`
  display: flex;
  justify-content: center;
  padding-top: ${(props: IProps) => (props.mt ? props.mt : '8rem')};
  background: transparent;
  height: ${(props: IProps) => (props.height ? props.height : 'auto')};
`

export default (props: IProps) =>
  <Wrapper mt={props.mt}>
    <Spinner />
  </Wrapper>
