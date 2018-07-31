const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'
import * as uuid from 'uuid'

const mutation = graphql`
  mutation SubmitCardAnswerMutation($input: SubmitAnswerInput!) {
    submitAnswer(input: $input) {
      is_correct
      explain_text
      next_question {
        course_id
        section_id
        unit_id
      }
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
  question_id: string,
  quiz_id: string,
  response_data: string,
  is_last_question?: boolean
) => {
  return commit({
    mutation,
    variables: {
      input: {
        quiz: true,
        checkAnswer: true,
        question_id,
        exam_attempt_id: quiz_id,
        clientMutationId: uuid.v4(),
        response_data,
        is_last_question
      }
    }
  })
}
