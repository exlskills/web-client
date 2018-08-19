import ExamQuestion, {
  AnswerProps,
  QuestionType,
  QuestionProps
} from 'common/components/ExamQuestion'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { RouteComponentProps, withRouter, Prompt } from 'react-router'
import LineNavigator from 'common/components/LineNavigator'
import ExamAction from './ExamAction'
import { SUBMIT_KEY } from '../../constants'
import messages from '../../messages'
import AnswerExamQuestionMutation from '../../mutations/AnswerExamQuestionMutation'
import LeaveExamMutation from '../../mutations/LeaveExamMutation'
import {
  ContentWrapper,
  Goback,
  Navigator,
  QuestionWrapper,
  SplitPane,
  RightPanelWrapper,
  HeaderWrapper,
  ExamWrapper
} from '../../styledComponents'
import Sidebar from '../Sidebar'
import SubmitCard from '../SubmitCard'
import { Sticky } from 'react-sticky'
import ConfirmDialog from 'common/components/ConfirmDialog'

interface IProps {
  courseId: string
  courseUrlId: string
  unitId: string
  questionsList?: string[]
  questionsById?: {
    [id: string]: QuestionProps
  }
  completed?: boolean
  logo_url: string
  title_unit: string
  examTimeLimit: number
  examAttemptId: string
}

interface IStates {
  activeQuestion: string
  answersByQuestion: { [id: string]: AnswerProps }
  markForReviews: any
  skippedQuestions: any
  isSubmitted: boolean
  showSubmitConfirmDialog: boolean
}

