/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  lbActivitiesOnDate: {
    id: 'common.componentsActivitiesCalendar.lbActivitiesOnDate',
    defaultMessage: 'Activities on {date}'
  },
  lbNumActivitiesOnDate: {
    id: 'common.componentsActivitiesCalendar.lbNumActivitiesOnDate',
    defaultMessage:
      '{number, plural, =0 {No activity} one {# activity} other {# activities}} on {date}'
  },
  txtSortByType: {
    id: 'common.componentsActivitiesCalendar.txtSortByType',
    defaultMessage: 'Sort by type'
  },
  txtSortByTime: {
    id: 'common.componentsActivitiesCalendar.txtSortByTime',
    defaultMessage: 'Sort by time'
  }
})
