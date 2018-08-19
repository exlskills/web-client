import * as React from 'react'

import {
  BulletDot,
  LeftArrow,
  MoreIcon,
  RightArrow,
  Wrapper
} from './styledComponents'

interface IProps {
  list: string[]
  activeValue: string
  onClick: (value: string) => void
  numBullets?: number
  cursorBased?: boolean
  useIndex?: boolean
  cardList: string[]
}

class BulletNavigator extends React.PureComponent<IProps, {}> {
  static defaultProps: Partial<IProps> = {
    numBullets: 10
  }

  isFirstDotActive() {
    const { activeValue, list } = this.props
    return activeValue == list[0]
  }

  isLastDotActive() {
    const { activeValue, list } = this.props
    return activeValue == list[list.length - 1]
  }

  handleClick = (e: any) => {
    // TODO: which HTML type that support dataset?
    const { activeValue, list, cursorBased, useIndex } = this.props
    let val = e.target.dataset.id

    if (val == 'prev') {
      if (this.isFirstDotActive()) {
        return
      }
      if (useIndex) {
        val = list[list.indexOf(activeValue) - 1]
      } else {
        val = `prev${list[list.indexOf(activeValue)]}`
      }
    } else if (val == 'next') {
      if (this.isLastDotActive()) {
        return
      }
      if (useIndex) {
        val = list[list.indexOf(activeValue) + 1]
      } else {
        val = `next${list[list.indexOf(activeValue)]}`
      }
    } else if (cursorBased) {
      val = list[list.indexOf(val) - 1]
    }

    this.props.onClick(val)
  }

  getVisibleBulletsList() {
    const { list, activeValue, numBullets } = this.props
    const activeIndex = list.indexOf(activeValue)

    const currentOffset = Math.floor(activeIndex / numBullets) * numBullets
    const visiblelist = list.slice(currentOffset, currentOffset + numBullets)
    const hasPrevious = currentOffset > 0
    const hasNext = list.length > currentOffset + numBullets

    return { hasPrevious, visiblelist, hasNext }
  }

  render() {
    const { activeValue } = this.props
    const { hasPrevious, visiblelist, hasNext } = this.getVisibleBulletsList()

    return (
      <Wrapper>
        <LeftArrow
          data-id="prev"
          onClick={this.handleClick}
          disabled={this.isFirstDotActive()}
        />
        {hasPrevious && <MoreIcon iconName={'more'} />}
        {visiblelist.map((val, i) =>
          <BulletDot
            className="bullet-li"
            key={val}
            id={this.props.cardList[i]}
            data-id={val}
            active={val == activeValue}
            onClick={this.handleClick}
          />
        )}
        {hasNext && <MoreIcon iconName={'more'} />}
        <RightArrow
          data-id="next"
          onClick={this.handleClick}
          disabled={this.isLastDotActive()}
        />
      </Wrapper>
    )
  }
}

export default BulletNavigator
