const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'

const mutation = graphql`
  mutation UpdateQuizMutation($input: UpdateUserUnitStatusInput!) {
    updateUserUnitStatus(input: $input) {
      completionObj {
        code
        msg
        processed
        modified
      }
    }
  }
`

export default (unitId: string, courseId: string) => {
  return commit({
    mutation,
    variables: {
      input: {
        unit_id: unitId,
        course_id: courseId
      }
    }
  })
}
