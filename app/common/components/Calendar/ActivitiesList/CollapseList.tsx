import { Button, Collapse } from '@blueprintjs/core'
import * as React from 'react'
import { List, Listitem } from './styledComponents'
import { Icon } from 'common/components/styledComponents'

import {
  ContentWrapper,
  EventBody,
  EventBodyItem,
  EventBodyList,
  EventIcon,
  EventTime,
  EventTitle,
  EventWrapper
} from './styledComponents'
import * as moment from 'moment'
interface IProps {
  groupText: string
  onClick: (item: any) => void
  itemslist: {
    id: string
    content: string
    date: string
    activity_link: string
  }[]
}

interface IStates {
  showisOpen: boolean
}

class CollapseList extends React.PureComponent<IProps, any> {
  state = {
    isOpen: true
  }

  private handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { groupText, itemslist } = this.props
    const iconName = this.state.isOpen ? 'collapse-all' : 'expand-all'
    return (
      <div>
        <Button
          className={'pt-minimal'}
          style={{ fontWeight: 'bold' }}
          onClick={this.handleClick}
        >
          {groupText}
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <List>
            {itemslist.map(item =>
              <Listitem
                className={'pt-text-muted'}
                onClick={() => this.props.onClick(item)}
                key={`listbytype_${item.id}`}
              >
                <div style={{ cursor: 'pointer', display: 'inline-block' }}>
                  {item.content}
                </div>
                <span style={{ float: 'right' }}>
                  {moment(item.date).fromNow()}
                </span>
              </Listitem>
            )}
          </List>
        </Collapse>
      </div>
    )
  }
}

export default CollapseList
