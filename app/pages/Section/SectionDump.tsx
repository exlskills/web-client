import { Collapse, Intent, Popover, Position } from '@blueprintjs/core'
import ExamQuestion, {
  AnswerProps,
  QuestionProps,
  QuestionType
} from 'common/components/ExamQuestion'
import SectionCard from 'common/components/SectionCard'
import Toaster from 'common/components/Toaster'
import { fromUrlId, SchemaType, toUrlId } from 'common/utils/urlid'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
import * as React from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { RouteComponentProps, withRouter } from 'react-router'
import { Sticky, StickyContainer } from 'react-sticky'

import CardQuestionHint from './CardQuestionHint'
import Header from './components/Header'
import messages from './messages'
import SubmitCardAnswerMutation from './mutations/SubmitCardAnswerMutation'
import {
  ActionButton,
  Card,
  CorrectResult,
  ErrorResult,
  FixedSectionNavigate,
  HintWrapper,
  ResultButton,
  ResultPopoverContent,
  Wrapper,
  WrongResult,
  ExamQuestionWrapper
} from './styledComponents'
import Helmet from 'react-helmet'

interface IProps {
  cards: any
  course: any
}

interface IStates {
  cardView: boolean
  activeCardId: string
  cardQuizId: string
  cardId: string
  userAnswerById: {
    [id: string]: AnswerProps
  }
  result: string
  showResultPopover: boolean
  showExplanation: boolean
  explanation: string
  showHint: boolean
  selectedText: string
  showSelectionPopover: boolean[]
  startDiscussionOpen: boolean
  cardTags: string[]
  reloadDiscussion: number
  nextQuestion: any
}

class SectionDump extends React.PureComponent<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  constructor(props: any) {
    super(props)

