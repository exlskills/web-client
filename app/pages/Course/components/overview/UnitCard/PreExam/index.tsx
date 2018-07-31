import * as React from 'react'
import { Button, Intent } from '@blueprintjs/core'
import CardRow from 'pages/Course/components/overview/UnitCard/CardRow'
import { TopScoreText } from './styledComponents'
import { RowRightWrapper } from '../styledComponents'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'

interface IProps {
  topScore?: number
  onTakeQuiz: () => void
  taken?: boolean
  isPractice: boolean
  unit_id: string
  suggested: boolean
}

class UnitActionButton extends React.Component<IProps & InjectedIntlProps, {}> {
  render() {
    const { intl, isPractice, suggested } = this.props
    const { formatMessage } = intl

    return (
      <Button
        id={`unit-${this.props.unit_id}`}
        iconName={isPractice ? 'social-media' : 'log-in'}
        text={
          isPractice
            ? formatMessage(messages.takePracticeQuiz)
            : formatMessage(messages.takePlacementQuiz)
        }
        className={'pt-large'}
        intent={suggested ? Intent.PRIMARY : Intent.NONE}
        onClick={this.props.onTakeQuiz}
      />
    )
  }
}

export default injectIntl(UnitActionButton)