class ExamDump extends React.PureComponent<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  static defaultProps: Partial<IProps> = {
    completed: false,
    questionsList: [],
    questionsById: {}
  }

  constructor(props: any) {
    super(props)

    const { questionsList, questionsById } = this.props
    let firstQuestion = SUBMIT_KEY
    if (questionsList[0] && questionsById[questionsList[0]]) {
      firstQuestion = questionsById[questionsList[0]].id
    }

    let examAttemptId = ''
    let answersByQuestion: any = {}
    if (this.props.match.params.examId) {
      examAttemptId = this.props.match.params.examId
      for (let qId of questionsList) {
        let userAnswer = JSON.parse(questionsById[qId].question_answer || null)
        if (!userAnswer) {
          continue
        }

        if (questionsById[qId].question_type == QuestionType.Multiple) {
          answersByQuestion[qId] = userAnswer.selected_ids
        } else if (questionsById[qId].question_type == QuestionType.Single) {
          answersByQuestion[qId] = userAnswer.selected_ids[0]
        }
      }
    }

    const { formatMessage } = this.props.intl
    this.state = {
      activeQuestion: firstQuestion,
      answersByQuestion,
      markForReviews: [],
      skippedQuestions: [],
      isSubmitted: false,
      showSubmitConfirmDialog: false
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IStates) {
    return (
      this.state.activeQuestion != nextState.activeQuestion ||
      this.state.answersByQuestion != nextState.answersByQuestion ||
      this.state.markForReviews != nextState.markForReviews ||
      this.state.skippedQuestions != nextState.skippedQuestions ||
      this.state.showSubmitConfirmDialog != nextState.showSubmitConfirmDialog ||
      this.state.isSubmitted != nextState.isSubmitted
    )
  }

  examCancelSaveState() {
    if (!this.state.isSubmitted) {
      LeaveExamMutation(this.props.examAttemptId).then(res => {
        console.log('in examCancelSaveState')
      })
    }
  }

  handleQuestionChange = (value: any) => {
    if (this.state.activeQuestion != SUBMIT_KEY) {
      let answerData = null
      if (this.getCurrentAnswer()) {
        answerData = this.encodeAnswers(this.getCurrentAnswer())
      }
      AnswerExamQuestionMutation(
        this.props.examAttemptId,
        this.state.activeQuestion,
        answerData
      ).then(res => {
        console.log('in AnswerExamQuestionMutation', res)
      })
    }
    this.setState({ activeQuestion: value.id })
  }

  encodeAnswers(answer: any) {
    return JSON.stringify(answer)
  }

  handleAnswerChange = (answer: AnswerProps) => {
    const questionId = this.state.activeQuestion

    const answerData = this.encodeAnswers(answer)
    if (questionId != SUBMIT_KEY) {
      AnswerExamQuestionMutation(
        this.props.examAttemptId,
        questionId,
        answerData
      ).then(res => {
        console.log('in AnswerExamQuestionMutation', res)
      })
    }

    this.setState({
      answersByQuestion: {
        ...this.state.answersByQuestion,
        [questionId]: answer
      }
    })
  }

  handleSubmit = () => {
    LeaveExamMutation(this.props.examAttemptId).then((res: any) => {
      if (res && res.leaveExam && res.leaveExam.completionObj) {
        const completionObj = res.leaveExam.completionObj
        if (completionObj.code == '0') {
          this.setState({ isSubmitted: true }, () => {
            this.props.history.push(`/courses/${this.props.courseUrlId}/grades`)
          })
        }
      }
    })
  }

  handleExamCancel = () => {
    const courseUrlId = this.props.match.params.courseId
    this.props.history.push(`/courses/${courseUrlId}`)
  }

  handleSubmitExamCancel = () => {
    this.setState({ showSubmitConfirmDialog: false })
  }

  handleShowSubmitDialog = () => {
    this.setState({ showSubmitConfirmDialog: true })
  }

  returnSubmitMessage() {
    const { formatMessage } = this.props.intl

    const answeredQuestions =
      Object.keys(this.state.answersByQuestion).length || 0
    const totalQuestions = this.props.questionsList.length || 0

    let missingQuestionMessage = ''
    if (answeredQuestions !== totalQuestions) {
      missingQuestionMessage = formatMessage(messages.txtMissingQuestions, {
        answered: answeredQuestions.toString(),
        total: totalQuestions.toString()
      })
    }
    return {
      text: `${missingQuestionMessage} ${formatMessage(
        messages.pageSubmitPrompt
      )}`,
      title: formatMessage(messages.pageSubmitPromptTitle),
      submit: formatMessage(messages.pageSubmitPromptIgnore),
      cancel: formatMessage(messages.pageSubmitPromptCancel)
    }
  }

  getSidebarItems() {
    const { formatMessage } = this.props.intl
    const { questionsList } = this.getQuestions()

    return questionsList.map((questionId, idx) => ({
      text:
        questionId == SUBMIT_KEY
          ? formatMessage(messages.submit)
          : `${formatMessage(messages.txtQuestionTitle)} ${idx + 1}`,
      value: questionId
    }))
  }

  getQuestions() {
    const { questionsList, questionsById } = this.props
    return { questionsList: [...questionsList, SUBMIT_KEY], questionsById }
  }

  getCurrentAnswer() {
    const { activeQuestion, answersByQuestion } = this.state
    return (answersByQuestion as any)[activeQuestion]
  }

  getCurrentQuestion() {
    const { activeQuestion } = this.state
    const { questionsList, questionsById } = this.getQuestions()
    const number = questionsList.indexOf(activeQuestion) + 1
    const currentQuestion = questionsById[activeQuestion]

    return { ...currentQuestion, number }
  }

  goToNextQuestion = () => {
    const { activeQuestion } = this.state
    const { questionsList, questionsById } = this.getQuestions()
    const number = questionsList.indexOf(activeQuestion) + 1
    this.setState({ activeQuestion: questionsList[number] })
  }

  handleSkipQuestion = () => {
    const { activeQuestion } = this.state
    let skippedQuestions = [...this.state.skippedQuestions]
    skippedQuestions.push(activeQuestion)
    this.setState({ skippedQuestions: skippedQuestions })
    const { questionsList, questionsById } = this.getQuestions()
    const number = questionsList.indexOf(activeQuestion) + 1
    this.setState({ activeQuestion: questionsList[number] })
  }

  handleMarkForReviews = (markForReviewQuestion: any) => {
    let markForReviews = [...this.state.markForReviews]
    let idx
    if ((idx = markForReviews.indexOf(markForReviewQuestion)) > -1) {
      markForReviews.splice(idx, 1)
    } else {
      markForReviews.push(markForReviewQuestion)
    }
    this.setState({ markForReviews: markForReviews })
  }

  renderQuestionCard(activeQuestion: string, currentQuestion: any) {
    if (activeQuestion == SUBMIT_KEY) {
      return <SubmitCard onSubmit={this.handleShowSubmitDialog} />
    }
    const { answersByQuestion } = this.state
    const userAnswer = (answersByQuestion as any)[activeQuestion]

    return (
      <ExamWrapper>
        <ExamQuestion
          question={currentQuestion}
          userAnswer={userAnswer}
          onAnswerChange={this.handleAnswerChange}
          splitHeight={`${window.innerHeight - 210}px`}
        />
        <ExamAction
          onNext={this.goToNextQuestion}
          currentQuestion={activeQuestion}
          listAnswered={this.state.answersByQuestion}
          listMarkedForReview={this.state.markForReviews}
          onMarkForReview={this.handleMarkForReviews}
          onSkip={this.handleSkipQuestion}
        />
      </ExamWrapper>
    )
  }

  componentWillUnmount() {
    // Cancel exam when unmount the route
    window.onbeforeunload = null
    window.onunload = null
    return this.examCancelSaveState()
  }

  formatLabel = (title: any, index: number) => {
    const { questionsList } = this.getQuestions()
    if (index + 1 == questionsList.length) {
      return 'Submit'
    }
    return title ? title : index
  }

  render() {
    if (!this.props.completed) {
      // Prevent reload the page
      window.onbeforeunload = () => {
        return true
      }
      // Cancel exam when unload the page
      window.onunload = () => {
        return this.examCancelSaveState()
      }
    } else {
      window.onbeforeunload = null
      window.onunload = null
    }

    const { formatMessage } = this.props.intl
    const { completed } = this.props
    const { activeQuestion, skippedQuestions } = this.state
    const { questionsList } = this.getQuestions()
    // const sidebarItems = this.getSidebarItems()
    const currentQuestion = this.getCurrentQuestion()
    const answeredQuestions = Object.keys(this.state.answersByQuestion)

    let slideQuestions = questionsList.map((questionId, index, array) => {
      let question = {
        id: questionId,
        title: index + 1,
        color: null as string
      }

      if (answeredQuestions.indexOf(questionId) >= 0) {
        question.color = '#BA83F5'
      }

      if (this.state.markForReviews.indexOf(questionId) >= 0) {
        question.color = '#FDBB33'
      }
      return question
    })

    let answeredQuestionsNumber = answeredQuestions.length || 0

    const totalQuestions = this.props.questionsList.length || 0
    return (
      <div>
        <Prompt
          when={!this.state.isSubmitted}
          message={JSON.stringify({
            text: formatMessage(messages.pageLeavePrompt),
            title: formatMessage(messages.pageLeavePromptTitle),
            submit: formatMessage(messages.pageLeavePromptIgnore),
            cancel: formatMessage(messages.pageLeavePromptCancel)
          })}
        />
        <ConfirmDialog
          onSubmit={this.handleSubmit}
          onCancel={this.handleSubmitExamCancel}
          showDialog={this.state.showSubmitConfirmDialog}
          messageText={this.returnSubmitMessage()}
        />
        <SplitPane defaultSize={280}>
          <Sidebar
            onExamCancel={this.handleExamCancel}
            onExamSubmit={this.handleShowSubmitDialog}
            imageUrl={this.props.logo_url}
            title_elem={this.props.title_unit}
            answeredQuestions={answeredQuestionsNumber}
            totalQuestions={totalQuestions}
            timeLimit={this.props.examTimeLimit}
          />
          <RightPanelWrapper>
            <HeaderWrapper>
              <Navigator>
                <LineNavigator
                  items={slideQuestions}
                  activeValue={{ id: activeQuestion }}
                  onClick={this.handleQuestionChange}
                  hasSubmit={true}
                  formatLabel={this.formatLabel}
                  fixWidth={true}
                />
              </Navigator>
            </HeaderWrapper>
            <ContentWrapper>
              <QuestionWrapper>
                {this.renderQuestionCard(activeQuestion, currentQuestion)}
              </QuestionWrapper>
            </ContentWrapper>
          </RightPanelWrapper>
        </SplitPane>
      </div>
    )
  }
}

export default injectIntl<IProps>(withRouter(ExamDump))
