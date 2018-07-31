import * as React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { IntlProvider, Messages } from 'react-intl'

import { selectLocale } from './selectors'
import { ReactElement } from 'react'
import { SupportedLocales } from '../../typings/client'

interface IProps {
  messages: Messages
  children?: ReactElement<any>
}

interface IStateToProps {
  locale: SupportedLocales
}

export class LanguageProvider extends React.PureComponent<
  IProps & IStateToProps,
  void
> {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

const mapStateToProps = createSelector(selectLocale(), locale => ({ locale }))

export default connect<IStateToProps, {}, IProps>(mapStateToProps)(
  LanguageProvider
)
