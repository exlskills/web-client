const { graphql } = require('react-relay/compat')

const rootQuery = graphql`
  query CourseInfoQuery($course_id: String) {
    courseById(course_id: $course_id) {
      id
      title
      logo_url
      info_md
      verified_cert_cost
    }
  }
`

export default rootQuery
