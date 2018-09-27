import * as React from 'react'
import { Wrapper } from './styledComponents'
import {
  default as Card,
  IProps as CardProps
} from '../../../../common/components/Card'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { MyCourseCardWrapper } from './MyCourseCardWrapper'
import { Link } from 'react-router-dom'

interface IProps {
  items: CardProps[]
  viewAllUrl: string
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
        <Link style={{ marginTop: '10px' }} to={this.props.viewAllUrl}>
          {this.props.viewAllMsg}
        </Link>
      </Wrapper>
    )
  }
}

// I have no idea why I have to do this... None of the other export methods that I tried worked (compiler errors)
let MyCourses = injectIntl(MyCoursesComponent)
export { MyCourses }
