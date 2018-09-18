import { Button, Collapse, Intent, Popover, Position } from '@blueprintjs/core'
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
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
const { fetchQuery, graphql } = require('react-relay/compat')
import environment from 'relayEnvironment'
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
  ExamQuestionWrapper,
  InnerWrapper,
  ActionButtonRow,
  ActionButtonGroup,
  AnswerButtonPopover,
  ImportantActionButton
} from './styledComponents'
import Helmet from 'react-helmet'
import { SplitPane } from '../Course/components/styledComponents'
import Sidebar from '../Course/components/common/Sidebar'
import { Route, Switch } from 'react-router-dom'
import { isMobile } from '../../common/utils/screen'

const getNextCardsListQuery = graphql`
  query SectionDumpNextCardsListQuery(
    $cardsResolverArgs: [QueryResolverArgs]!
  ) {
    cardPaging(first: 9999, resolverArgs: $cardsResolverArgs) {
      edges {
        cursor
        node {
          id
          index
          title
          headline
          tags
          content {
            id
            version
            content
          }
          question {
            id
            question_type
            question_text
            data {
              id
              tmpl_files
              environment_key
              use_advanced_features
              explanation
              src_files
              options {
                id
                seq
                text
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

interface IProps {
  units: any[]
  course: any
  initialUnit: any
  initialSection: any
  initialCards: any[]
}

interface IStates {
  cardView: boolean
  unit: any
  section: any
  cards: any[]
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
  state: IStates = {
    unit: this.props.initialUnit,
    section: this.props.initialSection,
    cardView: true,
    activeCardId:
      this.props.initialCards && this.props.initialCards[0]
        ? this.props.initialCards[0].node.id
        : '',
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
    reloadDiscussion: 0,
    nextQuestion: null,
    cards: this.props.initialCards
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
    if (this.getNextCardId()) {
      this.goToNextCard()
    } else {
      this.handleTheLastNext()
    }
  }

  fetchAndNavigateToSection = (
    nextUnit: any,
    nextSection: any,
    nextCard: any
  ) => {
    fetchQuery(environment, getNextCardsListQuery, {
      cardsResolverArgs: [
        { param: 'course_id', value: this.props.course.id },
        { param: 'unit_id', value: nextUnit.id },
        { param: 'section_id', value: nextSection.id }
      ]
    }).then((data: any) => {
      this.setState(
        {
          cards: data.cardPaging ? data.cardPaging.edges : [],
          unit: nextUnit,
          section: nextSection,
          activeCardId: nextCard.id,
          result: null,
          explanation: null,
          showResultPopover: false,
          showExplanation: false,
          showHint: false
        },
        () => {
          this.props.history.replace(
            `/courses/${toUrlId(
              this.props.course.title,
              this.props.course.id
            )}/units/${toUrlId(nextUnit.title, nextUnit.id)}/sections/${toUrlId(
              nextSection.title,
              nextSection.id
            )}/card/${toUrlId(nextCard.title, nextCard.id)}`
          )
        }
      )
    })
  }

  navigateCards = (reverse: boolean) => {
    let cards = this.getCards()
    let curCardIdx = cards.cardsIds.findIndex(
      id => id === this.state.activeCardId
    )
    if (reverse) {
      if (curCardIdx <= 0) {
        this._sendEvent(this.state.activeCardId, 'bck')
        let sectIdx = this.state.unit.sections_list.findIndex(
          (sect: any) => sect.id === this.state.section.id
        )
        if (sectIdx <= 0) {
          let unitIdx = this.props.units.findIndex(
            (u: any) => u.id === this.state.unit.id
          )
          if (unitIdx <= 0) {
            this.props.history.replace(
              `/courses/${toUrlId(
                this.props.course.title,
                this.props.course.id
              )}`
            )
          } else {
            let nextUnit = this.props.units[unitIdx - 1]
            let nextSect =
              nextUnit.sections_list[nextUnit.sections_list.length - 1]
            let nextCard = nextSect.cards_list[nextSect.cards_list.length - 1]
            this.fetchAndNavigateToSection(nextUnit, nextSect, nextCard)
          }
        } else {
          let nextSect = this.state.unit.sections_list[sectIdx - 1]
          let nextCard = nextSect.cards_list[nextSect.cards_list.length - 1]
          this.fetchAndNavigateToSection(this.state.unit, nextSect, nextCard)
        }
      } else {
        this.goToNextCard(cards.cardsIds[curCardIdx - 1])
      }
    } else {
      if (curCardIdx >= cards.cardsIds.length - 1) {
        this._sendEvent(this.state.activeCardId, 'fwd')
        let sectIdx = this.state.unit.sections_list.findIndex(
          (sect: any) => sect.id === this.state.section.id
        )
        if (sectIdx >= this.state.unit.sections_list.length - 1) {
          let unitIdx = this.props.units.findIndex(
            (u: any) => u.id === this.state.unit.id
          )
          if (unitIdx >= this.props.units.length - 1) {
            this.props.history.replace(
              `/courses/${toUrlId(
                this.props.course.title,
                this.props.course.id
              )}`
            )
          } else {
            let nextUnit = this.props.units[unitIdx + 1]
            let nextSect = nextUnit.sections_list[0]
            let nextCard = nextSect.cards_list[0]
            this.fetchAndNavigateToSection(nextUnit, nextSect, nextCard)
          }
        } else {
          let nextSect = this.state.unit.sections_list[sectIdx + 1]
          let nextCard = nextSect.cards_list[0]
          this.fetchAndNavigateToSection(this.state.unit, nextSect, nextCard)
        }
      } else {
        this.goToNextCard()
      }
    }
  }

  toggleShowHint = () => {
    if (!this.state.showHint) {
      this._sendEvent(this.state.activeCardId, 'hint')
    }
    this.setState({ showHint: !this.state.showHint })
  }

  private onInteraction = (state: boolean) => this.handleInteraction(state)

  private handleInteraction = (nextOpenState: boolean) => {
    let nextState = nextOpenState
    if (this.state.result == 'correct' || this.state.result == 'wrong') {
      nextState = true
    }
    this.setState({ showResultPopover: nextState })
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
          <ActionButtonRow>
            <ActionButtonGroup>
              <AnswerButtonPopover
                isOpen={this.state.showResultPopover}
                onInteraction={this.onInteraction}
                content={this.renderResultPopover()}
                position={Position.TOP}
              >
                <ImportantActionButton
                  id="submit-question"
                  text={formatMessage(messages.submitAnswerButton)}
                  intent={Intent.PRIMARY}
                  onClick={this.handleSubmitClick(question)}
                  disabled={disableSubmit}
                />
              </AnswerButtonPopover>
              <ImportantActionButton
                text={formatMessage(
                  this.state.showHint
                    ? messages.hideHintButton
                    : messages.hintButton
                )}
                iconName="help"
                onClick={this.toggleShowHint}
              />
            </ActionButtonGroup>
            <ActionButtonGroup>
              <ActionButton
                onClick={() => this.navigateCards(false)}
                style={{ float: 'right' }}
              >
                Next
              </ActionButton>
              <ActionButton
                onClick={() => this.navigateCards(true)}
                style={{ float: 'right' }}
              >
                Previous
              </ActionButton>
            </ActionButtonGroup>
          </ActionButtonRow>
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
          <ImportantActionButton
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
    const rawData = this.state.cards ? this.state.cards : []
    let cardsList: any[] = []
    let cardsIds: any[] = []
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

    this.props.history.push(`/courses/${this.props.match.params.courseId}/`)
  }

  handleBeyondBounds = (direction: number) => {
    if (direction > 0) {
      this.navigateCards(false)
    } else {
      this.navigateCards(true)
    }
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
      explanationData.defaultShowExplanation = true
      explanationData.explanationContent = explanation
    } else {
      explanationData.defaultShowExplanation = false
    }

    return (
      <Wrapper>
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
        {/*<SplitPane*/}
        {/*defaultSize={240}*/}
        {/*pane2Style={{ overflowY: 'overlay' as any }}*/}
        {/*>*/}
        {/*<Sidebar /> TODO implement sidebar*/}
        <InnerWrapper>
          <FixedSectionNavigate>
            <Header
              cards={cardsList}
              sectionTitle={this.state.section.title}
              activeCardId={activeCardId}
              cardView={cardView}
              onCardChange={this.handleCardChange}
              toggleCardView={this.toggleCardView}
              onGoBack={this.handleGoBack}
              onBeyondBounds={this.handleBeyondBounds}
            />
          </FixedSectionNavigate>

          <div>
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
          </div>
        </InnerWrapper>
        {/*</SplitPane>*/}
      </Wrapper>
    )
  }
}

export default withRouter<IProps>(injectIntl(SectionDump))
