const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'
import * as uuid from 'uuid'

const mutation = graphql`
  mutation SubmitQuizAnswerMutation($input: SubmitAnswerInput!) {
    submitAnswer(input: $input) {
      unit {
        id
        ema
        grade
        unit_progress_state
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
      is_correct
      explain_text
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
  is_quiz_start: boolean
) => {
  return commit({
    mutation,
    variables: {
      input: {
        quiz: true,
        checkAnswer: !is_quiz_start,
        question_id,
        exam_attempt_id: quiz_id,
        clientMutationId: uuid.v4(),
        response_data,
        is_quiz_start
      }
    }
  })
}
