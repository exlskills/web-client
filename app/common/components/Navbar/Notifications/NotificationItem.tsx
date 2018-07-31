import * as React from 'react'
import {
  NotificationItemWrapper,
  IconWrapper,
  NotifItemTitle,
  NotifContent,
  NotifDesc,
  DateWrapper
} from './styledComponents'
import { Icon } from 'common/components/styledComponents'
import * as moment from 'moment'
const UserAvatar = require('react-user-avatar')

export interface IProps {
  id: string
  title: string
  description: string
  date: string
  iconName: string
  unread?: boolean
  onClick?: () => void
}

export default ({
  title,
  date,
  iconName,
  unread,
  description,
  onClick
}: IProps) =>
  <NotificationItemWrapper
    iconName={iconName}
    unread={unread}
    onClick={onClick}
  >
    <IconWrapper>
      {/*TODO once there is a user name and avatar being sent, set this to those values instead*/}
      <UserAvatar size={36} name={title.split(' ')[0]} />
    </IconWrapper>
    <NotifContent>
      <NotifItemTitle>
        {title}
      </NotifItemTitle>
      <NotifDesc>
        {description}
      </NotifDesc>
      <DateWrapper>
        {moment(date).fromNow()}
      </DateWrapper>
    </NotifContent>
  </NotificationItemWrapper>
