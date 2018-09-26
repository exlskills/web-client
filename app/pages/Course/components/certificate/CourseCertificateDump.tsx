import * as React from 'react'
import { ContentWrapper } from 'common/components/styledComponents'
import { IFreactalProps } from '../../index'
import { RouteComponentProps, withRouter } from 'react-router'
import { injectState } from 'freactal'
import messages from './messages'
import { injectIntl } from 'react-intl'
import Helmet from 'react-helmet'
import MarkdownStyleWrapper from 'common/components/MarkdownStyleWrapper'
import {
  ContentCard,
  ContentHeadingWrapper,
  ContentImgWrapper,
  ContentPurchaseWrapper,
  ContentTitleDescWrapper,
  DialogDivider
} from './styledComponents'
import { Button, Intent } from '@blueprintjs/core'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import PurchaseCertificateButton from '../common/PurchaseCertificateButton'
import { CertInfoMD } from './info'

const Markdown = require('react-remarkable')

interface IProps {
  title: string
  description: string
  courseId: string
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
    const {
      title,
      description,
      logoUrl,
      infoMarkdown,
      verifiedCertCost
    } = this.props

    return (
      <ContentWrapper responsive={true}>
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
        <br />
        <h3>
          {formatMessage(messages.pageHeading)}
        </h3>
        <br />
        <ContentCard>
          <ContentHeadingWrapper>
            <ContentImgWrapper>
              <img src={logoUrl} width={'100%'} />
            </ContentImgWrapper>
            <ContentTitleDescWrapper>
              <h4>
                {title}
              </h4>
              <p>
                {description}
              </p>
            </ContentTitleDescWrapper>
            <ContentPurchaseWrapper>
              <PurchaseCertificateButton
                itemDisplayName={formatMessage(
                  messages.verifiedCertificateTitle,
                  { course: this.props.title }
                )}
                certCost={verifiedCertCost}
                courseId={this.props.courseId}
                buttonText={formatMessage(messages.certPurchaseBtnMsg)}
                buttonStyle={{ width: '100%', textAlign: 'center' }}
              />
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                  marginBottom: '10px'
                }}
              >
                <small>
                  ${verifiedCertCost}{' '}
                  {formatMessage(messages.coinsCertCostNote)}
                  <b />
                </small>
              </div>
            </ContentPurchaseWrapper>
          </ContentHeadingWrapper>
          <DialogDivider />
          {this.parseContent(CertInfoMD)}
        </ContentCard>
      </ContentWrapper>
    )
  }
}

export default withRouter(injectIntl(injectState(CourseCertificateDump)))
