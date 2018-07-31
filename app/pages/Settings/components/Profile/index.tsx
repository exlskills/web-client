import { Intent } from '@blueprintjs/core'
import Loading from 'common/components/Loading'
import Toaster from 'common/components/Toaster'
import * as React from 'react'
import ProfileDump, { ProfileProps } from './ProfileDump'
import UpdateUserProfileMutation from './mutations/UpdateUserProfileMutation'

const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

const rootQuery = graphql`
  query ProfileQuery($locale: String) {
    sysLocales: langType {
      label
      value
    }
    userProfile(locale: $locale) {
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
  }
`

interface IProps {}
interface IStates {
  currentLocale: string
}

class SettingsProfile extends React.Component<IProps, {}> {
  state: Partial<IStates> = {
    currentLocale: null
  }

  handleUpdateProfile = (locale: string, profile: ProfileProps) => {
    console.log(profile)
    UpdateUserProfileMutation(locale, profile).then((res: any) => {
      console.log('in UpdateUserProfileMutation')
      console.log(res)
      // this.setState({
      //   currentLocale: profile.primary_locale
      // })
      let message = {
        intent: Intent.SUCCESS,
        message: 'Profile saved successfully'
      }
      if (res.updateUserProfile && res.updateUserProfile.completionObj) {
        if (res.updateUserProfile.completionObj.code != '0') {
          message.intent = Intent.DANGER
          message.message = res.updateUserProfile.completionObj.msg
        }
      } else {
        message.intent = Intent.DANGER
        message.message = 'Something went wrong!'
      }

      Toaster.show(message)
    })
  }

  handleLocaleChange = (newLocale: string, oldLocale: string) => {
    this.setState({
      currentLocale: newLocale
    })
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

    const profile = props.userProfile ? props.userProfile : {}
    const sysLocales = props.sysLocales ? props.sysLocales : []
    return (
      <ProfileDump
        profile={profile}
        locale={this.state.currentLocale}
        allLocales={sysLocales}
        onUpdate={this.handleUpdateProfile}
        onLocaleChange={this.handleLocaleChange}
      />
    )
  }
  render() {
    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          locale: this.state.currentLocale
        }}
        environment={environment}
        render={this.queryRender}
      />
    )
  }
}

export default SettingsProfile
