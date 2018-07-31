import ExamDialogContent from './ExamDialogContent'
import CardDialogContent from './CardDialogContent'
import ConfirmDialog from 'common/components/ConfirmDialog'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as React from 'react'
import {
  Wrapper,
  DialogContent,
  Header,
  SubHeaderText
} from './styledComponents'
import DialogSidebar from './DialogSidebar'
import * as SplitPane from 'react-split-pane'
import { ICellItem } from '../ProgressCells/index'
import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'
import messages from './messages'
import { Prompt } from 'react-router'
import UpdateQuizlvl from '../mutations/UpdateQuizMutation'
interface IProps {
  isOpen: boolean
}

interface IStates {
  showConfirmDialog: boolean
}
type MergedProps = IProps & IFreactalProps & InjectedIntlProps
class ExamDialog extends React.PureComponent<MergedProps, IStates> {
  state: IStates = {
    showConfirmDialog: false
  }
  updateQuizAction() {
    const { formatMessage } = this.props.intl
    document.getElementById('unit-' + this.props.state.examUnit.id).innerHTML =
      '<span>' + formatMessage(messages.takePracticeMessage) + '</span>'
    this.props.effects.setExamModalOpen(false)
    this.setState({ showConfirmDialog: false })
    UpdateQuizlvl(
      this.props.state.examUnit.id,
      this.props.state.course.id
    ).then((res: any) => {})
  }
  handleClose = () => {
    this.updateQuizAction()
  }

  handleCloseConfirm = () => {
    if (this.props.state.examQuestion) {
      this.setState({ showConfirmDialog: true })
    } else {
      this.props.effects.setExamModalOpen(false)
      this.updateQuizAction()
    }
  }

  handleCloseCancel = () => {
    this.setState({ showConfirmDialog: false })
  }
  componentDidMount() {
    //  alert("dasdas")
    //document.getElementsByClassName("pt-dialog-close-button pt-icon-small-cross")[0].innerHTML = "<span>Finsh Quiz</span>"
  }

  componentWillUnmount() {
    window.onbeforeunload = null
  }

  render() {
    console.log('exam modal render')
    const { isOpen } = this.props
    const {
      examType,
      examUnit,
      examSection,
      examCardOpen,
      examQuestion
    } = this.props.state
    const { formatMessage } = this.props.intl

    const title = examType == 'unit' ? examUnit.title : examSection.title
    const headline =
      examType == 'unit' ? examUnit.headline : examSection.headline
    // Prevent reload the page
    window.onbeforeunload = isOpen
      ? () => {
          return true
        }
      : null

    let promptMessage = {
      title: formatMessage(messages.txtConfirmLeaveQuizTitle),
      text: formatMessage(messages.txtConfirmLeaveQuizMessage),
      submit: formatMessage(messages.btnConfirmLeaveQuizYes),
      cancel: formatMessage(messages.btnConfirmLeaveQuizNo)
    }
    return (
      <Wrapper
        className={localStorage.getItem('theme')}
        isOpen={isOpen}
        title={
          <Header>
            {title}
            <SubHeaderText>
              {headline}
            </SubHeaderText>
          </Header>
        }
        onClose={this.handleCloseConfirm}
        canOutsideClickClose={true}
      >
        <DialogContent>
          <SplitPane
            size={300}
            primary="second"
            pane1Style={{
              overflowY: 'hidden',
              overflowX: 'hidden',
              height: '100%'
            }}
          >
            {examCardOpen ? <CardDialogContent /> : <ExamDialogContent />}
            <DialogSidebar />
          </SplitPane>
        </DialogContent>
        <ConfirmDialog
          onSubmit={this.handleClose}
          onCancel={this.handleCloseCancel}
          showDialog={this.state.showConfirmDialog}
          swapButtons={true}
          messageText={promptMessage}
        />
        <Prompt
          message={JSON.stringify(promptMessage)}
          when={!!this.props.state.examQuestion}
        />
      </Wrapper>
    )
  }
}
export default injectIntl(injectState(ExamDialog))