    this.state = {
      cardView: true,
      activeCardId: props.cards && props.cards[0] ? props.cards[0].node.id : '',
      showSelectionPopover: [],
      selectedText: '',
      startDiscussionOpen: false,
      userAnswerById: {},
      result: null,
      explanation: null,
      showResultPopover: false,
      showExplanation: false,
      showHint: false,
      cardQuizId: '',
      cardId: '',
      cardTags: [],
      reloadDiscussion: 0,
      nextQuestion: null
    }
  }

  private _sendEvent = (cardId: string, action: string) => {
    const { courseId, unitId, sectionId } = this.getIdsFromUrl()
    wsclient.sendEvent(WS_EVENTS.cardAction, {
      course_id: courseId,
      unit_id: unitId,
      section_id: sectionId,
      card_id: cardId,
      user_id: this.context.viewer.user_id,
      action: action
    })
  }

  componentDidMount() {
    let currCard = this.state.activeCardId
    if (this.props.match.params.cardId) {
      currCard = fromUrlId(
        SchemaType.SectionCard,
        this.props.match.params.cardId
      )
    }
    this.setState({ activeCardId: currCard }, () => {
      this.updateCardUrl()
    })
    this._sendEvent(currCard, 'view')
  }

  getIdsFromUrl = () => {
    const courseId = fromUrlId(
      SchemaType.Course,
      this.props.match.params.courseId
    )
    const unitId = fromUrlId(
      SchemaType.CourseUnit,
      this.props.match.params.unitId
    )
    const sectionId = fromUrlId(
      SchemaType.UnitSection,
      this.props.match.params.sectionId
    )
    let cardId = ''
    if (this.props.match.params.cardId) {
      cardId = fromUrlId(SchemaType.UnitSection, this.props.match.params.cardId)
    }
    return { courseId, unitId, sectionId, cardId }
  }

  handleStartDiscussionClick = (card: any) => () => {
    const tagsList = card.tags
      ? card.tags.filter((tag: string) => tag.trim() != '')
      : []
    this.setState({
      startDiscussionOpen: !this.state.startDiscussionOpen,
      showSelectionPopover: [],
      cardId: card.id,
      cardTags: tagsList
    })
  }

  handleSubmitDiscussion = ({ title, comment, tags }: any) => {
    // const { courseId, unitId, sectionId } = this.getIdsFromUrl()
    // const courseUrlId = this.props.match.params.courseId
    // const { cards } = this.props
    // let { cardId, selectedText, cardTags } = this.state
    // const discussionTitle: string = title
    // const discussionComment: string = comment
    // let discussionTags: string[] = tags
    //
    // const card = cards.find((card: any) => card.node.id == cardId).node
    // const textIdx = card.content.content.indexOf(selectedText)
    // const range = [textIdx, selectedText.length]
    // const { formatMessage } = this.props.intl
    // if (discussionTags.length == 0 && cardTags.length > 0) {
    //   discussionTags = cardTags
    // }
    //
    // StartDiscussionMutation(
    //   courseId,
    //   unitId,
    //   sectionId,
    //   card.id,
    //   selectedText,
    //   range,
    //   discussionTitle,
    //   discussionComment,
    //   discussionTags
    // ).then((res: any) => {
    //   const message: any = {
    //     intent: Intent.SUCCESS,
    //     message: formatMessage(messages.txtStartDiscussionSuccess)
    //   }
    //   if (res && res.startDiscussion && res.startDiscussion.completionObj) {
    //     const completionObj = res.startDiscussion.completionObj
    //     if (completionObj.code == '0') {
    //       this.setState({
    //         showSelectionPopover: [],
    //         selectedText: '',
    //         startDiscussionOpen: false,
    //         cardTags: [],
    //         reloadDiscussion: Math.random()
    //       })
    //
    //       const discId = res.startDiscussion.discussionId
    //       const discUrlId = toUrlId(discussionTitle, discId)
    //       const url = `/courses/${courseUrlId}/discussions/${discUrlId}`
    //
    //       message.action = {
    //         href: url,
    //         target: '_blank',
    //         text: formatMessage(messages.txtStartDiscussionSuccessLinkAnchor)
    //       }
    //     } else {
    //       message.intent = Intent.DANGER
    //       message.message = completionObj.msg
    //     }
    //   } else {
    //     message.intent = Intent.DANGER
    //     message.message = formatMessage(
    //       messages.txtStartDiscussionSomethingWrong
    //     )
    //   }
    //   Toaster.show(message)
    // })
  }

  handleTextSelect = (idx: number) => (text: string) => {
    let showSelectionPopover = []
    showSelectionPopover[idx] = true
    this.setState({ selectedText: text.trim(), showSelectionPopover })
  }

  handleTextDeSelect = (idx: number) => () => {
    if (!this.state.startDiscussionOpen) {
      this.setState({ selectedText: '', showSelectionPopover: [] })
    }
  }

  toggleStartDiscussionDialog = () => {
    this.setState({
      startDiscussionOpen: !this.state.startDiscussionOpen,
      showSelectionPopover: []
    })
  }

  handleAnswerChange = (answer: AnswerProps) => {
    const userAnswerById = { ...this.state.userAnswerById }
    userAnswerById[this.state.activeCardId] = answer
    this.setState({ userAnswerById: userAnswerById })
  }

  handleTryAgain = () => {
    const userAnswerById = { ...this.state.userAnswerById }
    userAnswerById[this.state.activeCardId] = null
    this.setState({
      showResultPopover: false,
      showExplanation: false,
      userAnswerById: userAnswerById,
      result: ''
    })
  }

  handleShowExplain = () => {
    this.setState({ showResultPopover: false, showExplanation: true })
  }

  encodeAnswers(answer: any) {
    return JSON.stringify(answer)
  }

  handleSubmitClick = (question: QuestionProps) => () => {
    if (!this.hasAnswer()) {
      this.setState({
        showResultPopover: true,
        result: 'answer'
      })
      return
    }
    this.setState({ showResultPopover: true, result: 'checking' })

    const currUserAnswer = this.state.userAnswerById[this.state.activeCardId]

    SubmitCardAnswerMutation(
      question.id,
      this.state.cardQuizId,
      this.encodeAnswers(currUserAnswer),
      !this.getNextCardId()
    ).then((res: any) => {
      if (!res || !res.submitAnswer) {
        this.setState({
          showResultPopover: true,
          result: 'error'
        })
        return
      }

      if (res.submitAnswer.is_correct) {
        this._sendEvent(this.state.activeCardId, 'answ_c')
        this.setState({
          showResultPopover: true,
          result: 'correct',
          nextQuestion: res.submitAnswer.next_question
        })
        return // Important!!
      }

      this._sendEvent(this.state.activeCardId, 'answ_ic')
      this.setState({
        showResultPopover: true,
        result: 'wrong',
        explanation: res.submitAnswer.explain_text,
        nextQuestion: res.submitAnswer.next_question
      })
    })
  }

  goToNextCard = (nextId: string = null) => {
    const nextCardId = nextId ? nextId : this.getNextCardId()
    if (nextCardId == this.state.activeCardId) {
      return
    }

    if (nextCardId) {
      const { courseId, unitId, sectionId } = this.getIdsFromUrl()
      if (!this.state.userAnswerById[this.state.activeCardId]) {
        const { cardsIds } = this.getCards()
        const nextIndex = cardsIds.indexOf(nextCardId)
        const prevIndex = cardsIds.indexOf(this.state.activeCardId)
        this._sendEvent(
          this.state.activeCardId,
          nextIndex > prevIndex ? 'fwd' : 'bck'
        )
      }

      this.setState(
        {
          activeCardId: nextCardId,
          result: null,
          explanation: null,
          showResultPopover: false,
          showExplanation: false,
          showHint: false
        },
        () => {
          this.updateCardUrl()
        }
      )

      this._sendEvent(nextCardId, 'view')
    }
  }

  updateCardUrl() {
    const cardId = this.state.activeCardId
    console.log('fired')
    const cards = this.getCards()
    let cardUrlId = ''
    if (this.state.cardView) {
      cardUrlId = `/card/${toUrlId(
        cards.cardsById[cardId].title,
        cards.cardsById[cardId].id
      )}`
    }
    const url = `/courses/${this.props.match.params.courseId}/units/${this.props
      .match.params.unitId}/sections/${this.props.match.params
      .sectionId}${cardUrlId}`
    this.props.history.replace(url)
  }

  handleResultButton = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    if (top.location.href.indexOf('/classes/') > -1) {
      document.getElementsByClassName('Pane vertical Pane2')[0].scrollTop = 0
    }
    if (this.getNextCardId()) {
      this.goToNextCard()
    } else {
      this.handleTheLastNext()
    }
  }

  handleNotLearnedClick = () => {
    this.goToNextCard()
  }

  toggleShowHint = () => {
    if (!this.state.showHint) {
      this._sendEvent(this.state.activeCardId, 'hint')
    }
    this.setState({ showHint: !this.state.showHint })
  }

  private onInteraction = (state: boolean) => this.handleInteraction(state)
  private handleInteraction(nextOpenState: boolean) {
    this.setState({ showResultPopover: nextOpenState })
  }

  hasAnswer() {
    const userAnswer = this.state.userAnswerById[this.state.activeCardId]
    return userAnswer && (userAnswer.selected_ids || userAnswer.user_files)
  }

  handleTheLastNext = () => {
    const { nextQuestion } = this.state
    if (nextQuestion) {
      let nextUrl = ''
      if (nextQuestion.course_id == this.props.match.params.courseId) {
        nextUrl += `/courses/${nextQuestion.course_id}`
        if (nextQuestion.unit_id) {
          nextUrl += `/units/${nextQuestion.unit_id}`
        }
        if (nextQuestion.section_id) {
          nextUrl += `/sections/${nextQuestion.section_id}`
        }
      }
      this.props.history.replace(nextUrl)
    }
  }

  renderResultPopover() {
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
              onClick={this.handleResultButton}
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
    } else if (this.state.result == 'checking') {
      content = (
        <div>
          <FormattedMessage {...messages.txtChecking} />
        </div>
      )
    } else {
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
    }
    return (
      <ResultPopoverContent>
        {content}
      </ResultPopoverContent>
    )
  }
  renderHintButton(question: QuestionProps) {
    const { formatMessage } = this.props.intl
    if (this.state.showExplanation == false) {
      let disableSubmit = false
      if (this.state.result == 'correct') {
        disableSubmit = true
      }
      if (this.state.result == 'wrong') {
        disableSubmit = true
      }
      return (
        <div>
          <Popover
            isOpen={this.state.showResultPopover}
            onInteraction={this.onInteraction}
            content={this.renderResultPopover()}
            position={Position.TOP}
          >
            <ActionButton
              id="submit-question"
              text={formatMessage(messages.submitAnswerButton)}
              intent={Intent.PRIMARY}
              onClick={this.handleSubmitClick(question)}
              disabled={disableSubmit}
            />
          </Popover>
          <ActionButton
            text={formatMessage(
              this.state.showHint
                ? messages.hideHintButton
                : messages.hintButton
            )}
            iconName="help"
            onClick={this.toggleShowHint}
          />
          <HintWrapper>
            <Collapse isOpen={this.state.showHint}>
              <CardQuestionHint
                shouldFetch={this.state.showHint}
                questionId={question.id}
              />
            </Collapse>
          </HintWrapper>
        </div>
      )
    } else {
      return (
        <div>
          <ActionButton
            text={formatMessage(messages.btnNext)}
            intent={Intent.PRIMARY}
            onClick={this.handleResultButton}
          />
        </div>
      )
    }
  }
  renderActionBlock(question: QuestionProps) {
    const { formatMessage } = this.props.intl
    return (
      <div>
        {this.renderHintButton(question)}
      </div>
    )
  }

  getCards = () => {
    const rawData = this.props.cards ? this.props.cards : []
    let cardsList: any = []
    let cardsIds: any = []
    let cardsById: any = {}

    for (let item of rawData) {
      cardsList.push(item.node)
      cardsIds.push(item.node.id)
      cardsById[item.node.id] = item.node
    }
    return { cardsIds, cardsById, cardsList }
  }

  getNextCardId = () => {
    const { activeCardId } = this.state
    const { cardsIds } = this.getCards()
    const currIndex = cardsIds.indexOf(activeCardId)
    return cardsIds[currIndex + 1]
  }

  handleCardChange = (nextId: string) => {
    this.goToNextCard(nextId)
  }

  toggleCardView = () => {
    this.setState({ cardView: !this.state.cardView }, () => {
      this.updateCardUrl()
    })
  }

  handleGoBack = () => {
    this._sendEvent(this.state.activeCardId, 'bck_cw')
    let classPath = ''
    if (this.props.match.params.classId) {
      classPath = `/classes/${this.props.match.params.classId}`
    }

    this.props.history.push(
      `${classPath}/courses/${this.props.match.params.courseId}/`
    )
  }

  render() {
    const { formatMessage } = this.props.intl
    const { cardView, activeCardId, showExplanation, explanation } = this.state
    const { cardsById, cardsList } = this.getCards()
    let filteredCards = [...cardsList]
    if (cardView) {
      filteredCards = [cardsById[activeCardId]]
    }

    const userAnswer = this.state.userAnswerById[this.state.activeCardId]

    let explanationData: any = {}
    if (showExplanation) {
      explanationData.defaultShowExplan = true
      explanationData.explanContent = explanation
    } else {
      explanationData.defaultShowExplan = false
    }

    return (
      <StickyContainer>
        <Helmet
          title={
            cardView
              ? formatMessage(messages.pageTitleSingleCard, {
                  course: this.props.course.title,
                  card: cardsById[activeCardId].title
                })
              : formatMessage(messages.pageTitle, {
                  course: this.props.course.title
                })
          }
        />
        <Sticky topOffset={-50}>
          {({ style, isSticky }: { style: any; isSticky: boolean }) => {
            let wrapperStyle: any = {}
            if (isSticky && style) {
              style.marginTop = 50
              wrapperStyle.borderBottom = '1px solid #ccc'
            }
            return (
              <FixedSectionNavigate style={style}>
                <Wrapper style={wrapperStyle}>
                  <Header
                    cards={cardsList}
                    activeCardId={activeCardId}
                    cardView={cardView}
                    onCardChange={this.handleCardChange}
                    toggleCardView={this.toggleCardView}
                    onGoBack={this.handleGoBack}
                  />
                </Wrapper>
              </FixedSectionNavigate>
            )
          }}
        </Sticky>

        <Wrapper>
          {filteredCards.map((card: any, idx: number) => {
            return (
              <Card key={card.id}>
                <SectionCard
                  card={card}
                  // TODO Maybe we can start intercom chats with the same highlight dialog?
                  // selection={true}
                  // onTextSelect={this.handleTextSelect(idx)}
                  // onTextDeselect={this.handleTextDeSelect(idx)}
                  // showPopover={this.state.showSelectionPopover[idx]}
                  // popoverContent={
                  //   <Button
                  //     text={formatMessage(messages.btnStartDiscussion)}
                  //     intent={Intent.PRIMARY}
                  //     onClick={this.handleStartDiscussionClick(card)}
                  //   />
                  // }
                />
                {cardView &&
                  card.question &&
                  <div>
                    <hr />
                    <h4>
                      {formatMessage(messages.lbApplicationQuestion)}
                    </h4>
                    <ExamQuestionWrapper>
                      <ExamQuestion
                        transparentStyle={true}
                        question={card.question}
                        userAnswer={userAnswer}
                        onAnswerChange={this.handleAnswerChange}
                        {...explanationData}
                        splitHeight={'500px'}
                        splitFlexible={true}
                      />
                    </ExamQuestionWrapper>
                    {this.renderActionBlock(card.question)}
                  </div>}
              </Card>
            )
          })}
          {/* TODO Maybe we can start intercom chats with the same highlight dialog */}
          {/*<StartDiscussionDialog*/}
          {/*isOpen={this.state.startDiscussionOpen}*/}
          {/*onClose={this.toggleStartDiscussionDialog}*/}
          {/*highlightedText={this.state.selectedText}*/}
          {/*onSubmit={this.handleSubmitDiscussion}*/}
          {/*defaultTags={this.state.cardTags}*/}
          {/*/>*/}
        </Wrapper>
      </StickyContainer>
    )
  }
}

export default withRouter<IProps>(injectIntl(SectionDump))
