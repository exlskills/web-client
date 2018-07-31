const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'
import * as uuid from 'uuid'

const mutation = graphql`
  mutation LeaveExamMutation($input: LeaveExamInput!) {
    leaveExam(input: $input) {
      completionObj {
        code
        msg
        processed
        modified
      }
    }
  }
`

export default (exam_attempt_id: string) => {
  return commit({
    mutation,
    variables: {
      input: {
        exam_attempt_id,
        clientMutationId: uuid.v4()
      }
    }
  })
}
