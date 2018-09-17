import * as React from 'react'
import CardRow from 'pages/Course/components/overview/UnitCard/CardRow'
import {
  //  PracticeIcon,
  PracticeLink,
  SectionCheckedIcon,
  SectionProgPct,
  SectionProgText,
  Wrapper
} from './styledComponents'
import ProgressCells, {
  ICellItem
} from 'pages/Course/components/overview/ProgressCells/index'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'
import TakeQuiz from '../../mutations/TakeQuiz'
import {
  //  SchemaType,
  //  fromUrlId,
  toUrlId
} from 'common/utils/urlid'
import { indexToLetter } from 'common/utils/ordered-list'
import {
  Button,
  Intent,
  Menu,
  MenuItem,
  Popover,
  Position
} from '@blueprintjs/core'

interface IProps {
  onClick: () => void
  inProgressMsg: string
  practiceLessonMsg: string
  practiceMsg: string
  viewMsg: string
  unit: any
  index: number
  sectionUrl: string
  section: {
    id: string
    title: string
    headline: string
    ema: number
    current: boolean
    proficient: boolean
    cards_list: ICellItem[]
  }
  courseUrlId: string
  isCenter: string
}

class SectionRow extends React.Component<
  IProps & IFreactalProps & RouteComponentProps<any>,
  {}
> {
  handlePracticeClick = () => {
    this.props.effects.setExamType('section')
    this.props.effects.setExamUnit(this.props.unit)
    this.props.effects.setExamSection(this.props.section)
    TakeQuiz(
      this.props.state.course.id,
      this.props.unit.id,
      this.props.section.id
    ).then((res: any) => {
      if (!res || !res.takeQuiz) {
        alert('SectionCard does not have any exams!')
      } else {
        this.props.effects.setExamQuizId(res.takeQuiz.quiz_id)
        this.props.effects.setExamModalOpen(true)
      }
    })
  }
  getCellUrl = (id: string, title: string) => {
    const unitUrlId = toUrlId(this.props.unit.title, this.props.unit.id)
    const sectionUrlId = toUrlId(
      this.props.section.title,
      this.props.section.id
    )
    return `/courses/${this.props
      .courseUrlId}/units/${unitUrlId}/sections/${sectionUrlId}/card/${toUrlId(
      title,
      id
    )}`
  }
  render() {
    const {
      unit,
      section,
      onClick,
      sectionUrl,
      isCenter,
      index,
      inProgressMsg,
      practiceLessonMsg,
      practiceMsg,
      viewMsg
    } = this.props
    const sections_list = unit.sections_list
    const sectionData = sections_list.find((item: any) => item.id == section.id)
    let cards_list = []
    if (sectionData) {
      cards_list = sectionData.cards_list
    }

    return (
      <CardRow
        listKey={`${indexToLetter(index).toUpperCase()}.`}
        title={section.title}
        description={section.headline}
        isCenter={isCenter}
        isNextStep={section.current}
        isComplete={section.proficient}
        onClickUrl={sectionUrl}
        titleAccompany={
          <span>
            {section.ema > 80
              ? <SectionCheckedIcon icon={'tick'} />
              : section.ema > 0
                ? <span style={{ fontSize: '12px' }}>
                    <SectionProgPct>
                      {Math.round(section.ema)}%
                    </SectionProgPct>
                    <SectionProgText>
                      {inProgressMsg}
                    </SectionProgText>
                  </span>
                : <span />}
          </span>
        }
        bar={<ProgressCells getCellUrl={this.getCellUrl} items={cards_list} />}
        right={
          <Wrapper>
            <PracticeLink onClick={this.handlePracticeClick}>
              {practiceLessonMsg}
            </PracticeLink>
            <Popover
              content={
                <Menu>
                  <MenuItem icon={'book'} text={viewMsg} onClick={onClick} />
                  <MenuItem
                    icon={'social-media'}
                    text={practiceMsg}
                    onClick={this.handlePracticeClick}
                  />
                </Menu>
              }
              position={Position.LEFT}
            >
              <Button
                style={{ marginLeft: '12px' }}
                intent={Intent.NONE}
                icon={'more'}
              />
            </Popover>
          </Wrapper>
        }
      />
    )
  }
}

export default withRouter(injectState(SectionRow))
