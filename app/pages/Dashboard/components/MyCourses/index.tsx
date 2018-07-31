import * as React from 'react'
import { Wrapper } from './styledComponents'
import {
  default as Card,
  IProps as CardProps
} from '../../../../common/components/Card'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { MyCourseCardWrapper } from './MyCourseCardWrapper'

interface IProps {
  items: CardProps[]
  viewAll: () => void
  viewAllMsg: string
  height?: number
}

type MergedProps = IProps & InjectedIntlProps

interface IStates {}

class MyCoursesComponent extends React.PureComponent<MergedProps, IStates> {
  render() {
    const { items, height } = this.props

    return (
      <Wrapper style={{ height: height ? height : 'unset' }}>
        {items &&
          items.map((i, key) => {
            return <MyCourseCardWrapper key={key} item={i} />
          })}
        <br />
        <a style={{ marginTop: '10px' }} onClick={this.props.viewAll}>
          {this.props.viewAllMsg}
        </a>
      </Wrapper>
    )
  }
}

// I have no idea why I have to do this... None of the other export methods that I tried worked (compiler errors)
let MyCourses = injectIntl(MyCoursesComponent)
export { MyCourses }
