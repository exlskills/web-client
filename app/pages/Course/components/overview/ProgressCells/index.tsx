import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Wrapper, Cell, PercentText, Tooltip } from './styledComponents'
import ReactSly from 'common/components/ReactSly'

export interface ICellItem {
  id: string
  ema: number
  hoverText?: string
}

interface IProps {
  items: ICellItem[]
  activeItem?: string
  onCellClick?: (id: string, title: string) => void
  justify?: string
  width?: string
  cellSize?: number
  marginTop?: string
}
interface IStates {}

class ProgressCells extends React.PureComponent<IProps, IStates> {
  static defaultProps = {
    cellSize: 16,
    justify: 'flex-start',
    marginTop: '6px'
  }

  handleClick = (id: string, title: string) => () => {
    if (this.props.onCellClick) {
      this.props.onCellClick(id, title)
    }
  }

  getSlyOptions = () => {
    let options: any = {
      defaultScrollBar: 1,
      autoHideScrollBar: 1,
      scrollBarStyle: {
        marginBottom: '5px'
      },
      horizontal: 1,
      activateOn: 'click',
      itemNav: 'centered',
      smart: 1,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1
    }
    return options
  }

  render() {
    const { cellSize, justify, width, activeItem, marginTop } = this.props
    const items = this.props.items || []
    let slyOptions = this.getSlyOptions()
    slyOptions.startAt = items.findIndex(item => item.id == activeItem) + 1

    return (
      <Wrapper justify={justify} width={width} marginTop={marginTop}>
        <ReactSly slyOptions={slyOptions}>
          {items.map(item =>
            <Tooltip
              key={item.id}
              content={item.hoverText}
              isActive={item.id == activeItem}
            >
              <Cell
                id={item.id}
                size={cellSize}
                ema={item.ema}
                onClick={this.handleClick(item.id, item.hoverText)}
              />
            </Tooltip>
          )}
        </ReactSly>
      </Wrapper>
    )
  }
}

export default ProgressCells
