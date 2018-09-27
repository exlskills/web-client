import * as React from 'react'
import {
  Wrapper,
  //  ChartWrapper,
  //  ActionWrapper,
  //  BodyWrapper,
  //  CourseImg,
  //  TopWrapper,
  //  CourseTitle,
  //  CourseDetailsWrapper,
  //  CourseDescription,
  //  ActionSeparator,
  UpNextOverlay,
  UpNextOverlaySub,
  UpNextMuted,
  UpNextTitle,
  UpNextHeadline,
  UpNextPrimaryButton,
  UpNextSecondaryButton
} from './styledComponents'
import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'
// import StatusCard from '../StatusCard'
import { toUrlId } from '../../../../../common/utils/urlid'
import { RouteComponentProps, withRouter } from 'react-router'
import { Icon } from '@blueprintjs/core'
import TakeQuiz from '../mutations/TakeQuiz'
import { indexToLetter } from '../../../../../common/utils/ordered-list'

interface IProps {}

class UpNext extends React.Component<
  IProps & IFreactalProps & InjectedIntlProps & RouteComponentProps<any>,
  {}
> {
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  handleCertificateClick = () => {
    const urlId = toUrlId(
      this.props.state.course.title,
      this.props.state.course.id
    )
    this.props.history.push(`/courses/${urlId}/certificate`)
  }

  handleUnitExamStart = (unit: any) => () => {
    const { course } = this.props.state
    const courseUrlId = toUrlId(course.title, course.id)
    const unitUrlId = toUrlId(unit.title, unit.id)
    if (unit.is_continue_exam == true) {
      this.props.history.push(
        `/pre-exams/${courseUrlId}/${unitUrlId}/exam/${unit.exam_attempt_id}`
      )
    } else {
      this.props.history.push(`/pre-exams/${courseUrlId}/${unitUrlId}`)
    }
  }

  handleTakeUnitQuiz = (unit: any) => () => {
    this.props.effects.setExamType('unit')
    this.props.effects.setExamUnit(unit)
    TakeQuiz(this.props.state.course.id, unit.id).then((res: any) => {
      if (!res || !res.takeQuiz) {
        // TODO
      } else {
        this.props.effects.setExamQuizId(res.takeQuiz.quiz_id)
        this.props.effects.setExamModalOpen(true)
      }
    })
  }

  handleTakeSectionQuiz = (unit: any, section: any) => () => {
    this.props.effects.setExamType('section')
    this.props.effects.setExamUnit(unit)
    this.props.effects.setExamSection(section)
    TakeQuiz(
      this.props.state.course.id,
      unit.id,
      section.id
    ).then((res: any) => {
      if (!res || !res.takeQuiz) {
        alert('SectionCard does not have any exams!')
      } else {
        this.props.effects.setExamQuizId(res.takeQuiz.quiz_id)
        this.props.effects.setExamModalOpen(true)
      }
    })
  }

  handleCardClick = (unit: any, section: any, card: any) => () => {
    const { course } = this.props.state
    const courseUrlId = toUrlId(course.title, course.id)
    const unitUrlId = toUrlId(unit.title, unit.id)
    const sectionUrlId = toUrlId(section.title, section.id)
    const cardUrlId = toUrlId(card.hoverText, card.id)
    this.props.history.push(
      `/courses/${courseUrlId}/units/${unitUrlId}/sections/${sectionUrlId}/card/${cardUrlId}`
    )
  }

  handleSectionClick = (unit: any, section: any) => () => {
    const { course } = this.props.state
    const courseUrlId = toUrlId(course.title, course.id)
    const unitUrlId = toUrlId(unit.title, unit.id)
    const sectionUrlId = toUrlId(section.title, section.id)
    this.props.history.push(
      `/courses/${courseUrlId}/units/${unitUrlId}/sections/${sectionUrlId}`
    )
  }

  renderCompleted() {
    const { course } = this.props.state
    const userFirstName = this.context.viewer.first_name
    const { formatMessage } = this.props.intl

    return (
      <UpNextOverlay>
        <Icon
          style={{
            color: 'rgb(123, 203, 57)',
            marginTop: '-140px',
            fontSize: '92px',
            marginBottom: '20px'
          }}
          iconName={'star'}
        />
        <div style={{ marginBottom: '15px' }}>
          {formatMessage(messages.lbUpNextCongratulations, {
            name: userFirstName
          })}
        </div>
        <UpNextOverlaySub>
          {formatMessage(messages.lbUpNextYouHavePassed, {
            course: course.title
          })}
          <br />
          <a onClick={this.handleCertificateClick}>
            {formatMessage(messages.lbUpNextReadyToGetCertificate)}
          </a>
        </UpNextOverlaySub>
      </UpNextOverlay>
    )
  }

  renderExam(n: number, unit: any, firstSection: any) {
    const { formatMessage } = this.props.intl
    return (
      <Wrapper>
        <UpNextMuted onClick={this.handleSectionClick(unit, firstSection)}>
          {formatMessage(messages.unitHeading)} {n}
        </UpNextMuted>
        <UpNextTitle onClick={this.handleSectionClick(unit, firstSection)}>
          {unit.title}
        </UpNextTitle>
        <UpNextHeadline onClick={this.handleSectionClick(unit, firstSection)}>
          {unit.headline}
        </UpNextHeadline>
        <UpNextPrimaryButton
          onClick={this.handleUnitExamStart(unit)}
          iconName={'clipboard'}
        >
          {formatMessage(messages.takeExam)}
        </UpNextPrimaryButton>
        <UpNextSecondaryButton
          onClick={this.handleTakeUnitQuiz(unit)}
          iconName={'social-media'}
        >
          {formatMessage(messages.practice)}
        </UpNextSecondaryButton>
      </Wrapper>
    )
  }

  renderPreExam(n: number, unit: any, firstSection: any) {
    const { formatMessage } = this.props.intl
    return (
      <Wrapper>
        <UpNextMuted onClick={this.handleSectionClick(unit, firstSection)}>
          {formatMessage(messages.unitHeading)} {n}
        </UpNextMuted>
        <UpNextTitle onClick={this.handleSectionClick(unit, firstSection)}>
          {unit.title}
        </UpNextTitle>
        <UpNextHeadline onClick={this.handleSectionClick(unit, firstSection)}>
          {unit.headline}
        </UpNextHeadline>
        <UpNextPrimaryButton
          onClick={this.handleTakeUnitQuiz(unit)}
          iconName={'log-in'}
        >
          {formatMessage(messages.preQuiz)}
        </UpNextPrimaryButton>
        <UpNextSecondaryButton
          onClick={this.handleSectionClick(unit, firstSection)}
          iconName={'double-chevron-right'}
        >
          {formatMessage(messages.jumpIn)}
        </UpNextSecondaryButton>
      </Wrapper>
    )
  }

  renderLearn(
    unitN: number,
    sectionN: number,
    unit: any,
    section: any,
    card: any
  ) {
    const { formatMessage } = this.props.intl
    return (
      <Wrapper>
        <UpNextMuted onClick={this.handleCardClick(unit, section, card)}>
          {formatMessage(messages.unitHeading)} {unitN},{' '}
          {formatMessage(messages.lessonHeading)} {indexToLetter(sectionN - 1)}
        </UpNextMuted>
        <UpNextTitle onClick={this.handleCardClick(unit, section, card)}>
          {section.title}
        </UpNextTitle>
        <UpNextHeadline onClick={this.handleCardClick(unit, section, card)}>
          {section.headline}
        </UpNextHeadline>
        <UpNextPrimaryButton
          onClick={this.handleCardClick(unit, section, card)}
          iconName={'log-in'}
        >
          {formatMessage(messages.continueLearning)}
        </UpNextPrimaryButton>
        <UpNextSecondaryButton
          onClick={this.handleTakeSectionQuiz(unit, section)}
          iconName={'social-media'}
        >
          {formatMessage(messages.practice)}
        </UpNextSecondaryButton>
      </Wrapper>
    )
  }

  render() {
    const { examAllUnits } = this.props.state
    const units = examAllUnits.unitsById

    if (examAllUnits.courseComplete) {
      return this.renderCompleted()
    }

    for (let i = 0; i < examAllUnits.unitIds.length; i++) {
      const curUnitId = examAllUnits.unitIds[i]
      if (units[curUnitId].examIsNextStep) {
        return this.renderExam(
          i + 1,
          units[curUnitId],
          units[curUnitId].sections_list[0]
        )
      }
      if (
        units[curUnitId].suggestedUnit ||
        i == examAllUnits.unitIds.length - 1
      ) {
        if (units[curUnitId].unit_progress_state == -1) {
          return this.renderPreExam(
            i + 1,
            units[curUnitId],
            units[curUnitId].sections_list[0]
          )
        }
        for (let s = 0; s < units[curUnitId].sections_list.length; s++) {
          let section = units[curUnitId].sections_list[s]
          if (
            section.ema < 80 ||
            s == units[curUnitId].sections_list.length - 1
          ) {
            for (let c = 0; c < section.cards_list.length; c++) {
              let card = section.cards_list[c]
              if (card.ema < 80 || c == section.cards_list.length - 1) {
                return this.renderLearn(
                  i + 1,
                  s + 1,
                  units[curUnitId],
                  section,
                  card
                )
              }
            }
          }
        }
      }
    }

    return <Wrapper />
  }
}

export default injectIntl(withRouter(injectState(UpNext)))
