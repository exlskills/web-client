import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { GRAPHQL_URL } from 'common/constants'

const source = new RecordSource()
const store = new Store(source)

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation: { text: string }, variables: any) {
  return fetch(GRAPHQL_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    return response.json()
  })
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery)

const environment = new Environment({
  network,
  store
})

export default environment
