import * as React from 'react'
const HorizontalTimeline = require('react-horizontal-timeline').default
import { LineWrapper } from './styledComponents'
import * as moment from 'moment'
interface IProps {
  items: any
  activeValue: any
  onClick: (activeValue: any) => void
  hasSubmit?: boolean
  cursorBased?: boolean
  labelWidth?: number
  linePadding?: number
  formatLabel?: (item: any, index: number) => any
  fixWidth?: boolean
}

interface IStates {
  previous: number
  minEventPadding: number
  maxEventPadding: number
  linePadding: number
  labelWidth: number
  fillingMotionStiffness: number
  fillingMotionDamping: number
  slidingMotionStiffness: number
  slidingMotionDamping: number
  stylesBackground: string
  stylesForeground: string
  stylesOutline: string
  isTouchEnabled: boolean
  isKeyboardEnabled: boolean
  isOpenEnding: boolean
  isOpenBeginning: boolean
}
class LineNavigator extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props)
    this.state = {
      previous: 0,
      minEventPadding: 0,
      maxEventPadding: 0,
      linePadding: this.props.linePadding || 50,
      labelWidth: this.props.labelWidth || 50,
      fillingMotionStiffness: 150,
      fillingMotionDamping: 25,
      slidingMotionStiffness: 150,
      slidingMotionDamping: 25,
      stylesBackground: '#f8f8f8',
      stylesForeground: '#3671b6',
      stylesOutline: '#dfdfdf',
      isTouchEnabled: true,
      isKeyboardEnabled: true,
      isOpenEnding: true,
      isOpenBeginning: true
    }
  }

  handleClickIndex = (index: any) => {
    if (this.props.cursorBased) {
      index = index - 1
    }
    this.props.onClick(this.props.items[index])
  }

  formatLabel = (title: any, index: number) => {
    if (this.props.formatLabel) {
      return this.props.formatLabel(title, index)
    } else {
      return index
    }
  }

  render() {
    const state = this.state
    let select = this.props.items.findIndex(
      (x: any) => x.id == this.props.activeValue.id
    )
    let maxWidth = this.props.fixWidth
      ? this.state.labelWidth * this.props.items.length +
        2 * this.state.linePadding +
        20
      : 'auto'
    return (
      <LineWrapper style={{ width: '100%' }}>
        <div
          style={{
            width: '70%',
            height: '80px',
            margin: '0 auto',
            maxWidth: maxWidth
          }}
        >
          <HorizontalTimeline
            getLabel={this.formatLabel}
            fillingMotion={{
              stiffness: state.fillingMotionStiffness,
              damping: state.fillingMotionDamping
            }}
            index={select}
            indexClick={this.handleClickIndex}
            isKeyboardEnabled={state.isKeyboardEnabled}
            isTouchEnabled={state.isTouchEnabled}
            labelWidth={state.labelWidth}
            linePadding={state.linePadding}
            maxEventPadding={state.maxEventPadding}
            minEventPadding={state.minEventPadding}
            slidingMotion={{
              stiffness: state.slidingMotionStiffness,
              damping: state.slidingMotionDamping
            }}
            styles={{
              background: state.stylesBackground,
              foreground: state.stylesForeground,
              outline: state.stylesOutline
            }}
            values={this.props.items}
            isOpenEnding={state.isOpenEnding}
            isOpenBeginning={state.isOpenBeginning}
          />
        </div>
      </LineWrapper>
    )
  }
}

export default LineNavigator
