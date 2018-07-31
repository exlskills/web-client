import { Intent, Tab2, Tabs2, Toaster, Position } from '@blueprintjs/core'
import { signIn, signUp } from 'common/http/auth'
import GithubIcon from 'pages/Landing/components/icons/Github'
import GoogleIcon from 'pages/Landing/components/icons/Google'
import SignIn from 'pages/Landing/components/SignIn'
import SignUp from 'pages/Landing/components/SignUp'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { RouteComponentProps, withRouter } from 'react-router'
import { setViewer } from 'common/utils/viewer'

import messages from './messages'
import {
  Divider,
  GithubButton,
  GoogleButton,
  SocialButtons,
  Wrapper
} from './styledComponents'

const LOGIN_TAB_ID = 'login-tab'
const REGISTER_TAB_ID = 'register-tab'

const AuthToaster = Toaster.create({ position: Position.TOP_RIGHT })

interface IProps {}
type MergedProps = IProps & InjectedIntlProps & RouteComponentProps<any>

interface IStates {
  isLoading: boolean
  selectedTab: string
}

class AuthForm extends React.Component<MergedProps, IStates> {
  state = {
    isLoading: false,
    selectedTab: LOGIN_TAB_ID
  }

  handleSignIn = (form: any) => {
    const { email, password } = form.data
    const { formatMessage } = this.props.intl
    console.log(email, password)

    this.setState({ isLoading: true })

    signIn(email, password)
      .then(response => {
        this.setState({ isLoading: false })
        if (response.data && response.data.status == 'OK') {
          setViewer(response.data.user)
          this.props.history.push('/dashboard')
        }
      })
      .catch(error => {
        console.debug(error.response)
        let errorMsg = formatMessage(messages.unknownError)
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errCode = error.response.data.error
          if (errCode == 'MISSING') {
            errorMsg = formatMessage(messages.txtEmptyEmailPassword)
          } else if (errCode == 'INVALID') {
            errorMsg = formatMessage(messages.txtInvalidSignIn)
          } else if (errCode == 'NOTVERIFIED') {
            errorMsg = formatMessage(messages.txtNotVerified)
          } else {
            errorMsg = errCode
          }
        }

        AuthToaster.show({ message: errorMsg, intent: Intent.DANGER })
        this.setState({ isLoading: false })
      })
  }

  handleSignInGoogle = () => {
    // window.location.href = getGoogleSignInUrl()
  }

  handleSignInGithub = () => {
    // window.location.href = getGithubSignInUrl()
  }

  handleSignUp = (form: any) => {
    const { email, password } = form.data
    const { formatMessage } = this.props.intl

    this.setState({ isLoading: true })

    signUp(email, password)
      .then(response => {
        console.log(response)
        this.setState({ isLoading: false })
        if (response.data) {
          if (response.data.status == 'OK') {
            AuthToaster.show({
              message: formatMessage(messages.txtSignUpSucceed),
              intent: Intent.SUCCESS
            })
          } else if (response.data.status == 'VERIFIED') {
            setViewer(response.data.user)
            this.props.history.push('/dashboard')
          }
        }
      })
      .catch(error => {
        console.debug(error.response)
        let errorMsg = formatMessage(messages.unknownError)
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errCode = error.response.data.error
          if (errCode == 'MISSING') {
            errorMsg = formatMessage(messages.txtEmptyEmailPassword)
          } else if (errCode == 'EXISTED') {
            errorMsg = formatMessage(messages.txtEmailTaken)
          } else if (errCode == 'VALIDATE') {
            errorMsg = formatMessage(messages.txtValidationFailed)
          } else {
            errorMsg = errCode
          }
        }

        AuthToaster.show({ message: errorMsg, intent: Intent.DANGER })
        this.setState({ isLoading: false })
      })
  }

  handleTabChange = (tabId: string) => {
    this.setState({
      selectedTab: tabId
    })
  }

  changeTab = (tabId: string) => () => {
    this.setState({
      selectedTab: tabId
    })
  }

  render() {
    const { isLoading, selectedTab } = this.state
    const { formatMessage } = this.props.intl

    return (
      <Wrapper>
        <Tabs2
          id="login-register-tabs"
          selectedTabId={selectedTab}
          onChange={this.handleTabChange}
        >
          <Tab2
            id={LOGIN_TAB_ID}
            title={formatMessage(messages.login)}
            panel={
              <SignIn onSubmit={this.handleSignIn} isLoading={isLoading} />
            }
          />
          <Tab2
            id={REGISTER_TAB_ID}
            title={formatMessage(messages.register)}
            panel={
              <SignUp
                onSubmit={this.handleSignUp}
                isLoading={isLoading}
                onAlreadyRegisteredClick={this.changeTab(LOGIN_TAB_ID)}
              />
            }
          />
        </Tabs2>
        <Divider />
        <SocialButtons>
          <GoogleButton disabled={isLoading} onClick={this.handleSignInGoogle}>
            <GoogleIcon color="#fff" size="20" />
            {formatMessage(messages.loginGoogleButton)}
          </GoogleButton>
          <GithubButton disabled={isLoading} onClick={this.handleSignInGithub}>
            <GithubIcon color="#fff" size="18" />
            {formatMessage(messages.loginGithubButton)}
          </GithubButton>
        </SocialButtons>
      </Wrapper>
    )
  }
}

export default injectIntl<IProps>(withRouter(AuthForm))
