import { RendererProps } from 'common/utils/relay'
import Loading from 'common/components/Loading'
import * as React from 'react'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { RouteComponentProps, Prompt, withRouter } from 'react-router'
import { SchemaType, fromUrlId, toUrlId } from 'common/utils/urlid'
const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import messages from './messages'
import requireAuthentication from 'routes/requireAuthentication'
import {
  Wrapper,
  TakeButton,
  CenterSection,
  SectionButton,
  CancelButton,
  SectionContent
} from './styledComponents'
const rootQuery = graphql`
  query PreExamQuery($unit_id: String, $course_id: String) {
    oneExam(unit_id: $unit_id, course_id: $course_id) {
      id
      est_time
      time_limit
      question_count
    }
    specificExamAttempt(unit_id: $unit_id) {
      is_active
    }
  }
`

interface IProps {
  completed?: boolean
}

interface IStates {}

@requireAuthentication(1)
class ExamPage extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  getCourseId() {
    return fromUrlId(SchemaType.Course, this.props.match.params.courseId)
  }

  getUnitId() {
    return fromUrlId(SchemaType.CourseUnit, this.props.match.params.unitId)
  }
  handleClick = () => {
    const courseUrlId = this.props.match.params.courseId
    const unitUrlId = this.props.match.params.unitId
    if (this.props.match.params.examId) {
      this.props.history.replace(
        `/exams/${courseUrlId}/${unitUrlId}/exam/${this.props.match.params
          .examId}`
      )
    } else {
      this.props.history.replace(`/exams/${courseUrlId}/${unitUrlId}`)
    }
    //top.location.href = `/exams/${courseUrlId}/${unitUrlId}`
  }
  handleCancel = () => {
    this.props.history.goBack()
  }
  queryRender = ({ error, props }: { error: Error; props: any }) => {
    if (error) {
      return (
        <div>
          {error.message}
        </div>
      )
    }

    if (!props) {
      return <Loading />
    }

    const { formatMessage } = this.props.intl
    const { completed } = this.props

    const questions = props.questions ? props.questions.edges : []
    let questionsList: any = []
    let questionsById: any = {}

    for (let item of questions) {
      questionsList.push(item.node.id)
      questionsById[item.node.id] = item.node
    }
    let dataExam = props.oneExam
    const limit_time = dataExam.time_limit ? dataExam.time_limit : 0
    const est_time = dataExam.est_time ? dataExam.est_time : 0
    const question_count = dataExam.question_count
    let is_active_exam = false
    let dataExamAttempt = props.specificExamAttempt
    if (dataExamAttempt.length > 0) {
      is_active_exam = dataExamAttempt[0].is_active
    }
    return (
      <Wrapper style={{ paddingTop: '100px' }}>
        <CenterSection>
          <h5 style={{ marginLeft: '15px', color: '#1B232F' }}>
            {formatMessage(messages.preExamTitle)}
          </h5>
          {is_active_exam == false
            ? <SectionContent>
                <p style={{ color: '#1B232F' }}>
                  {formatMessage(messages.numQuestion)} : {question_count}
                </p>
                <p style={{ color: '#1B232F' }}>
                  {formatMessage(messages.timeEst)} : {est_time}{' '}
                  {formatMessage(messages.minText)}
                </p>
                <p style={{ color: '#1B232F' }}>
                  {formatMessage(messages.timeLimit)} : {limit_time}{' '}
                  {formatMessage(messages.minText)}
                </p>
              </SectionContent>
            : <SectionContent style={{ width: '100%', marginLeft: '10px' }}>
                <p>
                  {formatMessage(messages.warningActive)}
                </p>
              </SectionContent>}
          {is_active_exam == false
            ? <SectionButton>
                <TakeButton onClick={this.handleClick} text="Take Exam" />
                <CancelButton onClick={this.handleCancel} text="Cancel" />
              </SectionButton>
            : <SectionButton style={{ width: '100%' }}>
                <CancelButton onClick={this.handleCancel} text="Cancel" />
              </SectionButton>}
        </CenterSection>
      </Wrapper>
    )
  }

  render() {
    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          unit_id: this.getUnitId(),
          course_id: this.getCourseId()
        }}
        environment={environment} // RelayEnvironments
        render={this.queryRender}
      />
    )
  }
}

export default withRouter(injectIntl(ExamPage))
