const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'
import * as uuid from 'uuid'

const mutation = graphql`
  mutation AnswerExamQuestionMutation($input: SubmitAnswerInput!) {
    submitAnswer(input: $input) {
      completionObj {
        code
        msg
        processed
        modified
      }
    }
  }
`

export default (
  exam_attempt_id: string,
  question_id: string,
  response_data: string
) => {
  return commit({
    mutation,
    variables: {
      input: {
        exam_attempt_id,
        question_id,
        response_data,
        clientMutationId: uuid.v4()
      }
    }
  })
}
