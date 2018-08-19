import * as React from 'react'
import ExamQuestion, {
  QuestionProps,
  AnswerProps
} from 'common/components/ExamQuestion'
import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'

export interface IProps {
  question: QuestionProps
}
type MergedProps = IProps & IFreactalProps

class ContentDump extends React.PureComponent<MergedProps, any> {
  handleAnswerChange = (answer: AnswerProps) => {
    this.props.effects.setExamAnswer(answer)
  }

  render() {
    let { question } = this.props

    const explanation = this.props.state.examExplanation
    let explanationData: any = {}
    if (explanation) {
      explanationData.defaultShowExplan = true
      explanationData.explanContent = explanation
    } else {
      explanationData.defaultShowExplan = false
    }

    console.log('contentdump', question)

    return (
      <ExamQuestion
        transparentStyle={true}
        question={question}
        userAnswer={this.props.state.examAnswer}
        onAnswerChange={this.handleAnswerChange}
        {...explanationData}
        splitHeight={'inherit'}
      />
    )
  }
}

export default injectState(ContentDump)
