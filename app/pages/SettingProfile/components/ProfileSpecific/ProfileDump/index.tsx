import { Icon } from 'common/components/styledComponents'
import {
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Position,
  Classes,
  Switch,
  Tab2,
  Tabs2
} from '@blueprintjs/core'
import * as React from 'react'
import {
  AvatarWrapper,
  InputsWrapper,
  Wrapper,
  ClassTab
} from './styledComponents'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import Avatar from '../Avatar'
import messages from './messages'
import { Button, Intent } from '@blueprintjs/core/dist'
import FormGroup from 'common/components/forms/inputs/FormGroup'
import Input from 'common/components/forms/inputs/Input'
import Select from 'common/components/forms/inputs/Select'
import ActivitiesCalendar from 'common/components/Calendar/ActivitiesCalendar'
import {
  CalendarWrapper,
  Metric,
  MetricNumber,
  MetricTitle,
  MetricWrapper,
  PanelWrapper
} from '../styledComponents'
import { Box } from 'grid-styled'
export interface ProfileProps {
  id: string
  locales: string[]
  primary_locale: string
  full_name: string
  primary_email: string
  username: string
  headline: string
  biography: string
  avatar_url: string
}
export interface ITabs2ExampleState {
  activeTabId?: string
  activePanelOnly?: boolean
  animate?: boolean
  navbarTabId?: string
  vertical?: boolean
}
interface IProps {
  profile: ProfileProps
  activitiesList: any
}
type MergedProps = IProps & InjectedIntlProps

export interface IStates {
  profile: ProfileProps
}

class ProfileDump extends React.PureComponent<MergedProps, IStates> {
  constructor(props: MergedProps) {
    super(props)
    this.state = {
      profile: props.profile
    }
  }
  render() {
    const { formatMessage } = this.props.intl
    const { profile } = this.state
    let styleForText: any = {
      marginBottom: '5px',
      fontSize: '1.4em',
      fontWeight: '800',
      padding: '10px'
    }
    let styleForBio: any = {
      marginBottom: '5px',
      fontSize: '1.4em',
      padding: '10px'
    }
    let styleForEmail: any = {
      marginBottom: '5px',
      fontSize: '1em',
      color: '#48aff0',
      padding: '10px'
    }
    return (
      <Wrapper>
        <InputsWrapper>
          {/*<Avatar*/}
          {/*size={'50%'}*/}
          {/*showUploader={true}*/}
          {/*imageUrl={profile.avatar_url}*/}
          {/*/>*/}
          <p style={styleForText}>
            {profile.full_name}
          </p>
          <p style={styleForBio}>
            {profile.headline}
          </p>
          <p style={styleForBio}>
            {profile.biography}
          </p>
          <p style={styleForEmail}>
            {profile.primary_email}
          </p>
        </InputsWrapper>
        <div style={{ width: '65%' }}>
          <Tabs2 id="Tabs2Example" onChange={console.log}>
            <Tab2
              id="rx"
              title="Overview"
              panel={
                <CalendarWrapper>
                  {' '}<ActivitiesCalendar
                    activities={this.props.activitiesList}
                  />{' '}
                </CalendarWrapper>
              }
            />
            <Tab2 id="ng" title="Workspaces" />
            <Tabs2.Expander />
          </Tabs2>
        </div>
      </Wrapper>
    )
  }
}

export default injectIntl<IProps>(ProfileDump)
