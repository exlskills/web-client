/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header400: {
    id: 'common.pages.Error.header.400',
    defaultMessage: 'Bad Request'
  },
  header403: {
    id: 'common.pages.Error.header.403',
    defaultMessage: 'Authorization Problem'
  },
  header404: {
    id: 'common.pages.Error.header.404',
    defaultMessage: 'Oh no'
  },
  header500: {
    id: 'common.pages.Error.header.500',
    defaultMessage: 'Server Error'
  },
  description400: {
    id: 'common.pages.Error.description.400',
    defaultMessage:
      'The request could not be understood by the server due to malformed syntax.\nThe client SHOULD NOT repeat the request without modification.'
  },
  description403: {
    id: 'common.pages.Error.description.403',
    defaultMessage:
      'We are expecting some authorization issues with your user or the system.'
  },
  description404: {
    id: 'common.pages.Error.description.404',
    defaultMessage: 'The page you are looking for could not be found!'
  },
  description500: {
    id: 'common.pages.Error.description.500',
    defaultMessage:
      'Unexpected condition was encountered. The server is incapable of performing the request.'
  },
  backToDashboard: {
    id: 'common.pages.Error.backToDashboard',
    defaultMessage: 'Go Back to the Dashboard?'
  }
})
