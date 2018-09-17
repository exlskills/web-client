import styled from 'styled-components'
import ReactSplitPane from 'react-split-pane'

const pointWidth = 60
const pointMargin = 10

interface QuestionViewerProps {
  transparentStyle?: boolean
  hasPoints?: boolean
}

export const AnswerWrapper = styled.div`margin-top: 15px;`

export const ExplanationWrapper = styled.div`margin-top: 10px;`

export const QuestionWrapper = styled.div.attrs<{ splitHeight?: number }>({})`
  position: relative;
  ${props => {
    return props.splitHeight
      ? `
      height: ${props.splitHeight};
      max-height: ${props.splitHeight};
   `
      : `
      height: inherit;
      max-height: inherit;
  `
  }}
`

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
  height: inherit;
  max-height: inherit;
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
`
export const QuestionAnswer = styled.div`
  padding: 0 20px 20px 20px;
  width: 100%;
`

export const QuestionSplitPane = styled(ReactSplitPane).attrs({
  pane2Style: { overflowY: 'auto' as any, background: 'inherit' },
  pane1Style: { overflowY: 'auto' as any, background: 'inherit' }
})`
  ${(props: QuestionViewerProps) => {
    return props.hasPoints
      ? `
      width: calc(100% - ${pointWidth + pointMargin}px)!important;
   `
      : ''
  }}
  background: inherit;
   .Resizer {
   background: #000;
   opacity: .2;
   z-index: 1;
   -moz-box-sizing: border-box;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   -moz-background-clip: padding;
   -webkit-background-clip: padding;
   background-clip: padding-box;
   }
  
   .Resizer:hover {
   -webkit-transition: all 2s ease;
   transition: all 2s ease;
   }
  
   .Resizer.horizontal {
   height: 11px;
   margin: -5px 0;
   border-top: 5px solid rgba(255, 255, 255, 0);
   border-bottom: 5px solid rgba(255, 255, 255, 0);
   cursor: row-resize;
   width: 100%;
   }
  
   .Resizer.horizontal:hover {
   border-top: 5px solid rgba(0, 0, 0, 0.5);
   border-bottom: 5px solid rgba(0, 0, 0, 0.5);
   }
  
   .Resizer.vertical {
   width: 11px;
   margin: 0 -5px;
   border-left: 5px solid rgba(255, 255, 255, 0);
   border-right: 5px solid rgba(255, 255, 255, 0);
   cursor: col-resize;
   }
  
   .Resizer.vertical:hover {
   border-left: 5px solid rgba(0, 0, 0, 0.5);
   border-right: 5px solid rgba(0, 0, 0, 0.5);
   }
   .Resizer.disabled {
   cursor: not-allowed;
   }
   .Resizer.disabled:hover {
   border-color: transparent;
   }
 `

export const SplitViewWrapper = styled.div.attrs<QuestionViewerProps>({})`
  z-index: 2; 
  position: absolute;
  line-height: 2;
  ${props => {
    return props.hasPoints
      ? `
      top: 70px;
      `
      : `
      top: 0px;
      right: 15px;`
  }}
  `
