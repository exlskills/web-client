import * as React from 'react'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { handleQueryRender } from 'common/utils/relay'

const rootQuery = graphql`
  query CardQuestionHintQuery($resolverArgs: [QueryResolverArgs]!) {
    questionHint(resolverArgs: $resolverArgs) {
      hint
    }
  }
`

export interface IProps {
  shouldFetch: boolean
  questionId: string
}

class CardQuestionHint extends React.PureComponent<IProps, any> {
  queryRender = handleQueryRender(({ props }: { props: any }) => {
    const hint = props.questionHint ? props.questionHint.hint : ''

    return (
      <div>
        {hint}
      </div>
    )
  })

  render() {
    if (!this.props.questionId || !this.props.shouldFetch) {
      return <div />
    }
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
