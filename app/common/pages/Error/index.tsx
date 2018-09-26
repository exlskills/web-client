import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import messages from './messages'
import { ContentWrapper } from 'common/components/styledComponents'
import {
  BackToDashboardLink,
  ErrorPageMessageWrapper,
  SageImage
} from './styledComponents'

class Error extends React.PureComponent<
  InjectedIntlProps & RouteComponentProps<any>,
  {}
> {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { formatMessage } = this.props.intl
    const errorKey: string = this.props.match.params.errorCode
      ? `${this.props.match.params.errorCode}`
      : 'Unknown'
    const header = formatMessage(
      messages[`header${errorKey}`]
        ? messages[`header${errorKey}`]
        : messages.headerUnknown
    )
    const description = formatMessage(
      messages[`description${errorKey}`]
        ? messages[`description${errorKey}`]
        : messages.descriptionUnknown
    )

    return (
      <ContentWrapper>
        <SageImage errorKey={errorKey} />
        <ErrorPageMessageWrapper>
          <p>
            {errorKey}
          </p>
          <h2>
            {header}
          </h2>
          <p>
            {description}
          </p>
          <BackToDashboardLink href={'/learn'}>
            {formatMessage(messages.backToDashboard)}
          </BackToDashboardLink>
        </ErrorPageMessageWrapper>
      </ContentWrapper>
    )
  }
}

export default injectIntl(withRouter(Error))
