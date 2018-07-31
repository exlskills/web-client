const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'
const mutation = graphql`
  mutation UpdateUserProfileMutation($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      completionObj {
        code
        msg
      }
    }
  }
`
export default (locale: string, profile: any) => {
  return commit({
    mutation,
    variables: {
      input: { locale, profile }
    }
  })
}
