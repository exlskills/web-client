import { Button, Intent } from '@blueprintjs/core'
import { Icon } from 'common/components/styledComponents'
import Loading from 'common/components/Loading'
import { RendererProps } from 'common/utils/relay'
import { injectState } from 'freactal'
import * as React from 'react'
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

import { IFreactalProps } from 'pages/Course'
import ContentDump from './ContentDump'
import { ResultWrapper } from '../styledComponents'
import messages from '../messages'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
import SubmitQuizAnswerMutation from '../../mutations/SubmitQuizAnswerMutation'
import TakeQuiz from '../../mutations/TakeQuiz'

const { graphql } = require('react-relay/compat')
const rootQuery = graphql`
  query ExamDialogContentQuery(
    $first: Int!,
    $after: String,
    $resolverArgs: [QueryResolverArgs]!
  ) {
    questions: questionPaging(
      first: $first,
      after: $after,
      resolverArgs: $resolverArgs
    ) {
      edges {
        cursor
        node {
          id
          question_type
          question_text
          data {
            id
            code
            options {
              id
              text
            }
          }
          hint
          hint_exists
          card_id
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export interface IProps {}
type MergedProps = IProps & IFreactalProps & InjectedIntlProps

class ExamDialogContent extends React.PureComponent<MergedProps, any> {
  handleRetakeQuiz = () => {
    TakeQuiz(
      this.props.state.course.id,
      this.props.state.examUnit.id
    ).then((res: any) => {
      if (!res || !res.takeQuiz) {
        // TODO
      } else {
        this.props.effects.massiveUpdate({
          examQuizId: res.takeQuiz.quiz_id,
          examAnswer: null,
          examExplanation: '',
          examQuestionCursor: null
        })
      }
    })
  }
  componentDidMount() {
    const { formatMessage } = this.props.intl
    if (
      document.getElementsByClassName(
        'pt-dialog-close-button pt-icon-small-cross'
      ).length > 0
    ) {
      document.getElementsByClassName(
        'pt-dialog-close-button pt-icon-small-cross'
      )[0].innerHTML =
        '<span>' + formatMessage(messages.finishQuiz) + '</span>'
      if (
        document.getElementsByClassName(
          'pt-dialog-close-button pt-icon-small-cross'
        )[0]
      )
        document
          .getElementsByClassName(
            'pt-dialog-close-button pt-icon-small-cross'
          )[0]
          .setAttribute('style', 'margin-right:16px')
      if (
        document.getElementsByClassName(
          'pt-dialog-close-button pt-icon-small-cross'
        )[0]
      )
        document
          .getElementsByClassName(
            'pt-dialog-close-button pt-icon-small-cross'
          )[0]
          .setAttribute('class', 'pt-button')
    }
  }
  queryRender = ({ error, props }: RendererProps) => {
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

    console.log('dialog content queryRender')
    const { formatMessage } = this.props.intl

    if (!props.questions || !props.questions.edges[0]) {
      this.props.effects.setExamQuestion(null)
      return (
        <ResultWrapper>
          <h3>
            <Icon iconName={'endorsed'} className={'pt-intent-success'} />
            <FormattedMessage {...messages.txtNoMoreQuestions} />
          </h3>
          <Button
            intent={Intent.NONE}
            iconName={'repeat'}
            text={formatMessage(messages.lbRetakeQuiz)}
            onClick={this.handleRetakeQuiz}
          />
        </ResultWrapper>
      )
    }

    const question = props.questions.edges[0]
    let currentQuestion = { ...question.node }
    currentQuestion.pageInfo = props.questions.pageInfo
    this.props.effects.setExamQuestion(currentQuestion)

    const { examQuizId } = this.props.state
    SubmitQuizAnswerMutation(
      currentQuestion.id,
      examQuizId,
      null,
      true
    ).then((res: any) => {
      console.log('submit question success')
      console.log(res)
    })
    return <ContentDump question={currentQuestion} />
  }

  render() {
    console.log('dialog content render')
    const {
      examQuestionCursor,
      examUnit,
      examSection,
      examType
    } = this.props.state

    let variables: any = {
      first: 1,
      after: examQuestionCursor,
      resolverArgs: []
    }
    if (examType == 'unit') {
      variables.resolverArgs.push({
        param: 'unit_id',
        value: examUnit.id
      })
    } else {
      variables.resolverArgs.push({
        param: 'section_id',
        value: examSection.id
      })
    }

    if (!examType || (!examUnit && !examSection)) {
      return null
    }

    return (
      <QueryRenderer
        query={rootQuery}
        variables={variables}
        environment={environment} // RelayEnvironment
        render={this.queryRender}
      />
    )
  }
}

export default injectState<IProps>(injectIntl(ExamDialogContent))
