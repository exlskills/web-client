import * as React from 'react'
import {
  Item,
  ItemText,
  ItemWrapper,
  Menu,
  MenuHeader,
  CollapseItem
} from './styledComponents'

interface IProps {
  iconName: string
  text: string
  value: string
  active: boolean
  items: any
}

interface IStates {
  isOpen: boolean
}

class CollapsibleItem extends React.PureComponent<IProps, IStates> {
  constructor(props: IProps) {
    super(props)
    const { value, items, active } = props
    const activeItemIdx = items.findIndex((item: any) => item.value == value)

    this.state = {
      isOpen: !active && activeItemIdx != -1
    }
  }

  componentDidUpdate(prevProps: IProps, prevState: IStates) {
    if (this.props.value != prevProps.value) {
      const { value, items } = this.props
      const activeItemIdx = items.findIndex((item: any) => item.value == value)
      this.setState({
        isOpen: activeItemIdx != -1
      })
    }
  }

  handleClick = (e: any) => {
    if (e.target.tagName == 'SPAN') {
      this.setState({ isOpen: !this.state.isOpen })
    }
  }

  handleItemClick = (item: any) => () => {
    if (item.onClick) {
      item.onClick(item.value)
    }
  }

  render() {
    const { text, items, iconName, value, active } = this.props

    return (
      <ItemWrapper>
        <ItemText
          onClick={this.handleClick}
          iconName={iconName}
          active={active}
        >
          {text}
          <CollapseItem
            isOpen={this.state.isOpen}
            ml={iconName ? '32px' : '8px'}
          >
            {items.map((item: any, idx: number) =>
              <Item
                key={`collitem-${idx}`}
                iconName={item.iconName}
                onClick={this.handleItemClick(item)}
                active={!active && value === item.value}
              >
                {item.text}
              </Item>
            )}
          </CollapseItem>
        </ItemText>
      </ItemWrapper>
    )
  }
}

export default CollapsibleItem
