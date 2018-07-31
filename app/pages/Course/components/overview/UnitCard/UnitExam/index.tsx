import * as React from 'react'
import { injectIntl } from 'react-intl'
import CardRow from 'pages/Course/components/overview/UnitCard/CardRow'
import { ExamButton } from './styledComponents'
import { RowRightWrapper } from 'pages/Course/components/overview/UnitCard/styledComponents'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'
import { indexToLetter } from '../../../../../../common/utils/ordered-list'
import { Intent } from '@blueprintjs/core'

interface IProps {
  index: number
  remainingAttempts: number
  is_continue_exam: boolean
  exam_attempt_id: string
  onStart: () => void
  isNextStep: boolean
  alreadyPassed: boolean
}

class UnitExamRow extends React.Component<IProps & InjectedIntlProps, {}> {
  render() {
    const { onStart, intl, index, isNextStep, alreadyPassed } = this.props
    const { formatMessage, formatNumber } = intl

    let { remainingAttempts } = this.props
    if (remainingAttempts < 0) {
      remainingAttempts = 0
    }

    return (
      <CardRow
        listKey={`${indexToLetter(index).toUpperCase()}.`}
        title={formatMessage(messages.lbUnitExam)}
        description={formatMessage(messages.lbUnitExamDescription)}
        isComplete={alreadyPassed}
        isNextStep={isNextStep}
        isCenter=""
        right={
          <RowRightWrapper>
            <div className={'pt-text-muted'} style={{ marginRight: '20px' }}>
              {formatMessage(messages.remainingAttempts, {
                attempts: formatNumber(remainingAttempts)
              })}
            </div>
            <ExamButton
              intent={isNextStep ? Intent.SUCCESS : Intent.NONE}
              onClick={onStart}
              iconName={'clipboard'}
              text={
                this.props.is_continue_exam == false
                  ? formatMessage(messages.takeExam)
                  : formatMessage(messages.continueExam)
              }
              disabled={remainingAttempts < 1}
            />
          </RowRightWrapper>
        }
      />
    )
  }
}

export default injectIntl(UnitExamRow)
