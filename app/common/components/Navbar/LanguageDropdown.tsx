import * as React from 'react'

import {
  Menu,
  Popover,
  MenuItem,
  Position,
  MenuDivider
} from '@blueprintjs/core'
import { SupportedLocales } from 'typings/client'
import wsclient from 'common/ws/client'
import { WS_EVENTS } from 'common/ws/constants'
import Loading from 'common/components/Loading'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import messages from './messages'
interface IProps {
  onClick: (locale: SupportedLocales) => void
  locale: SupportedLocales
  theme: string
}
interface IStates {
  value_locale: string
  isOpen: boolean
  contentPop: any
}
const { graphql } = require('react-relay/compat')
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

const rootQuery = graphql`
  query LanguageDropdownQuery {
    langType {
      label
      value
    }
  }
`
class LanguageDropdown extends React.PureComponent<
  IProps & InjectedIntlProps,
  IStates
> {
  state: IStates = {
    value_locale: '',
    isOpen: false,
    contentPop: ''
  }
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any
  handleLocaleClick = (locale: SupportedLocales) => () => {
    let new_value = locale
    let old_value = this.props.locale
    wsclient.sendEvent(WS_EVENTS.userLocale, {
      user_id: this.context.viewer.user_id,
      locale_from: old_value,
      locale_to: new_value
    })
    this.props.onClick(locale)
  }
  renderEmptyMenu(random: string) {
    const { formatMessage } = this.props.intl
    return (
      <Menu>
        <MenuItem key="no-value" text={formatMessage(messages.emptyMenu)} />
      </Menu>
    )
  }
  handleClickGlobal = (props: any) => () => {
    // TODO this should be refactored... Checking for 'exams' in the path and then doing something is dangerous and error-prone
    if (window.location.href.indexOf('exams') > -1) {
      this.setState({ contentPop: this.renderEmptyMenu('no-value') })
    } else {
      this.setState({ contentPop: this.renderMenu(props) })
    }
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
      return <Loading mt="0" />
    }
    //this.setState({contentPop:this.renderMenu(props)})
    return (
      <Popover
        popoverClassName={`pt-minimal ${this.props.theme == 'pt-dark'
          ? 'pt-dark'
          : ''}`}
        content={this.state.contentPop}
        position={Position.BOTTOM_RIGHT}
      >
        <button
          id="id-global-lang"
          className="pt-button pt-minimal pt-icon-globe"
          onClick={this.handleClickGlobal(props)}
        />
      </Popover>
    )
  }
  renderMenu(props: any) {
    const { locale } = this.props
    return (
      <Menu>
        {props.langType.map((item: any, idx: number) =>
          <MenuItem
            key={item.value}
            disabled={locale === item.value}
            text={item.label}
            onClick={this.handleLocaleClick(item.value)}
          />
        )}
      </Menu>
    )
  }

  render() {
    const queryRender = ({ error, props }: { error: Error; props: any }) =>
      this.queryRender({ error, props })
    return (
      <QueryRenderer
        query={rootQuery}
        environment={environment}
        render={queryRender}
      />
    )
  }
}
export default injectIntl(LanguageDropdown)
