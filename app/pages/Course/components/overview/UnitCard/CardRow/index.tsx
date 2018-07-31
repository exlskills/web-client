import * as React from 'react'
import {
  Wrapper,
  Left,
  Title,
  ListKeyTitle,
  Headline
} from './styledComponents'
import { Icon } from 'common/components/styledComponents'

interface IProps {
  listKey?: string
  title: string
  description: string
  onClick?: () => void
  icon?: string
  right?: React.ReactChild
  bar?: React.ReactChild
  titleAccompany?: React.ReactChild
  isCenter: string
  backgroundColor?: string
  isNextStep?: boolean
  isComplete?: boolean
}

export default ({
  icon,
  listKey,
  title,
  description,
  backgroundColor,
  right,
  bar,
  titleAccompany,
  onClick,
  isComplete,
  isNextStep
}: IProps): React.ReactElement<IProps> =>
  <Wrapper
    isNextStep={isNextStep}
    isComplete={isComplete}
    backgroundColor={backgroundColor}
  >
    {listKey &&
      <ListKeyTitle onClick={onClick}>
        {listKey}
      </ListKeyTitle>}
    <Left>
      <div style={{ marginBottom: '5px' }}>
        <Title onClick={onClick} id={title}>
          {!!icon && <Icon iconName={icon} style={{ marginRight: '0.3rem' }} />}
          {title}
        </Title>
        {!!titleAccompany && titleAccompany}
      </div>
      <Headline onClick={onClick}>
        {description}
      </Headline>
      {!!bar && bar}
    </Left>
    {!!right && right}
  </Wrapper>
