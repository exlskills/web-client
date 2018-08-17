import QuestionHint from './QuestionHint'
import * as React from 'react'
import {
  Wrapper,
  Row,
  Title,
  Button,
  ResultPopoverContent,
  ErrorResult,
  WrongResult,
  CorrectResult,
  ResultButton
} from './styledComponents'
import { QuestionType } from 'common/components/ExamQuestion'
import ProgressCells, {
  ICellItem
} from 'pages/Course/components/overview/ProgressCells'
import { Collapse, Intent, Popover, Position } from '@blueprintjs/core'
import messages from '../messages'
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl'
import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'
import SubmitQuizAnswerMutation from '../../mutations/SubmitQuizAnswerMutation'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
import { processCourseData } from '../../../../utils/course_data_processor'
interface IProps {
  disableSubmit?: boolean
  disableHint?: boolean
}
type MergedProps = IProps & IFreactalProps & InjectedIntlProps

interface IStates {
  showHint: boolean
  showPopover: boolean
  result: string
  explanation: string
}

class ExamModalSidebar extends React.Component<MergedProps, IStates> {
  static defaultProps = {
    disableSubmit: false,
    disableHint: false
  }
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any
  state: IStates = {
    showHint: false,
    showPopover: false,
    result: '',
    explanation: ''
  }

  toggleShowHint = () => {
    this.setState({ showHint: !this.state.showHint })
  }

  private onInteraction = (state: boolean) => this.handleInteraction(state)

  private handleInteraction = (nextOpenState: boolean) => {
    const question = this.props.state.examQuestion
    let nextState = nextOpenState
    if (!question) {
      nextState = false
    }
    if (this.state.result == 'correct' || this.state.result == 'wrong') {
      nextState = true
    }
    this.setState({ showPopover: nextState })
  }

  encodeAnswers(question_type: any, answer: any) {
    if (question_type == QuestionType.Single) {
      answer = [answer]
    }
    const answerArray = { selected_ids: answer }
    return JSON.stringify(answerArray)
  }

  reloadUnit(newData: any) {
    let allUnits = { ...this.props.state.examAllUnits }
    let unit = allUnits.unitsById[newData.id]
    unit.ema = newData.ema
    unit.grade = newData.grade
    unit.unit_processing = newData.unit_processing
    unit.sections_list = newData.sections_list
    this.props.effects.setExamAllUnits(processCourseData(allUnits))
  }

  handleSubmitClick = () => {
    if (this.props.state.examQuestion == null) {
      return
    }
    const { examQuestion, examAnswer, examQuizId, examUnit } = this.props.state
    if (this.hasAnswer()) {
      this.setState({
        showPopover: true,
        result: 'checking'
      })
      SubmitQuizAnswerMutation(
        examQuestion.id,
        examQuizId,
        this.encodeAnswers(examQuestion.question_type, examAnswer),
        false
      ).then((res: any) => {
        if (!res || !res.submitAnswer) {
          this.setState({
            showPopover: true,
            result: 'error'
          })
          return
        }

        if (res.submitAnswer.is_correct) {
          this.reloadUnit(res.submitAnswer.unit)
          this.setState({ showPopover: true, result: 'correct' })
          if (document.getElementById('havent-learn')) {
            document
              .getElementById('havent-learn')
              .setAttribute('disabled', 'true')
          }
          return
        }
        // const explain = res.submitAnswer.explain_text
        // this.setState({ explainText: explain })
        this.setState({
          showPopover: true,
          result: 'wrong',
          explanation: res.submitAnswer.explain_text
        })
      })
    } else {
      this.setState({
        showPopover: true,
        result: 'answer'
      })
    }
  }

  handleTryAgain = () => {
    this.setState({ showPopover: false, result: '' }, () => {
      this.props.effects.setExamExplanation('')
      this.props.effects.setExamAnswer(null)
    })
  }

  handleShowExplain = () => {
    this.setState({ showPopover: false, result: '' }, () => {
      return this.props.effects.setExamExplanation(this.state.explanation)
    })
  }

  handleNotLearnedClick = () => {
    if (this.props.state.examQuestion == null) return
    const { examQuestion, examQuizId } = this.props.state
    wsclient.sendEvent(WS_EVENTS.userQuestion, {
      user_id: this.context.viewer.user_id,
      ques_id: examQuestion.id,
      quiz_id: examQuizId,
      act: 'havent_learned'
    })
    this.goToNextQuestion()
  }
  handleNextQuestionWithOutSave = () => {
    this.goToNextQuestion()
  }
  handleOpenConceptClick = () => {
    const newState = !this.props.state.examCardOpen
    this.props.effects.setExamCardOpen(newState)
  }

  goToNextQuestion = () => {
    const { examQuestion } = this.props.state
    const currentCursor = examQuestion.pageInfo.endCursor
    this.setState({ showHint: false, showPopover: false, result: '' }, () => {
      this.props.effects.massiveUpdate({
        examAnswer: null,
        examExplanation: '',
        examQuestionCursor: currentCursor
      })
    })
    document.getElementById('havent-learn').removeAttribute('disabled')
  }

  hasAnswer = () => {
    const { examAnswer } = this.props.state
    return examAnswer && examAnswer.length > 0
  }

