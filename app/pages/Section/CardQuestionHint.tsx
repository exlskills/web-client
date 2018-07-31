import * as React from 'react'
import { RendererProps } from 'common/utils/relay'
import Loading from 'common/components/Loading'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

const rootQuery = graphql`
  query CardQuestionHintQuery($resolverArgs: [QueryResolverArgs]!) {
    questionEntry(resolverArgs: $resolverArgs) {
      hint
    }
  }
`

export interface IProps {
  shouldFetch: boolean
  questionId: string
}

class CardQuestionHint extends React.PureComponent<IProps, any> {
  queryRender = ({ error, props }: RendererProps) => {
    if (error) {
      return (
        <div>
          {error.message}
        </div>
      )
    }

    if (!props) {
      return <Loading mt="0" />
    }

    const hint = props.questionEntry ? props.questionEntry.hint : ''

    return (
      <span>
        {hint}
      </span>
    )
  }

  render() {
    if (!this.props.questionId || !this.props.shouldFetch) {
      return <div />
    }
    console.log('render question hint', this.props.questionId)
    const variables = {
      resolverArgs: [
        {
          param: 'question_id',
          value: this.props.questionId
        }
      ]
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
export default CardQuestionHint
