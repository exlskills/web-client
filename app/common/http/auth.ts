import client from './client'
import { AUTH_URL, CLIENT_URL } from 'common/constants'

export const signUp = (email: string, password: string) =>
  client.post(`/signup`, {
    email,
    password,
    redirect: `${CLIENT_URL}/dashboard`
  })
export const signIn = (email: string, password: string) =>
  client.post(`/signin`, {
    email,
    password
  })
export const intercomUserHash = () =>
  client.post(`${AUTH_URL}/intercom-user-hash`)
export const anonymousAccess = () => client.post(`${AUTH_URL}/anonymous`)
export const jwtRefresh = () => client.get(`${AUTH_URL}/auth/jwt-refresh`)
export const getKeycloakLoginUrl = (currentUrl?: string) =>
  `${AUTH_URL}/auth/keycloak?redirect=${currentUrl
    ? currentUrl
    : `${CLIENT_URL}/dashboard`}`
export const changePassword = (oldPassword: string, newPassword: string) =>
  client.post(`/auth/pwchange`, { oldPassword, newPassword })
export const resetPasswordLink = (email: string) =>
  client.post(`/auth/pwreset`, { email })
export const verifyEmail = (verifKey: string) =>
  client.post(`/auth/emverify/${verifKey}`, {})
export const resetPassword = (verifKey: string, newPassword: string) =>
  client.post(`/auth/pwreset/${verifKey}`, { newPassword })

export const logout = () => client.post(`${AUTH_URL}/me/logout`)
