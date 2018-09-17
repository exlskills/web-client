import ExamDialogContent from './ExamDialogContent'
import CardDialogContent from './CardDialogContent'
import { ConfirmDialog } from 'common/components/loaders'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as React from 'react'
import {
  Wrapper,
  DialogContent,
  Header,
  SubHeaderText
} from './styledComponents'
import DialogSidebar from './DialogSidebar'
import SplitPane from 'react-split-pane'
import { injectState } from 'freactal'
import { IFreactalProps } from 'pages/Course'
import messages from './messages'
import { Prompt } from 'react-router'
import UpdateQuizlvl from '../mutations/UpdateQuizMutation'
import { processCourseData } from '../../../utils/course_data_processor'
const { fetchQuery, graphql } = require('react-relay/compat')
import environment from 'relayEnvironment'

const refreshUnitQuery = graphql`
  query ExamDialogRefreshUnitQuery(
    $first: Int!,
    $resolverArgs: [QueryResolverArgs]!
  ) {
    unitPaging(first: $first, resolverArgs: $resolverArgs) {
      edges {
        node {
          id
          unit_progress_state
          grade
          ema
          sections_list {
            id
            ema
            title
            headline
            hoverText: title
            cards_list {
              id
              ema
              hoverText: title
            }
          }
        }
      }
    }
  }
`

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

  updateQuizAction = () => {
    const { formatMessage } = this.props.intl
    document.getElementById(
      `unit-${this.props.state.examUnit.id}`
    ).innerHTML = `<span>${formatMessage(messages.takePracticeMessage)}</span>`
    this.props.effects.setExamModalOpen(false)
    this.setState({ showConfirmDialog: false })
    UpdateQuizlvl(
      this.props.state.examUnit.id,
      this.props.state.course.id
    ).then((res: any) => {})
  }

  reloadUnit = () => {
    fetchQuery(environment, refreshUnitQuery, {
      first: 1,
      resolverArgs: [
        {
          param: 'course_id',
          value: this.props.state.course.id
        },
        {
          param: 'unit_id',
          value: this.props.state.examUnit.id
        }
      ]
    }).then((data: any) => {
      if (!data.unitPaging.edges || data.unitPaging.edges.length != 1) {
        console.error('Missing/invalid edges for course progress reload')
      }
      const newData = data.unitPaging.edges[0].node
      let allUnits = { ...this.props.state.examAllUnits }
      let unit = allUnits.unitsById[newData.id]
      unit.ema = newData.ema
      unit.grade = newData.grade
      unit.unit_progress_state = newData.unit_progress_state
      unit.sections_list = newData.sections_list
      this.props.effects.setExamAllUnits(processCourseData(allUnits))
    })
  }

  handleClose = () => {
    this.updateQuizAction()
    this.reloadUnit()
  }

  handleCloseConfirm = () => {
    if (this.props.state.examQuestion) {
      this.setState({ showConfirmDialog: true })
    } else {
      this.props.effects.setExamModalOpen(false)
      this.handleClose()
    }
  }

  handleCloseCancel = () => {
    this.setState({ showConfirmDialog: false })
  }

  componentWillUnmount() {
    window.onbeforeunload = null
  }

  render() {
    const { isOpen } = this.props
    const { examType, examUnit, examSection, examCardOpen } = this.props.state
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
        <DialogContent isOpen={isOpen}>
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
export default injectState(injectIntl(ExamDialog))
