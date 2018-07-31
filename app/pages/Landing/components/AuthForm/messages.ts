import { defineMessages } from 'react-intl'

export default defineMessages({
  login: {
    id: 'pages.Landing.login',
    defaultMessage: 'Login'
  },
  register: {
    id: 'pages.Landing.register',
    defaultMessage: 'Register'
  },
  unknownError: {
    id: 'pages.Landing.unknownError',
    defaultMessage: 'Sorry, something went wrong. Please try again later.'
  },
  txtEmailTaken: {
    id: 'pages.Landing.txtEmailTaken',
    defaultMessage: 'The email address is already taken'
  },
  txtValidationFailed: {
    id: 'pages.Landing.txtValidationFailed',
    defaultMessage: 'Validation failed'
  },
  txtEmptyEmailPassword: {
    id: 'pages.Landing.txtEmptyEmailPassword',
    defaultMessage: 'Please enter email and password'
  },
  txtInvalidSignIn: {
    id: 'pages.Landing.txtInvalidSignIn',
    defaultMessage: 'Invalid email or password'
  },
  txtNotVerified: {
    id: 'pages.Landing.txtNotVerified',
    defaultMessage: 'Account is not verified. Please check your email.'
  },
  txtSignUpSucceed: {
    id: 'pages.Landing.txtSignUpSucceed',
    defaultMessage: 'Account created. Please check your email for verification.'
  },
  loginGoogleButton: {
    id: 'pages.Landing.loginGoogleButton',
    defaultMessage: 'Google'
  },
  loginGithubButton: {
    id: 'pages.Landing.loginGithubButton',
    defaultMessage: 'Github'
  }
})
