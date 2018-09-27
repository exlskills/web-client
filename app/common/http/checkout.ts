import client from './client'
import { AUTH_URL } from 'common/constants'
import { ICheckoutItem } from '../store/reducer'

export const purchaseItem = (item: ICheckoutItem) =>
  client.post(`${AUTH_URL}/purchase`, { item })
