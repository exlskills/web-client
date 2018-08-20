import * as React from 'react'
import { ContentWrapper } from 'common/components/styledComponents'
import { IFreactalProps } from '../../index'
import { RouteComponentProps, withRouter } from 'react-router'
import { injectState } from 'freactal'
import messages from './messages'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import Helmet from 'react-helmet'
const Markdown = require('react-remarkable')
import MarkdownStyleWrapper from 'common/components/MarkdownStyleWrapper'

interface IProps {
  title: string
  description: string
  logoUrl: string
  infoMarkdown: string
  verifiedCertCost?: number
}

interface IState {}

class CourseCertificateDump extends React.Component<
  IProps & IFreactalProps & InjectedIntlProps & RouteComponentProps<any>,
  IState
> {
  static defaultProps = {}

  state = {}
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  parseContent(text: string) {
    return (
      <MarkdownStyleWrapper>
        <Markdown options={{ html: true }} source={text || ''} />
      </MarkdownStyleWrapper>
    )
  }

  render() {
    const { formatMessage } = this.props.intl
    const { infoMarkdown, verifiedCertCost } = this.props

    return (
      <ContentWrapper>
        <Helmet
          title={formatMessage(messages.pageTitle, {
            course: this.props.title
          })}
          meta={[
            {
              name: 'description',
              content: formatMessage(messages.pageDescription, {
                description: this.props.description
              })
            }
          ]}
        />
        {this.parseContent(infoMarkdown)}
        <div>
          Get a certificate for just:
          {verifiedCertCost}
        </div>
      </ContentWrapper>
    )
  }
}

export default withRouter(injectIntl(injectState(CourseCertificateDump)))
