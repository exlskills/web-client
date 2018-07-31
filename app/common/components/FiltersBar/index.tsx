import * as React from 'react'

import SearchInput from 'common/components/forms/inputs/Search'
import { Filter, FilterBox, MainLabel, Wrapper } from './styledComponents'

interface IProps {
  filters: {
    options: {
      name: string
      value: string
      selected?: boolean
    }[]
    onChange: (newValue: string, oldValue: string) => void
    width?: number | string | (number | string)[]
    defaultValue?: string
  }[]
  label?: string
  justify?: string
  groupStyle?: any
  search?: {
    placeholder?: string
    display?: boolean
    defaultValue?: string
    onSearchSubmit?: any
  }
}

interface IStates {
  values: string[]
}

class FiltersBar extends React.PureComponent<IProps, IStates> {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props: any) {
    super(props)
    this.state = {
      values: this.props.filters.map(filter => filter.defaultValue)
    }
  }

  handleFilterChange = (idx: number) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = [...this.state.values]
    this.props.filters[idx].onChange(e.target.value, values[idx])
    values[idx] = e.target.value
    this.setState({ values })
  }

  render() {
    const { justify } = this.props

    return (
      <Wrapper justify={justify}>
        {this.props.search &&
          <SearchInput
            groupStyle={this.props.groupStyle}
            placeholder={this.props.search.placeholder}
            defaultValue={this.props.search.defaultValue}
            onSearchSubmit={this.props.search.onSearchSubmit}
          />}
        {this.props.label &&
          <MainLabel>
            {this.props.label}:
          </MainLabel>}
        {this.props.filters.map((filter, idx) =>
          <FilterBox key={idx} width={filter.width ? filter.width : [1, 1 / 3]}>
            <Filter>
              <select
                value={this.state.values[idx]}
                onChange={this.handleFilterChange(idx)}
              >
                {filter.options.map((option, oIdx) =>
                  <option key={oIdx} value={option.value}>
                    {option.name}
                  </option>
                )}
              </select>
            </Filter>
          </FilterBox>
        )}
      </Wrapper>
    )
  }
}

export default FiltersBar
