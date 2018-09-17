import { Button } from '@blueprintjs/core'
import * as React from 'react'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { Flex, FlexProps, Box, BoxProps } from 'grid-styled'
import { RouteComponentProps } from 'react-router'
import { anonymousAccess } from 'common/http/auth'
import { setViewer } from 'common/utils/viewer'

import { Icon } from 'common/components/styledComponents'
import AuthForm from './components/AuthForm'
import Footer from './components/Footer'
import messages from './messages'
import {
  ContentWrapper,
  LoginWrapper,
  PageContainer,
  Wrapper,
  Title,
  Subtitle,
  GetStartButton,
  SmallNote
} from './styledComponents'

interface IProps {}

interface IStates {}

class Landing extends React.PureComponent<
  IProps & InjectedIntlProps & RouteComponentProps<any>,
  IStates
> {
  // eslint-disable-line react/prefer-stateless-function

  handleGetStart = () => {
    anonymousAccess()
      .then(response => {
        if (response.data && response.data.status == 'OK') {
          setViewer(response.data.user)
          this.props.history.push('/dashboard')
        } else {
          console.debug(response)
        }
      })
      .catch(error => {
        console.debug(error.response)
      })
  }

  render() {
    const { formatMessage } = this.props.intl

    return (
      <Wrapper>
        <Helmet>
          <title>
            {formatMessage(messages.pageTitle)}
          </title>
          <meta
            name="description"
            content={formatMessage(messages.pageDescription)}
          />
        </Helmet>
        <PageContainer>
          <Flex wrap={true}>
            <ContentWrapper>
              <Title>
                {formatMessage(messages.slogan1)}
                <br />
                {formatMessage(messages.slogan2)}
              </Title>
              <Subtitle>
                {formatMessage(messages.pageDescription)}
              </Subtitle>
              <GetStartButton onClick={this.handleGetStart}>
                {formatMessage(messages.getStarted)}{' '}
                <Icon iconName="arrow-right" />
              </GetStartButton>
              <SmallNote>
                {formatMessage(messages.noLoginRequired)}
              </SmallNote>
            </ContentWrapper>
            <Box width={[1, 1 / 2]}>
              <LoginWrapper>
                <AuthForm />
              </LoginWrapper>
            </Box>
          </Flex>
        </PageContainer>
        <Footer />
      </Wrapper>
    )
  }
}

export default injectIntl(Landing)
