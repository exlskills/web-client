import * as _ from 'lodash'

const _emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateEmail = (email: string) => {
  if (_emailRegex.test(email) || email.length === 0) {
    return null
  }
  return 'emailInvalid'
}

export const validatePassword = (password: string) => {
  const length = password.length
  if (length === 0 || (length > 7 && length < 255)) {
    return null
  }
  return 'passwordLength'
}

export const validateUsername = (username: string) => {
  if (username.length < 1 || username.length > 250) {
    return 'usernameLengthInvalid'
  } else if (/[^\x61-\x7A]+/.test(username)) {
    return 'usernameInvalid'
  }
  return null
}

const FORM_DEBOUNCE_TIME = 600

export const debounceHandler = (handler: (e: any) => void) => {
  const debounced = _.debounce(handler, FORM_DEBOUNCE_TIME)
  return (e: any) => {
    if (typeof e !== 'undefined') {
      e.persist()
      return debounced(e)
    }
    return handler(e)
  }
}

export const resetForm = (id: string) => {
  ;(<HTMLFormElement>document.getElementById(id)).reset()
}
