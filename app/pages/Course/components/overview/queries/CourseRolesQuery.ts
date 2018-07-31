const { graphql } = require('react-relay/compat')

const rootQuery = graphql`
  query CourseRolesQuery {
    userProfile {
      course_roles(first: 999) {
        edges {
          node {
            id
            course_id
            role
            last_accessed_at
          }
        }
      }
    }
  }
`

export default rootQuery