  renderResultPopover = () => {
    const { formatMessage } = this.props.intl
    let content
    if (this.state.result == 'correct') {
      content = (
        <div>
          <CorrectResult>
            <FormattedMessage {...messages.txtAnswerCorrect} />
          </CorrectResult>
          <div style={{ textAlign: 'center' }}>
            <ResultButton
              text={formatMessage(messages.btnNext)}
              onClick={this.goToNextQuestion}
            />
          </div>
        </div>
      )
    } else if (this.state.result == 'answer') {
      content = (
        <ErrorResult>
          <FormattedMessage {...messages.txtAnswerEmpty} />
        </ErrorResult>
      )
    } else if (this.state.result == 'error') {
      content = (
        <ErrorResult>
          <FormattedMessage {...messages.txtAnswerError} />
        </ErrorResult>
      )
    } else if (this.state.result == 'wrong') {
      content = (
        <div>
          <WrongResult>
            <FormattedMessage {...messages.txtAnswerWrong} />
          </WrongResult>
          <ResultButton
            text={formatMessage(messages.btnTryAgain)}
            onClick={this.handleTryAgain}
          />
          <ResultButton
            text={formatMessage(messages.btnShowExplanation)}
            onClick={this.handleShowExplain}
          />
        </div>
      )
    } else {
      // if (this.state.result == 'checking') {
      content = (
        <div>
          <FormattedMessage {...messages.txtChecking} />
        </div>
      )
    }

    return (
      <ResultPopoverContent>
        {content}
      </ResultPopoverContent>
    )
  }
  renderButtonAnswer = () => {
    const haveQuestion = this.props.state.examQuestion
    const { intl, disableSubmit } = this.props
    const { formatMessage } = intl
    let disableButton = false
    if (this.state.showPopover == true || haveQuestion == null) {
      disableButton = true
    }

    if (this.props.state.examExplanation == '') {
      return (
        <Popover
          isOpen={this.state.showPopover}
          onInteraction={this.onInteraction}
          content={this.renderResultPopover()}
          position={Position.TOP}
        >
          <Button
            disabled={disableButton ? true : disableSubmit}
            text={formatMessage(messages.submitAnswerButton)}
            intent={Intent.PRIMARY}
            onClick={this.handleSubmitClick}
          />
        </Popover>
      )
    } else {
      return (
        <Button
          text={formatMessage(messages.nextButton)}
          intent={Intent.PRIMARY}
          onClick={this.handleNextQuestionWithOutSave}
        />
      )
    }
  }

  renderAnswerBlock = () => {
    if (this.props.state.examCardOpen) {
      return <div />
    }

    const { intl } = this.props
    const { formatMessage } = intl
    const haveQuestion = this.props.state.examQuestion
    let disableButtonHave = false
    if (!haveQuestion) {
      disableButtonHave = true
    }
    if (this.state.result == 'correct') {
      disableButtonHave = true
    }
    if (this.props.state.examExplanation != '') {
      disableButtonHave = true
    }
    return (
      <Row>
        <Title>
          {formatMessage(messages.answerTitle)}
        </Title>
        {this.renderButtonAnswer()}
        <Button
          id="havent-learn"
          text={formatMessage(messages.notLearnedButton)}
          disabled={disableButtonHave ? true : false}
          intent={Intent.WARNING}
          onClick={this.handleNotLearnedClick}
        />
      </Row>
    )
  }

  renderHintBlock = () => {
    if (this.props.state.examCardOpen) {
      return <div />
    }

    let { intl, disableHint } = this.props
    const { showHint } = this.state
    const { formatMessage } = intl

    const { examQuestion } = this.props.state
    const questionId = examQuestion ? examQuestion.id : null
    const haveQuestion = this.props.state.examQuestion
    if (haveQuestion == null) {
      disableHint = true
    }
    return (
      <Row>
        <Title>
          {formatMessage(messages.hintTitle)}
        </Title>
        <Button
          disabled={disableHint}
          text={formatMessage(
            showHint ? messages.hideHintButton : messages.hintButton
          )}
          iconName="help"
          onClick={this.toggleShowHint}
          style={{ marginBottom: '10px' }}
        />
        <Collapse isOpen={showHint}>
          <QuestionHint shouldFetch={showHint} questionId={questionId} />
        </Collapse>
      </Row>
    )
  }

  renderGoToConceptBlock = () => {
    const cardOpen = this.props.state.examCardOpen
    const { formatMessage } = this.props.intl
    const haveQuestion = this.props.state.examQuestion
    let disableConcept = false
    if (haveQuestion == null) {
      disableConcept = true
    }
    return (
      <Row>
        <Title>
          {formatMessage(
            cardOpen ? messages.readyTitle : messages.learnMoreTitle
          )}
        </Title>
        <Button
          iconName="book"
          text={formatMessage(
            cardOpen ? messages.backConceptButton : messages.viewConceptButton
          )}
          onClick={this.handleOpenConceptClick}
          disabled={disableConcept}
        />
      </Row>
    )
  }

  render() {
    console.log('sidebar render')
    const {
      examQuestion,
      examAnswer,
      examQuizId,
      examAllUnits,
      examUnit,
      examUnitId,
      examSection,
      examSectionId,
      examType
    } = this.props.state
    const currUnit = examAllUnits.unitsById[examUnitId]
    let progressList = currUnit.sections_list
    if (examType == 'section') {
      const sectionData = currUnit.sections_list.find(
        (item: any) => item.id == examSection.id
      )
      progressList = []
      if (sectionData) {
        progressList = sectionData.cards_list
      }
    }
    const activeCardId = examQuestion ? examQuestion.card_id : null

    return (
      <Wrapper>
        {/*<ProgressCells*/}
        {/*width="100%"*/}
        {/*items={progressList}*/}
        {/*activeItem={activeCardId}*/}
        {/*/>*/}
        {this.renderAnswerBlock()}
        {this.renderHintBlock()}
        {this.renderGoToConceptBlock()}
      </Wrapper>
    )
  }
}

export default injectIntl<IProps>(injectState(ExamModalSidebar))
