import { RendererProps } from 'common/utils/relay'
import Loading from 'common/components/Loading'
import * as React from 'react'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { RouteComponentProps, Prompt, withRouter } from 'react-router'
import { SchemaType, fromUrlId, toUrlId } from 'common/utils/urlid'
import requireAuthentication from 'routes/requireAuthentication'

import TakeExamMutation from './mutations/TakeExamMutation'
import ExamDump from './components/ExamDump'
import messages from './messages'
import { Wrapper } from './styledComponents'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { DEFAULT_PAGE_SIZE } from '../../common/constants'

const rootQuery = graphql`
  query ExamQuery(
    $first: Int!,
    $after: String,
    $resolverArgs: [QueryResolverArgs]!,
    $course_id: String,
    $unit_id: String
  ) {
    questions: questionPagingExam(
      first: $first,
      after: $after,
      resolverArgs: $resolverArgs
    ) {
      edges {
        node {
          id
          points
          question_type
          question_text
          question_answer
          data {
            id
            tmpl_files
            environment_key
            use_advanced_features
            explanation
            src_files
            options {
              id
              text
            }
          }
          hint
          hint_exists
        }
      }
    }
    courseById(course_id: $course_id) {
      title
      logo_url
    }
    unitSpec(unit_id: $unit_id, course_id: $course_id) {
      title
      attempts_left
    }
  }
`

interface IProps {
  completed?: boolean
}

interface IStates {
  examAttemptId: string
  examTimeLimit: number
  loadedTakeExam: boolean
}

@requireAuthentication(1)
class ExamPage extends React.Component<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  state: IStates = {
    examAttemptId: '',
    examTimeLimit: 0,
    loadedTakeExam: false
  }

  getCourseId() {
    return fromUrlId(SchemaType.Course, this.props.match.params.courseId)
  }

  getUnitId() {
    return fromUrlId(SchemaType.CourseUnit, this.props.match.params.unitId)
  }

  componentDidMount() {
    TakeExamMutation(this.getCourseId(), this.getUnitId()).then((res: any) => {
      console.log('in TakeExamMutation', res)
      if (!res || !res.takeExam) {
        alert('This unit does not have any exams!')
      } else {
        this.setState({
          examAttemptId: res.takeExam.exam_attempt_id,
          examTimeLimit: res.takeExam.exam_time_limit,
          loadedTakeExam: true
        })
      }
    })
  }

  queryRender = ({ error, props }: { error: Error; props: any }) => {
    if (error) {
      console.log('gql render exam error:', error)
      return (
        <div>
          {error.message}
        </div>
      )
    }

    if (!props) {
      return <Loading />
    }
    let is_active_exam = false
    let dataExamAttempt = props.specificExamAttempt
    if (dataExamAttempt && dataExamAttempt.length > 0) {
      is_active_exam = dataExamAttempt[0].is_active
      if (props.unitSpec.attempts_left <= 0) {
        //top.location.href = `/courses/${this.props.match.params.courseId}/`
        //return <Loading />
      }
      if (is_active_exam == true) {
        //top.location.href = `/courses/${this.props.match.params.courseId}/`
        //return <Loading />
      }
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

    return (
      <Wrapper>
        <Helmet title={formatMessage(messages.pageTitle)} />
        <ExamDump
          courseId={this.getCourseId()}
          courseUrlId={this.props.match.params.courseId}
          unitId={this.getUnitId()}
          questionsList={questionsList}
          questionsById={questionsById}
          completed={completed}
          logo_url={props.courseById.logo_url}
          title_unit={props.unitSpec.title}
          examAttemptId={this.state.examAttemptId!}
          examTimeLimit={this.state.examTimeLimit!}
        />
      </Wrapper>
    )
  }

  render() {
    if (!this.state.loadedTakeExam) {
      return <Loading />
    }

    let variables = {
      first: 9999,
      resolverArgs: [
        {
          param: 'course_id',
          value: this.getCourseId()
        },
        {
          param: 'unit_id',
          value: this.getUnitId()
        }
      ],
      course_id: this.getCourseId(),
      unit_id: this.getUnitId()
    }
    if (this.props.match.params.examId) {
      variables.resolverArgs.push({
        param: 'exam_attempt_id',
        value: this.props.match.params.examId
      })
    }
    return (
      <QueryRenderer
        query={rootQuery}
        variables={variables}
        environment={environment} // RelayEnvironments
        render={this.queryRender}
      />
    )
  }
}

export default withRouter(injectIntl(ExamPage))
