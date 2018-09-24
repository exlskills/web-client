import { Button } from '@blueprintjs/core'
import { Box, Flex } from 'grid-styled'
import styled from 'styled-components'
import * as ReactSplitPane from 'react-split-pane'

const pointWidth = 60
const pointMargin = 10

interface QuestionViewerProps {
  transparentStyle?: boolean
  hasPoints?: boolean
}

export const AnswerWrapper = styled.div`margin-top: 15px;`

export const ExplanationWrapper = styled.div`margin-top: 10px;`

export const QuestionWrapper = styled.div`position: relative;`

export const QuestionPoints = styled.div.attrs({
  className: 'pt-card'
})`
  position: absolute;
  top: 0;
  left: 0;
  width: ${pointWidth}px;
  padding: 10px;
  text-align: center;
`

export const QuestionViewer = styled.div.attrs<QuestionViewerProps>({
  className: (props: QuestionViewerProps) =>
    props.transparentStyle ? '' : 'pt-card'
})`
  overflow: auto;
  ${props => {
    return props.hasPoints
      ? `
      width: calc(100% - ${pointWidth + pointMargin}px);
      margin-left: ${pointWidth + pointMargin}px;
   `
      : ''
  }}
  padding: ${props => {
    return props.transparentStyle ? '' : '0'
  }}

`

export const QuestionHeader = styled.div`
  padding: 20px 20px 0 20px;
  width: 100%;
  font-size: 18px;
  color: ${props => props.theme.highlightedText};
`
export const QuestionAnswer = styled.div`
  padding: 0 20px 20px 20px;
  width: 100%;
`
