import client from './client'
import { AUTH_URL, CLIENT_URL } from 'common/constants'

export const getCredits = () => client.get(`${AUTH_URL}/me/credits`)
export const purchaseCredits = (purchaseN: number) =>
  client.post(`${AUTH_URL}/me/credits/purchase?purchaseN=${purchaseN}`)
export const isEnrolled = () => client.get(`${AUTH_URL}/me/credits/membership`)
export const enroll = (stripeToken: any) =>
  client.post(`/me/credits/enroll`, { stripeToken })
export const unenroll = () => client.post(`${AUTH_URL}/me/credits/unenroll`)
