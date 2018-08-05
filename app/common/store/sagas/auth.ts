import { put, call, select } from 'redux-saga/effects'
import * as Cookie from 'js-cookie'
import { signUp, signIn, logout } from 'common/http/auth'
import { push } from 'react-router-redux'
import * as actions from '../actions'
import { COOKIES, THEMES } from '../../constants'
import { selectAuthLevel } from 'common/store/selectors'
import { Intent } from '@blueprintjs/core'

export function* authorizeSignInSaga(email: string, password: string) {
  try {
    yield call(signIn, email, password)
    yield put(push('/dashboard'))
  } catch (err) {
    yield put(
      actions.addToast({
        message: 'Error signing in, please try again.',
        intent: Intent.DANGER
      })
    )
  }
}

export function* logoutSaga() {
  try {
    const authLevel = yield select(selectAuthLevel())
    if (authLevel > 0) {
      yield call(logout)
      Cookie.remove(COOKIES.userDataToken)
      Cookie.remove(COOKIES.courseLocale)
      Cookie.remove(COOKIES.locale)
      window.location.href = `/${window.location.pathname.split('/')[1]}`
    }
  } catch (err) {
    console.log(err)
  }
}

export function* signUpSaga(email: string, password: string) {
  try {
    yield call(signUp, email, password)
    yield put(
      actions.addToast({
        message: 'Verification email sent. Please check your email',
        intent: Intent.SUCCESS
      })
    )
  } catch (err) {
    yield put(
      actions.addToast({
        message: 'Error signing up, please try again.',
        intent: Intent.DANGER
      })
    )
  }
}
