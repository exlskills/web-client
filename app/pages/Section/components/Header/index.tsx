import * as React from 'react'
import { LineNavWrapper, SectionTitle, Wrapper } from './styledComponents'
import { Button } from '@blueprintjs/core'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import messages from './messages'
import LineNavigator from 'common/components/LineNavigator'
import { Tooltip } from './styledComponents'

interface IProps {
  cards: {
    id: string
    title: string
  }[]
  sectionTitle: string
  activeCardId: string
  onCardChange: (nextId: string) => void
  toggleCardView: () => void
  onGoBack: () => void
  // onBeyondBounds direction is positive if out of beyonds forward, negative if in reverse
  onBeyondBounds: (direction: number) => void
  cardView?: boolean
}

class Header extends React.Component<IProps & InjectedIntlProps, {}> {
  handleBackCourseClick = () => {
    this.props.onGoBack()
  }

  handleOnCardChange = (nextCard: any) => {
    this.props.onCardChange(nextCard.id)
  }

  formatLabel = (title: any, index: number) => {
    return (
      <Tooltip content={title}>
        <div
          style={{
            minWidth: 45,
            paddingBottom: 32,
            marginBottom: -32,
            maxWidth: 100,
            wordWrap: 'break-word'
          }}
        >
          {title.substr(0, 22)}
        </div>
      </Tooltip>
    )
  }

  render() {
    const { cardView, cards, sectionTitle, activeCardId } = this.props
    const { formatMessage } = this.props.intl
    return (
      <Wrapper>
        {/*<Button*/}
        {/*iconName="chevron-left"*/}
        {/*text={formatMessage(messages.backCourseButton)}*/}
        {/*onClick={this.handleBackCourseClick}*/}
        {/*/>*/}
        <SectionTitle>
          {sectionTitle}
        </SectionTitle>
        {cardView &&
          <LineNavWrapper>
            <LineNavigator
              labelWidth={100}
              linePadding={50}
              items={cards}
              activeValue={{ id: activeCardId }}
              onBeyondBounds={this.props.onBeyondBounds}
              onClick={this.handleOnCardChange}
              formatLabel={this.formatLabel}
              fixWidth={true}
            />
          </LineNavWrapper>}
        {/*<Button*/}
        {/*iconName={cardView ? 'duplicate' : 'document'}*/}
        {/*// text={*/}
        {/*//   cardView*/}
        {/*//     ? formatMessage(messages.showPageViewButton)*/}
        {/*//     : formatMessage(messages.showCardViewButton)*/}
        {/*// }*/}
        {/*onClick={this.props.toggleCardView}*/}
        {/*/>*/}
      </Wrapper>
    )
  }
}

export default injectIntl<IProps>(Header)
