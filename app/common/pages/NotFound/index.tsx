import * as React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'
import { ContentWrapper } from 'common/components/styledComponents'

export default class NotFound extends React.PureComponent<{}, {}> {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ContentWrapper>
        <img style={{margin: '0 auto', marginTop: '80px'}} width={'400px'} height={'auto'} src={"https://exlskills.com/wp-content/uploads/2018/07/instractor.png"} />
        <div style={{textAlign: 'center', marginTop: '30px'}}>
          <h2>
            <FormattedMessage {...messages.header} />
          </h2>
          <a href={'/learn'} style={{fontSize: '20px', marginTop: '40px'}}>
            <FormattedMessage {...messages.backToDashboard} />
          </a>
        </div>
      </ContentWrapper>
    )
  }
}
