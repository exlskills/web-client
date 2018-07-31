import { Icon } from 'common/components/styledComponents'
import {
  Popover,
  Menu,
  MenuItem,
  MenuDivider,
  Position
} from '@blueprintjs/core'
import * as React from 'react'
import { AvatarWrapper, InputsWrapper, Wrapper } from './styledComponents'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import Avatar from '../Avatar'
import messages from './messages'
import { Button, Intent } from '@blueprintjs/core/dist'
import FormGroup from 'common/components/forms/inputs/FormGroup'
import Input from 'common/components/forms/inputs/Input'
import Select from 'common/components/forms/inputs/Select'

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

interface IProps {
  profile: ProfileProps
  onUpdate: (locale: string, profile: ProfileProps) => void
  locale: string
  allLocales: { label: string; value: string }[]
  onLocaleChange: (newLocale: string, oldLocale: string) => void
}
type MergedProps = IProps & InjectedIntlProps

export interface IStates {
  currentLocale: string
  profile: ProfileProps
  validate: Partial<ProfileProps>
}

class ProfileDump extends React.PureComponent<MergedProps, IStates> {
  constructor(props: MergedProps) {
    super(props)
    this.state = {
      currentLocale: this.props.locale || this.props.profile.primary_locale,
      profile: props.profile,
      validate: {}
    }
  }

  handleProfileLocaleChange = (newVal: string, oldVal: string) => {
    this.props.onLocaleChange(newVal, oldVal)
  }

  handleFieldChange = (
    newVal: string,
    oldVal: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    this.setState({
      profile: { ...this.state.profile, [e.target.name]: newVal }
    })
  }

  validateRequiredField = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name)
    const fieldName = e.target.name
    const data: any = this.state.profile
    let newValidate: any = { ...this.state.validate }
    if (data[fieldName].trim().length == 0) {
      newValidate[fieldName] = 'This field is required'
    } else {
      delete newValidate[fieldName]
    }
    this.setState({ validate: newValidate })
  }

  handleAddLocale = (locale: any) => () => {
    const { profile } = this.state
    const newProfile: ProfileProps = {
      ...profile,
      locales: [...profile.locales, locale.value],
      full_name: '',
      headline: '',
      biography: ''
    }
    this.setState({ currentLocale: locale.value, profile: newProfile })
  }

  handleUpdateProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onUpdate(this.state.currentLocale, this.state.profile)
  }

  getUserLocales() {
    const localeNames: any = {
      en: 'English',
      fr: 'French',
      zh: '中文'
    }
    const locales = this.state.profile.locales
    return locales.map(item => ({
      name: localeNames[item],
      value: item
    }))
  }

  render() {
    const { formatMessage } = this.props.intl
    const { currentLocale, profile, validate } = this.state
    console.log()
    const hasError = Object.keys(validate).length !== 0

    let remainLocales: any = []
    this.props.allLocales.forEach(elem => {
      if (profile.locales.indexOf(elem.value) == -1) {
        remainLocales.push(elem)
      }
    })

    return (
      <Wrapper>
        {/*<AvatarWrapper>*/}
        {/*<FormGroup label={formatMessage(messages.lbProfilePicture)}>*/}
        {/*<Avatar*/}
        {/*size={'100%'}*/}
        {/*showUploader={true}*/}
        {/*imageUrl={profile.avatar_url}*/}
        {/*/>*/}
        {/*</FormGroup>*/}
        {/*</AvatarWrapper>*/}
        <InputsWrapper>
          <Select
            options={this.getUserLocales()}
            label={formatMessage(messages.lbProfileLocale)}
            name={'currentLocale'}
            value={currentLocale}
            onValueChange={this.handleProfileLocaleChange}
            helpText={formatMessage(messages.txtProfileLocaleHelp)}
            rightButton={
              <Popover
                content={
                  <Menu>
                    {remainLocales.map((item: any) =>
                      <MenuItem
                        key={`remainlocale_${item.value}`}
                        text={item.label}
                        onClick={this.handleAddLocale(item)}
                      />
                    )}
                    {remainLocales.length == 0 &&
                      <MenuDivider title="No more locales" />}
                  </Menu>
                }
                position={Position.BOTTOM}
              >
                <Button
                  intent={Intent.NONE}
                  text={formatMessage(messages.btnAddLocale)}
                />
              </Popover>
            }
          />
          <Select
            options={this.getUserLocales()}
            label={formatMessage(messages.lbPrimaryLocale)}
            name={'primary_locale'}
            value={profile.primary_locale}
            onValueChange={this.handleFieldChange}
          />
          <hr />
          <Input
            label={formatMessage(messages.lbFullname)}
            placeholder={formatMessage(messages.phFullname)}
            name={'full_name'}
            value={profile.full_name}
            onValueChange={this.handleFieldChange}
            required={true}
            validate={this.validateRequiredField}
            error={this.state.validate.full_name}
          />
          <Input
            label={formatMessage(messages.lbEmail)}
            placeholder={formatMessage(messages.phEmail)}
            name={'primary_email'}
            value={profile.primary_email}
            onValueChange={this.handleFieldChange}
            required={true}
            validate={this.validateRequiredField}
            error={this.state.validate.primary_email}
          />
          <Input
            label={formatMessage(messages.lbUsername)}
            placeholder={formatMessage(messages.phUsername)}
            name={'username'}
            value={profile.username}
            onValueChange={this.handleFieldChange}
            required={true}
            validate={this.validateRequiredField}
            error={this.state.validate.username}
          />
          <Input
            label={formatMessage(messages.lbHeadline)}
            placeholder={formatMessage(messages.phHeadline)}
            textarea={true}
            name={'headline'}
            value={profile.headline}
            onValueChange={this.handleFieldChange}
            required={true}
            validate={this.validateRequiredField}
            error={this.state.validate.headline}
          />
          <Input
            label={formatMessage(messages.lbBiography)}
            textarea={true}
            placeholder={formatMessage(messages.phBiography)}
            name={'biography'}
            value={profile.biography}
            onValueChange={this.handleFieldChange}
            required={true}
            validate={this.validateRequiredField}
            error={this.state.validate.biography}
          />
          <Button
            intent={Intent.PRIMARY}
            text={formatMessage(messages.btnUpdateProfile)}
            onClick={this.handleUpdateProfile}
            disabled={hasError}
          />
        </InputsWrapper>
      </Wrapper>
    )
  }
}

export default injectIntl<IProps>(ProfileDump)
