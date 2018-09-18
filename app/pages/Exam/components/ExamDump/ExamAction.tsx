import * as React from 'react'
import { ActionWrapper, ActionButton } from './styledComponents'
import messages from '../../messages'
import { InjectedIntlProps, injectIntl } from 'react-intl'

interface IProps {
  currentQuestion: string
  listAnswered: any
  listMarkedForReview: [string]
  onNext: () => void
  onMarkForReview: (markForReviewQuestion: string) => void
  onSkip: () => void
}

class ExamAction extends React.PureComponent<IProps & InjectedIntlProps, {}> {
  constructor(props: any) {
    super(props)
  }
  handleMarkForReview = () => {
    this.props.onMarkForReview(this.props.currentQuestion)
  }

  // componentWillReceiveProps(nextProps: any) {
  //   console.log('im here',this.props.currentQuestion , nextProps.currentQuestion)
  //   if (this.props.currentQuestion !== nextProps.currentQuestion) {
  //     const answered = Object.keys(nextProps.listAnswered)
  //     this.disableSkip = (answered.indexOf(nextProps.currentQuestion) > -1)
  //   }
  // }

  render() {
    const { formatMessage } = this.props.intl
    const { listMarkedForReview } = this.props
    const props = this.props
    const answered = Object.keys(props.listAnswered)
    const questionAnswered = answered.indexOf(props.currentQuestion) > -1
    const textMarkForReview =
      listMarkedForReview.indexOf(props.currentQuestion) > -1
        ? formatMessage(messages.btnUnmarkForPreview)
        : formatMessage(messages.btnMarkForPreview)

    // if (this.updateSkip) {
    //   if (questionAnswered){
    //     skipDisplay = 'none'
    //   }
    // } else {
    //   if (!questionAnswered){
    //     skipDisplay = 'none'
    //   }
    // }

    return (
      <ActionWrapper>
        <ActionButton
          disabled={!questionAnswered}
          onClick={props.onNext}
          text={formatMessage(messages.btnNextQuestion)}
        />
        {/* TODO add 'mark for review' back in when the dot nav is ready to support multiple colors */}
        {/*<ActionButton*/}
        {/*onClick={this.handleMarkForReview}*/}
        {/*text={textMarkForReview}*/}
        {/*/>*/}
        <ActionButton
          disabled={questionAnswered}
          onClick={props.onSkip}
          text={formatMessage(messages.btnSkipQuestion)}
        />
      </ActionWrapper>
    )
  }
}

export default injectIntl(ExamAction)
