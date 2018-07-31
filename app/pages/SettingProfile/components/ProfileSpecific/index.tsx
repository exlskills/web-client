import { Intent } from '@blueprintjs/core'
import Loading from 'common/components/Loading'
import Toaster from 'common/components/Toaster'
import * as React from 'react'
import * as moment from 'moment'
import ProfileDump from './ProfileDump'
const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'
import { RouteComponentProps } from 'react-router'
import { ACTIVITY_DAYS } from 'common/components/Calendar/constants'
const rootQuery = graphql`
  query ProfileSpecificQuery(
    $user_id: String,
    $start_date: String,
    $end_date: String
  ) {
    profileSpecific(user_id: $user_id) {
      id
      locales
      primary_locale
      full_name
      primary_email
      headline
      username
      biography
      avatar_url
    }
    userActivityById(
      user_id: $user_id,
      start_date: $start_date,
      end_date: $end_date
    ) {
      id
      date
      count
    }
  }
`

interface IProps {}
interface IStates {
  currentLocale: string
}

class SettingsProfileSpecific extends React.Component<
  IProps & RouteComponentProps<any>,
  {}
> {
  state: Partial<IStates> = {
    currentLocale: null
  }

  queryRender = ({ error, props }: { error: Error; props: any }) => {
    if (error) {
      return (
        <div>
          {error.message}
        </div>
      )
    }
    if (!props) {
      return <Loading />
    }

    const profile = props.profileSpecific ? props.profileSpecific : {}
    let activitiesList: { [date: string]: any } = {}
    if (props.userActivityById) {
      for (let data of props.userActivityById) {
        activitiesList[data.date] = { value: data.count }
      }
    }
    return <ProfileDump profile={profile} activitiesList={activitiesList} />
  }
  render() {
    const start_date = moment()
      .subtract(ACTIVITY_DAYS, 'days')
      .format('YYYY-MM-DD')
    const end_date = moment().format('YYYY-MM-DD')
    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          user_id: this.props.match.params.userId,
          start_date,
          end_date
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default SettingsProfileSpecific
