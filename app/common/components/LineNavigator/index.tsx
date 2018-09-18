import * as React from 'react'
import { BackArrow, Dot, DotNav, DotsList, NextArrow } from './styledComponents'

interface IProps {
  items: any
  activeValue: any
  onClick: (activeValue: any) => void
  // onBeyondBounds direction is positive if out of beyonds forward, negative if in reverse
  onBeyondBounds?: (direction: number) => void
  ignoreLinearProgress?: boolean
  hasSubmit?: boolean
  labelWidth?: number
  linePadding?: number
  formatLabel?: (item: any, index: number) => any
  fixWidth?: boolean
}

interface IStates {
  previous: number
}

class LineNavigator extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props)
    this.state = {
      previous: 0
    }
  }

  handleClickIndex = (index: any) => {
    this.props.onClick(this.props.items[index])
  }

  formatLabel = (title: any, index: number) => {
    if (this.props.formatLabel) {
      return this.props.formatLabel(title, index)
    } else {
      return index
    }
  }

  getCurrentIndex = () => {
    return this.props.items.findIndex(
      (x: any) => x.id == this.props.activeValue.id
    )
  }

  onIncrementPos = (n: number) => () => {
    let idx = this.getCurrentIndex() + n
    if (idx < 0) {
      if (this.props.onBeyondBounds) {
        this.props.onBeyondBounds(-1)
        return
      }
      idx = 0
    } else if (idx > this.props.items.length - 1) {
      if (this.props.onBeyondBounds) {
        this.props.onBeyondBounds(1)
        return
      }
      idx = this.props.items.length - 1
    }
    this.handleClickIndex(idx)
  }

  render() {
    return (
      <div>
        <DotNav>
          <BackArrow onClick={this.onIncrementPos(-1)} />
          <DotsList>
            {this.props.items.map((item: any, idx: number) => {
              return (
                <Dot
                  style={{}}
                  shaded={
                    !this.props.ignoreLinearProgress &&
                    idx <= this.getCurrentIndex()
                  }
                  selected={idx === this.getCurrentIndex()}
                  key={idx}
                  onClick={() => this.handleClickIndex(idx)}
                />
              )
            })}
          </DotsList>
          <NextArrow onClick={this.onIncrementPos(1)} />
        </DotNav>
      </div>
    )
  }
}

export default LineNavigator
