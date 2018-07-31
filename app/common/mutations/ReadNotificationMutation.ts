const { graphql } = require('react-relay/compat')
import { commit } from 'common/utils/relay'
import * as uuid from 'uuid'

const mutation = graphql`
  mutation ReadNotificationMutation($input: ReadNotificationInput!) {
    readNotification(input: $input) {
      completionObj {
        code
        msg
        processed
        modified
      }
    }
  }
`

export default (notif_id: string) => {
  return commit({
    mutation,
    variables: {
      input: {
        notif_id,
        clientMutationId: uuid.v4()
      }
    }
  })
}
