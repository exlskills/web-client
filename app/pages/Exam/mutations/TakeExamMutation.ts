const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'
import * as uuid from 'uuid'

const mutation = graphql`
  mutation TakeExamMutation($input: TakeExamInput!) {
    takeExam(input: $input) {
      exam_attempt_id
      exam_time_limit
      exam_id
      completionObj {
        code
        msg
        processed
        modified
      }
    }
  }
`

export default (courseId: string, unitId: string) => {
  return commit({
    mutation,
    variables: {
      input: {
        courseId,
        unitId,
        clientMutationId: uuid.v4()
      }
    }
  })
}
