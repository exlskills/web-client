import * as React from 'react'
import {
  CardHeader,
  UnitTitle,
  ToggleIcon,
  CardContent,
  Wrapper,
  HeaderRight,
  CirCleIcon,
  toolTipText,
  Tooltip,
  UnitIndex,
  UnitCardProgressBar,
  UnitProgressTooltip,
  UnitPassedIcon,
  HeaderLeft
} from './styledComponents'
import UnitActionButton from './PreExam'
import SectionRow from './Section'
import UnitExam from './UnitExam'
import ProgressCells from 'pages/Course/components/overview/ProgressCells'
import { RouteComponentProps, withRouter } from 'react-router'
import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'
import TakeQuiz from '../mutations/TakeQuiz'
import wsclient from 'common/ws/client'
const { graphql } = require('react-relay/compat')
import messages from './messages'
import InjectedIntlProps = ReactIntl.InjectedIntlProps

import { WS_EVENTS } from 'common/ws/constants'
import { createFragmentContainer } from 'react-relay'
import { SchemaType, fromUrlId, toUrlId } from 'common/utils/urlid'
import $ from 'jquery'
import { Icon, Intent } from '@blueprintjs/core'
import { injectIntl } from 'react-intl'
interface IProps {
  defaultOpen?: boolean
  unit: {
    id: string
    index: number
    title: string
    attempts_left: number
    unit_processing: number
    ema: number
    quiz_lvl: number
    examIsNextStep: boolean
    suggestedUnit: boolean
    sections_list: {
      id: string
      index: number
      title: string
      ema: number
      current: boolean
      proficient: boolean
      headline: string
      cards_list: any
    }[]
    is_continue_exam: boolean
    exam_attempt_id: string
    completed?: boolean // true if section final exam has been completed
  }
}

interface IState {
  open: boolean
  isCenter: string
}

class UnitCard extends React.Component<
  IProps & IFreactalProps & RouteComponentProps<any> & InjectedIntlProps,
  IState
