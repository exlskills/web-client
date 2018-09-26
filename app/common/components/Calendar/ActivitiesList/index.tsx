import Loading from 'common/components/Loading'
import { Flex, Box } from 'grid-styled'
import { Button, Collapse } from '@blueprintjs/core'
import { Icon } from 'common/components/styledComponents'
import { RendererProps } from 'common/utils/relay'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { createPaginationContainer } from 'react-relay'
import { RouteComponentProps, withRouter } from 'react-router'
import { handleQueryRender } from 'common/utils/relay'
import {
  ContentWrapper,
  EventBody,
  EventBodyItem,
  EventBodyList,
  EventIcon,
  EventTime,
  EventTitle,
  EventWrapper,
  EmptyText
} from './styledComponents'
import ActivitiesContainer from './ActivitiesList'
import CollapseList from './CollapseList'
const { graphql } = require('react-relay/compat')
const rootQuery = graphql`
  query ActivitiesListQuery(
    $count: Int!,
    $cursor: String,
    $resolverArgs: [QueryResolverArgs]!
  ) {
    activityPaging {
      ...ActivitiesList_activityPaging
    }
  }
`
interface IProps {
  isOpen: boolean
  date: string
  group?: string
}
const PER_PAGE = 10
interface IStates {
  count: number
}
class Activities extends React.PureComponent<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  state: IStates = {
    count: PER_PAGE
  }

  queryRender = handleQueryRender(({ props }: { props: any }) => {
    return (
      <ActivitiesContainer
        {...props}
        group={this.props.group}
        date={this.props.date}
        isOpen={this.props.isOpen}
      />
    )
  })

  render() {
    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          count: this.state.count,
          resolverArgs: [
            { param: 'input_date', value: this.props.date },
            { param: 'group', value: this.props.group }
          ]
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default injectIntl<IProps>(Activities)
