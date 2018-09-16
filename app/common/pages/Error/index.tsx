import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { RouteComponentProps, Prompt, withRouter } from 'react-router'

import messages from './messages'
import { ContentWrapper } from 'common/components/styledComponents'

export default class Error extends React.Component<
  RouteComponentProps<any>,
  null
> {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const errorCode = this.props.match.params.errorCode || 404
    const header = messages[`header${errorCode}`] || messages['header404']
    const description =
      messages[`description${errorCode}`] || messages['description404']

    return (
      <ContentWrapper>
        <img
          style={{ margin: '0 auto', marginTop: '80px' }}
          width={'400px'}
          height={'auto'}
          src={
            'https://exlskills.com/wp-content/uploads/2018/07/instractor.png'
          }
        />
        <div style={{ margin: '0 auto', marginTop: '30px' }}>
          <p>
            {errorCode}
          </p>
          <h2>
            <FormattedMessage {...header} />
          </h2>
          <p>
            <FormattedMessage {...description} />
          </p>
          <a href={'/learn'} style={{ fontSize: '20px', marginTop: '40px' }}>
            <FormattedMessage {...messages.backToDashboard} />
          </a>
        </div>
      </ContentWrapper>
    )
  }
}
