import * as React from 'react'
let onClickOutside = require('react-onclickoutside').default

function selectionExists() {
  const selection = window.getSelection()
  return (
    selection &&
    selection.rangeCount > 0 &&
    selection.getRangeAt(0) &&
    !selection.getRangeAt(0).collapsed &&
    selection.getRangeAt(0).getBoundingClientRect().width > 0 &&
    selection.getRangeAt(0).getBoundingClientRect().height > 0
  )
}

function getSelectionText() {
  let text = ''
  const selection = (document as any).selection
  if (window.getSelection) {
    text = window.getSelection().toString()
  } else if (selection && selection.type != 'Control') {
    text = selection.createRange().text
  }
  return text
}

function clearSelection() {
  const selection = (document as any).selection
  if (window.getSelection) {
    window.getSelection().removeAllRanges()
  } else if (selection) {
    selection.empty()
  }
}

interface IProps {
  selectableId: string
  style?: any
  topOffset?: number
  onDeselect: () => void
  onSelect: (text: string) => void
  showPopover?: boolean
}

interface IStates {
  popoverBox: {
    top: number
    left: number
  }
}

class SelectionPopover extends React.PureComponent<IProps, IStates> {
  private selectionPopover: HTMLElement

  static defaultProps: Partial<IProps> = {
    topOffset: 40
  }
  constructor(props: IProps) {
    super(props)
    this.state = {
      popoverBox: {
        top: 0,
        left: 0
      }
    }
  }

  handleClickOutside = (evt: any) => {
    if (this.props.showPopover) {
      clearSelection()
      this.props.onDeselect()
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.showPopover === true && nextProps.showPopover === false) {
      clearSelection()
    }
  }

  componentDidMount() {
    const target = document.querySelector(this.getQuerySelector())
    target.addEventListener('mouseup', this._handleMouseUp)
  }

  componentWillUnmount() {
    const target = document.querySelector(this.getQuerySelector())
    target.removeEventListener('mouseup', this._handleMouseUp)
  }

  getQuerySelector() {
    return `[data-selectable="${this.props.selectableId}"]`
  }

  addPopoverRef = (elem: any) => {
    this.selectionPopover = elem
  }

  render() {
    const {
      onDeselect,
      onSelect,
      children,
      style,
      topOffset,
      showPopover,
      selectableId,
      ...otherProps
    } = this.props // eslint-disable-line no-unused-vars
    const { popoverBox: { top, left } } = this.state

    const visibility = showPopover ? 'visible' : 'hidden'
    const display = showPopover ? 'inline-block' : 'none'

    return (
      <div
        ref={this.addPopoverRef}
        style={{
          visibility,
          display,
          position: 'absolute',
          top,
          left,
          ...style
        }}
      >
        {children}
      </div>
    )
  }

  _handleMouseUp = () => {
    const text = getSelectionText().trim()
    if (selectionExists() && text) {
      this.props.onSelect(text)
      return this.computePopoverBox()
    }

    this.props.onDeselect()
  }

  computePopoverBox = () => {
    const selection = window.getSelection()
    if (!selectionExists()) {
      return
    }
    const selectionBox = selection.getRangeAt(0).getBoundingClientRect()
    const popoverBox = this.selectionPopover.getBoundingClientRect()
    const targetBox = document
      .querySelector(this.getQuerySelector())
      .getBoundingClientRect()
    this.setState({
      popoverBox: {
        top: selectionBox.top - targetBox.top - this.props.topOffset,
        left:
          selectionBox.width / 2 -
          popoverBox.width / 2 +
          (selectionBox.left - targetBox.left)
      }
    })
  }
}

export default onClickOutside(SelectionPopover)