> {
  static defaultProps = {
    defaultOpen: false,
    completed: false
  }

  state = {
    open: this.props.defaultOpen,
    isCenter: ''
  }
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  sectionElemsById: {
    [id: string]: any
  } = {}

  assignSectionElem = (section: any) => (elem: any) => {
    this.sectionElemsById[section.id] = elem
  }

  toggleOpen = () => {
    if (!this.state.open) {
      const courseId = fromUrlId(
        SchemaType.Course,
        this.props.match.params.courseId
      )

      wsclient.sendEvent(WS_EVENTS.courseUserItem, {
        cour_id: courseId,
        user_id: this.context.viewer.user_id,
        unit_id: this.props.unit.id
      })
    }

    this.setState({
      open: !this.state.open
    })
  }

  handleUnitExamStart = () => {
    const { course } = this.props.state
    const { unit } = this.props
    const courseUrlId = toUrlId(course.title, course.id)
    const unitUrlId = toUrlId(unit.title, unit.id)
    if (this.props.unit.is_continue_exam == true) {
      this.props.history.push(
        `/pre-exams/${courseUrlId}/${unitUrlId}/exam/${this.props.unit
          .exam_attempt_id}`
      )
    } else {
      this.props.history.push(`/pre-exams/${courseUrlId}/${unitUrlId}`)
    }
  }

  handleCellClick = (id: string) => {
    console.log(id)
  }

  handleTakeQuiz = () => {
    this.props.effects.setExamType('unit')
    this.props.effects.setExamUnit(this.props.unit)
    TakeQuiz(
      this.props.state.course.id,
      this.props.unit.id
    ).then((res: any) => {
      if (!res || !res.takeQuiz) {
        // TODO
      } else {
        this.props.effects.setExamQuizId(res.takeQuiz.quiz_id)
        this.props.effects.setExamModalOpen(true)
      }
    })
  }

  handleSectionClick = (section: any) => () => {
    const { course } = this.props.state
    const courseUrlId = toUrlId(course.title, course.id)
    const unitId = this.props.unit.id
    const { unit } = this.props
    const unitUrlId = toUrlId(unit.title, unit.id)
    const sectionUrlId = toUrlId(section.title, section.id)
    let classPath = ''
    if (this.props.match.params.classId) {
      classPath = `/classes/${this.props.match.params.classId}`
    }
    this.props.history.push(
      `${classPath}/courses/${courseUrlId}/units/${unitUrlId}/sections/${sectionUrlId}`
    )
  }

  overText = (id: string) => () => {
    if (document.getElementById(id))
      document.getElementById(id).setAttribute('style', 'display:inline-block')
  }
  leaveText = (id: string) => () => {
    if (document.getElementById(id))
      document.getElementById(id).setAttribute('style', 'display:none')
  }
  openGrade = (processing: any) => () => {
    if (processing >= 0) {
      const { course } = this.props.state
      const { unit } = this.props
      const courseUrlId = toUrlId(course.title, course.id)
      top.location.href = `/courses/${courseUrlId}/grades#title-${unit.title}`
    }
  }
  round = (value: any, precision: any) => {
    var multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
  }
  render() {
    const { open } = this.state
    const {
      id,
      title,
      completed,
      index,
      sections_list,
      attempts_left,
      unit_processing,
      ema,
      quiz_lvl,
      is_continue_exam,
      exam_attempt_id,
      examIsNextStep,
      suggestedUnit
    } = this.props.unit
    const { formatMessage } = this.props.intl
    const { course } = this.props.state
    let showEma: any = this.round(ema, 2)
    showEma += '%'
    if (unit_processing == -1) {
      showEma = this.props.intl.formatMessage(messages.noGrades)
    }
    let styleFortooltip: any = {
      display: 'none'
    }

    return (
      <Wrapper index={index}>
        <CardHeader border={open}>
          <HeaderLeft onClick={this.toggleOpen}>
            <UnitIndex>
              {`${index + 1}. `}
            </UnitIndex>
            <UnitTitle>
              {title}
            </UnitTitle>
            <UnitProgressTooltip
              key={index}
              content={showEma}
              isActive={index == index}
            >
              <UnitCardProgressBar
                intent={Intent.SUCCESS}
                className={'pt-no-stripes'}
                value={ema / 100}
              />
            </UnitProgressTooltip>
            <span style={{ marginLeft: '10px' }} className={'pt-text-muted'}>
              {unit_processing == -1
                ? this.props.intl.formatMessage(messages.notStarted)
                : `${this.round(ema, 0)}%`}
            </span>
            {unit_processing == 1 && <UnitPassedIcon iconName={'endorsed'} />}
          </HeaderLeft>
          <HeaderRight>
            <UnitActionButton
              onTakeQuiz={this.handleTakeQuiz}
              isPractice={unit_processing != -1}
              unit_id={id}
              suggested={suggestedUnit}
            />
            <ToggleIcon open={open} onClick={this.toggleOpen} />
          </HeaderRight>
        </CardHeader>
        <CardContent isOpen={open}>
          {sections_list.map((s, idx) =>
            <SectionRow
              index={idx}
              ref={this.assignSectionElem(s)}
              key={s.id}
              onClick={this.handleSectionClick(s)}
              unit={this.props.unit}
              isCenter={this.state.isCenter}
              section={s}
              courseUrlId={toUrlId(course.title, course.id)}
              inProgressMsg={formatMessage(messages.inProgress)}
              viewMsg={formatMessage(messages.viewLessonDropdown)}
              practiceMsg={formatMessage(messages.practiceLessonDropdown)}
              practiceLessonMsg={formatMessage(messages.practiceSection)}
            />
          )}
          <UnitExam
            index={sections_list.length}
            remainingAttempts={attempts_left}
            onStart={this.handleUnitExamStart}
            is_continue_exam={is_continue_exam}
            exam_attempt_id={exam_attempt_id}
            isNextStep={examIsNextStep}
            alreadyPassed={unit_processing == 1}
          />
        </CardContent>
      </Wrapper>
    )
  }
}

export default withRouter(injectIntl(injectState<any>(UnitCard)))
