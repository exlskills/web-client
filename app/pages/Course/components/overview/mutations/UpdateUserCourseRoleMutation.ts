const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'
import * as uuid from 'uuid'

const mutation = graphql`
  mutation UpdateUserCourseRoleMutation($input: UpdateUserCourseRoleInput!) {
    updateUserCourseRole(input: $input) {
      completionObj {
        code
        msg
        processed
        modified
      }
      clientMutationId
    }
  }
`

const enrollCud = [
  {
    field: 'role',
    cudAction: 'CREATE',
    valueToAssign: 'learner'
  },
  {
    field: 'UserCourseRole',
    cudAction: 'CREATE'
  }
]
const unenrollCud = [
  {
    field: 'UserCourseRole',
    cudAction: 'DELETE'
  }
]

export default (userId: string, courseId: string, isEnroll: boolean) => {
  return commit({
    mutation: mutation,
    variables: {
      input: {
        cudContent: isEnroll ? enrollCud : unenrollCud,
        user_id: userId,
        course_id: courseId,
        clientMutationId: uuid.v4()
      }
    }
  })
}
