import * as React from 'react'
import { CourseImage, Wrapper } from './styledComponents'
import { SideBarMenu } from 'common/components/loaders'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'
import { RouteComponentProps } from 'react-router'
import { getFirstPath } from 'common/utils/routes'
import { SchemaType, fromUrlId, toUrlId } from 'common/utils/urlid'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { IconName } from '@blueprintjs/core'
import { getBadgeURLForTopic } from 'common/utils/topic-badges'
import { handleQueryRender } from 'common/utils/relay'

const rootQuery = graphql`
  query SidebarQuery(
    $first: Int!,
    $resolverArgs: [QueryResolverArgs]!,
    $course_id: String
  ) {
    course: courseById(course_id: $course_id) {
      title
      logo_url
      primary_topic
      delivery_methods
    }
    unitPaging(first: $first, resolverArgs: $resolverArgs) {
      edges {
        node {
          id
          index
          title
          sections_list {
            id
            title
          }
        }
      }
    }
  }
`

interface IProps {}

const menuItems: any = [
  { translationId: 'menuOverview', pathExt: '', iconName: 'home' },
  { translationId: 'menuInfo', pathExt: '/info', iconName: 'info-sign' },
  {
    translationId: 'menuContent',
    pathExt: '/content',
    iconName: 'book'
  }, // layout-hierarchy
  { translationId: 'menuGrades', pathExt: '/grades', iconName: 'chart' },
  {
    translationId: 'menuCertificate',
    pathExt: '/certificate',
    iconName: 'badge'
  }
]

class Sidebar extends React.PureComponent<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  {}
> {
  handleChange = (route: string) => {
    const { history, match } = this.props
    const baseCourseUrl = `/courses/${match.params.courseId}`
    history.push(`${baseCourseUrl}${route}`)
  }

  getBasePath = () => {
    const { match } = this.props
    return `/courses/${match.params.courseId}`
  }

  queryRender = handleQueryRender(({ props }: { props: any }) => {
    const { formatMessage } = this.props.intl
    const { match: { url }, location: { pathname } } = this.props
    let valueChange = `/${getFirstPath(pathname.slice(url.length))}`
    if (valueChange == '/') {
      valueChange = ''
    }
    let allMenuItems = [
      {
        isHeader: true,
        avatarSrc: getBadgeURLForTopic(props.course.primary_topic),
        avatarName: props.course.title,
        text: props.course.title
      },
      { isDivider: true }
    ].concat(menuItems) as any[]

    if (props.course.delivery_methods.includes('live')) {
      allMenuItems.push({
        pathExt: '/live',
        iconName: 'video',
        translationId: 'menuLive'
      })
    }

    return (
      <Wrapper>
        <SideBarMenu
          items={allMenuItems.map(
            (item: any) =>
              item.isHeader || item.isDivider
                ? item
                : {
                    pathExt: item.pathExt,
                    iconName: item.iconName as IconName,
                    text: formatMessage((messages as any)[item.translationId])
                  }
          )}
          large={true}
          basePath={this.getBasePath()}
          pathExt={valueChange}
        />
      </Wrapper>
    )
  })

  render() {
    const course_id = fromUrlId(
      SchemaType.Course,
      this.props.match.params.courseId
    )

    // Force render to update sidebar menu
    const queryRender = ({ error, props }: { error: Error; props: any }) =>
      this.queryRender({ error, props })

    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          first: 20,
          course_id: course_id,
          resolverArgs: [
            {
              param: 'course_id',
              value: course_id
            }
          ]
        }}
        environment={environment}
        render={queryRender}
      />
    )
  }
}

export default withRouter(injectIntl(Sidebar))
