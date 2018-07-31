const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'

const mutation = graphql`
  mutation TakeQuizIconMutation($input: TakeQuizInput!) {
    takeQuiz(input: $input) {
      quiz_id
    }
  }
`

export default (courseId: string, unitId: string) => {
  return commit({
    mutation,
    variables: {
      input: {
        courseId,
        unitId
      }
    }
  })
}
