import * as React from 'react'
import {
  Wrapper,
  Left,
  Title,
  ListKeyTitle,
  Headline
} from './styledComponents'
import { Icon } from 'common/components/styledComponents'
import PlainLink from 'common/components/PlainLink'

interface IProps {
  listKey?: string
  title: string
  description: string
  icon?: string
  right?: React.ReactChild
  bar?: React.ReactChild
  titleAccompany?: React.ReactChild
  isCenter: string
  backgroundColor?: string
  isNextStep?: boolean
  isComplete?: boolean
  onClickUrl?: string
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
  onClickUrl,
  isComplete,
  isNextStep
}: IProps): React.ReactElement<IProps> =>
  <Wrapper
    isNextStep={isNextStep}
    isComplete={isComplete}
    backgroundColor={backgroundColor}
  >
    {onClickUrl
      ? listKey &&
        <PlainLink to={onClickUrl}>
          <ListKeyTitle>
            {listKey}
          </ListKeyTitle>
        </PlainLink>
      : <ListKeyTitle>
          {listKey}
        </ListKeyTitle>}

    <Left>
      {onClickUrl
        ? listKey &&
          <PlainLink to={onClickUrl}>
            <div style={{ marginBottom: '5px' }}>
              <Title id={title}>
                {!!icon &&
                  <Icon iconName={icon} style={{ marginRight: '0.3rem' }} />}
                {title}
              </Title>
              {!!titleAccompany && titleAccompany}
            </div>
            <Headline>
              {description}
            </Headline>
          </PlainLink>
        : <div>
            <div style={{ marginBottom: '5px' }}>
              <Title id={title}>
                {!!icon &&
                  <Icon iconName={icon} style={{ marginRight: '0.3rem' }} />}
                {title}
              </Title>
              {!!titleAccompany && titleAccompany}
            </div>
            <Headline>
              {description}
            </Headline>
          </div>}
      {!!bar && bar}
    </Left>
    {!!right && right}
  </Wrapper>
