import { cancel, take, fork, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { authorizeSignInSaga, logoutSaga, signUpSaga } from './auth'
import * as actions from '../actions'
import { showToasts } from './ui'

function* loginFlow() {
  while (true) {
    const { payload: { email, password } } = yield take(
      actions.signIn.started.type
    )
    const signinTask = yield fork(authorizeSignInSaga, email, password)

    const { type } = yield take([
      actions.logout.type,
      actions.signIn.failed.type
    ])
    // Avoid concurrent tasks
    if (type === actions.logout.type) {
      yield cancel(signinTask)
    }
  }
}

function* watchLogout() {
  while (true) {
    yield take(actions.logout.type)
    yield call(logoutSaga)
  }
}

function* watchSignUp() {
  while (true) {
    const { payload: { email, password } } = yield take(
      actions.signUp.started.type
    )
    yield call(signUpSaga, email, password)
  }
}

function* watchToasts() {
  yield takeEvery(actions.addToast.type, showToasts)
}

export default [loginFlow, watchSignUp, watchLogout, watchToasts]
