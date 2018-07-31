export const WS_USI_URL = process.env.WS_USI_URL

export enum MESSAGE_TYPES {
  error = 'error' as any,
  request = 'req' as any,
  response = 'resp' as any,
  notif = 'notif' as any
}

export enum WS_EVENTS {
  courseUserItem = 'cour.user.item' as any,
  userQuestion = 'user.ques' as any,
  userLocale = 'user.locale' as any,
  cardAction = 'card.action' as any
}
