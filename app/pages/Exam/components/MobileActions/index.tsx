// import SidebarMenu from 'common/components/SideBarMenu'
import * as React from 'react'

import {
  SidebarImage,
  Wrapper,
  ActionButton,
  AnsweredCal,
  Timer,
  TextTitle,
  ActionButtonsRow
} from './styledComponents'
import { Icon, Intent } from '@blueprintjs/core'
import messages from '../../messages'
import { InjectedIntlProps, injectIntl } from 'react-intl'

interface IProps {
  answeredQuestions: any
  totalQuestions: any
  timeLimit: number
  onExamCancel: () => void
  onExamSubmit: () => void
}

interface IStates {
  timeElapsed: number
}
class MobileActions extends React.PureComponent<
  IProps & InjectedIntlProps,
  IStates
> {
  timerID: any
  constructor(props: any) {
    super(props)
    this.state = {
      timeElapsed: 0
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.updateTime()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  updateTime() {
    this.setState({ timeElapsed: this.state.timeElapsed + 1 })
  }

  render() {
    const { answeredQuestions, totalQuestions } = this.props
    const { formatMessage } = this.props.intl

    let timeLeft = new Date(null)
    let timeDiff = this.props.timeLimit * 60 - this.state.timeElapsed
    timeLeft.setSeconds(timeDiff > 0 ? timeDiff : 0)
    let timeLeftStr = timeLeft.toISOString().substr(11, 8)

    return (
      <Wrapper>
        <ActionButtonsRow>
          <ActionButton onClick={this.props.onExamCancel}>
            {formatMessage(messages.cancelExam)}
          </ActionButton>
          <ActionButton
            intent={Intent.PRIMARY}
            onClick={this.props.onExamSubmit}
          >
            <Icon iconName="pt-icon-saved" />
            {formatMessage(messages.submit)}
          </ActionButton>
        </ActionButtonsRow>
        <AnsweredCal>
          {formatMessage(messages.txtSidebarMissingQuestion, {
            answered: answeredQuestions.toString(),
            total: totalQuestions.toString()
          })}
        </AnsweredCal>
        {this.props.timeLimit > 0 &&
          <Timer>
            {timeLeftStr}
          </Timer>}
      </Wrapper>
    )
  }
}

export default injectIntl(MobileActions)
