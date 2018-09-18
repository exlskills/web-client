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
    defaultMessage: 'Forbidden'
  },
  header404: {
    id: 'common.pages.Error.header.404',
    defaultMessage: 'Oh no'
  },
  header500: {
    id: 'common.pages.Error.header.500',
    defaultMessage: 'Server Error'
  },
  headerUnknown: {
    id: 'common.pages.Error.header.unknown',
    defaultMessage: 'Error'
  },
  description400: {
    id: 'common.pages.Error.description.400',
    defaultMessage:
      'The server had trouble understanding your request. Please double check your request and try again in a few moments.'
  },
  description403: {
    id: 'common.pages.Error.description.403',
    defaultMessage:
      "You're not allowed to access that page. If you believe that you should have access to this page, double check sure that you're logged in."
  },
  description404: {
    id: 'common.pages.Error.description.404',
    defaultMessage:
      'The page you were looking for could not be found. Please check your URL and try again.'
  },
  description500: {
    id: 'common.pages.Error.description.500',
    defaultMessage:
      'There was an error processing your request. Please try again in a few moments.'
  },
  descriptionUnknown: {
    id: 'common.pages.Error.description.unknown',
    defaultMessage:
      'An unknown error occurred. Please try again in a few moments.'
  },
  backToDashboard: {
    id: 'common.pages.Error.backToDashboard',
    defaultMessage: 'Go Back to the Dashboard?'
  }
}) as { [key: string]: any }
