import { Classes, MenuItem } from '@blueprintjs/core'
import {
  IMultiSelectProps,
  IMultiSelectState,
  MultiSelect
} from '@blueprintjs/select'
import FormGroup from 'common/components/forms/inputs/FormGroup'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import messages from './messages'
import { SearchButton, SearchWrapper } from './styledComponents'

export interface SearchItem {
  value: string
  text: string
  label?: string
}

interface IProps {
  items?: SearchItem[]
  selectedItems?: SearchItem[]
  itemRenderer?: (
    itemProps: IMultiSelectProps<SearchItem>,
    data: { isSelected: boolean }
  ) => JSX.Element
  onItemSelect?: (item: SearchItem) => void
  onItemRemove?: (item: SearchItem) => void
  buttonText?: string
  buttonWidth?: string // TODO
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  inline?: boolean
  label?: string
  error?: string
  popoverMinimal?: boolean
  placeholder?: string
}

interface IStates {}

const SearchSelect = MultiSelect.ofType<SearchItem>()

class SearchBar extends React.Component<IProps & InjectedIntlProps, IStates> {
  static defaultProps: Partial<IProps> = {
    items: [],
    selectedItems: [],
    popoverMinimal: true
  }

  handleItemSelect = (item: SearchItem) => {
    if (!this.isItemSelected(item)) {
      this.props.onItemSelect(item)
    } else {
      this.props.onItemRemove(item)
    }
  }

  handleTagRemove = (_tag: string, index: number) => {
    this.props.onItemRemove(this.props.selectedItems[index])
  }

  getSelectedItemIndex(item: SearchItem) {
    return this.props.selectedItems.indexOf(item)
  }

  isItemSelected(item: SearchItem) {
    return this.getSelectedItemIndex(item) !== -1
  }

  filterItem(query: string, item: SearchItem, index: number) {
    const label = item.label ? item.label.toLowerCase() : ''
    return (
      `${item.text.toLowerCase()} ${label}`.indexOf(query.toLowerCase()) >= 0
    )
  }

  /*
  renderItem = (selectItem: SearchItem) => {
    const { handleClick, isActive, item } = selectItem
    const isSelected = this.isItemSelected(item)

    if (this.props.itemRenderer) {
      return this.props.itemRenderer(selectItem, { isSelected })
    }

    return (
      <MenuItem
        className={`${isActive ? 'pt-active pt-intent-primary' : ''}`}
        icon={this.isItemSelected(item) ? 'tick' : 'blank'}
        key={item.value}
        label={item.label}
        onClick={handleClick}
        text={item.text}
        shouldDismissPopover={false}
      />
    )
  }
  */

  renderTag = (item: SearchItem) => {
    return item.text
  }

  renderMultiSelect() {
    const { items, selectedItems, popoverMinimal, buttonText } = this.props
    const { formatMessage } = this.props.intl

    return <SearchWrapper hasButton={!!buttonText} />
  }

  renderButton() {
    const { buttonText, buttonWidth, onButtonClick } = this.props
    if (!buttonText) {
      return null
    }

    return <SearchButton text={buttonText} onClick={onButtonClick} />
  }

  render() {
    const { label, error, inline } = this.props

    if (!label) {
      return this.renderMultiSelect()
    }

    return (
      <FormGroup error={error} inline={inline} label={label}>
        {this.renderMultiSelect()}
        {this.renderButton()}
      </FormGroup>
    )
  }
}

export default injectIntl<IProps & InjectedIntlProps>(SearchBar)
