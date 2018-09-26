import * as React from 'react'
let Markdown = require('react-remarkable')
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Switch } from '@blueprintjs/core'
import Explanation from './Explanation'
import messages from './messages'
import MarkdownStyleWrapper from 'common/components/MarkdownStyleWrapper'
import MultipleChoice, {
  QuestionResponseData,
  MultiOptionProps
} from './MultipleChoice'
import CodeResponse, { ICodeResponseProps } from './CodeResponse'
import {
  QuestionPoints,
  QuestionWrapper,
  AnswerWrapper,
  ExplanationWrapper,
  QuestionViewer,
  QuestionHeader,
  QuestionAnswer
} from './styledComponents'
import { isObject } from 'util'

export enum QuestionType {
  Single = 'MCSA' as any,
  Multiple = 'MCMA' as any,
  CodeResponse = 'WSCQ' as any
}

// TODO: Consider to remove []
export type QuestionDataProps = MultiOptionProps[] | ICodeResponseProps
export type AnswerProps = QuestionResponseData

export interface QuestionProps {
  id: string
  points?: number | string
  number?: number | string
  question_text: string
  question_type: QuestionType
  data?: any
  question_data?: QuestionDataProps
  correct_answer?: AnswerProps
  question_answer?: string
}

interface IProps {
  question: QuestionProps
  userAnswer?: AnswerProps
  onAnswerChange?: (answer: AnswerProps) => void
  transparentStyle?: boolean
  showResults?: boolean
  defaultShowExplanation?: boolean
  explanationTitle?: string
  explanationContent?: string
  splitHeight?: any
  splitFlexible?: boolean
}

interface IStates {
  showExplanation: boolean
}

class ExamQuestion extends React.PureComponent<
  IProps & InjectedIntlProps,
  IStates
> {
  state: IStates = {
    showExplanation: this.props.defaultShowExplanation
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.updateViewMode(nextProps)
  }

  componentWillMount() {
    this.updateViewMode(this.props)
  }

  updateViewMode(props: IProps) {
    if (props.defaultShowExplanation != this.props.defaultShowExplanation) {
      this.setState({ showExplanation: props.defaultShowExplanation })
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IStates) {
    return (
      this.state.showExplanation != nextState.showExplanation ||
      this.props.question != nextProps.question ||
      this.props.userAnswer != nextProps.userAnswer
    )
  }

  parseQuestionData() {
    const { question } = this.props
    let question_data = []
    if (
      question.data.options &&
      (question.question_type == QuestionType.Multiple ||
        question.question_type == QuestionType.Single)
    ) {
      question_data = question.data.options.map((item: any) => ({
        value: item.id,
        text: item.text
      }))
    } else if (question.question_type == QuestionType.CodeResponse) {
      question_data = question.data
    }

    return {
      ...question,
      question_data: question_data
    }
  }

  renderQuestionContent = (question: QuestionProps) => {
    return (
      <MarkdownStyleWrapper>
        <Markdown
          options={{ html: true }}
          source={question.question_text || ''}
        />
      </MarkdownStyleWrapper>
    )
  }

  renderAnswerOptions = (question: QuestionProps) => {
    const {
      id,
      question_text,
      question_type,
      question_data,
      correct_answer
    } = question
    const { userAnswer, onAnswerChange, showResults } = this.props

    if (!question_type || !question_data) {
      return
    }

    let answersComp
    if (
      question_type == QuestionType.Single ||
      question_type === QuestionType.Multiple
    ) {
      answersComp = (
        <MultipleChoice
          key={`question_${id}`}
          options={question_data as MultiOptionProps[]}
          multiSelection={question_type == QuestionType.Multiple}
          selectedOptions={userAnswer || { selected_ids: [] }}
          onChange={onAnswerChange}
          showResults={showResults}
          correctOptions={correct_answer}
        />
      )
    } else if (question_type == QuestionType.CodeResponse) {
      answersComp = (
        <CodeResponse
          key={`question_${id}`}
          editorData={question_data as ICodeResponseProps}
          onChange={wspc =>
            onAnswerChange({ user_files: JSON.stringify(wspc) })}
        />
      )
    }

    return (
      <AnswerWrapper>
        {answersComp}
      </AnswerWrapper>
    )
  }

  renderExplanation() {
    /*if (!this.props.showResults) {
      return null
    }*/

    const { formatMessage } = this.props.intl
    const { explanationTitle, explanationContent } = this.props
    const { showExplanation } = this.state
    const explanTitleText = explanationTitle
      ? explanationTitle
      : formatMessage(messages.lbExplanation)

    return (
      <ExplanationWrapper>
        <Explanation
          hidden={!showExplanation}
          title={explanTitleText}
          content={explanationContent}
        />
      </ExplanationWrapper>
    )
  }

  render() {
    const { transparentStyle } = this.props
    const question = this.parseQuestionData()

    return (
      <QuestionWrapper>
        {question.points &&
          <QuestionPoints>
            {question.points}
            <br />
            {this.props.intl.formatMessage(
              question.points == 1 ? messages.lbPoint : messages.lbPoints
            )}
          </QuestionPoints>}

        <QuestionViewer
          hasPoints={!!question.points}
          transparentStyle={transparentStyle}
        >
          <span>
            <QuestionHeader>
              {this.renderQuestionContent(question)}
            </QuestionHeader>
            <QuestionAnswer>
              {this.renderAnswerOptions(question)}
              {this.renderExplanation()}
            </QuestionAnswer>
          </span>
        </QuestionViewer>
      </QuestionWrapper>
    )
  }
}

export default injectIntl(ExamQuestion)
