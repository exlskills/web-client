import * as React from 'react'

import {
  CardHeader,
  UnitTitle,
  Wrapper,
  CardInnerContent
} from './styledComponents'

import { SchemaType, fromUrlId } from 'common/utils/urlid'
import { IFreactalProps } from '../../../index'
import { RouteComponentProps, withRouter } from 'react-router'
import { injectState } from 'freactal'
import commit from '../mutations/UpdateUserCourseRoleMutation'
import messages from './messages'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import { Switch } from '@blueprintjs/core'

interface IProps {
  defaultOpen?: boolean
  courseId: string
  userId: string
  enrolled: boolean
}

interface IState {
  open: boolean
  isCenter: string
  enrolled: boolean
  enrollDisabled: boolean
}

class StatusCardDump extends React.Component<
  IProps & IFreactalProps & InjectedIntlProps & RouteComponentProps<any>,
  IState
> {
  static defaultProps = {
    defaultOpen: false
  }

  state = {
    open: this.props.defaultOpen,
    isCenter: '',
    enrolled: false,
    enrollDisabled: false
  }
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  toggleEnrollment = (event: any) => {
    const updatedStatus = !this.state.enrolled
    this.setState({ enrollDisabled: true })
    commit(this.props.userId, this.props.courseId, updatedStatus).then(() => {
      this.setState({ enrolled: updatedStatus, enrollDisabled: false })
    })
  }

  componentDidMount = () => {
    this.setState({ enrolled: this.props.enrolled })
  }

  toggleOpen = () => {
    if (!this.state.open) {
      const courseId = fromUrlId(
        SchemaType.Course,
        this.props.match.params.courseId
      )
    }

    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { formatMessage } = this.props.intl
    let { open, enrolled, enrollDisabled } = this.state

    return (
      <Wrapper index={0}>
        <CardHeader border={open}>
          <div>
            <UnitTitle>
              {formatMessage(messages.statusCardTitle)}
            </UnitTitle>
          </div>
          <div>
            <Switch
              style={{ marginBottom: 'unset' }}
              className={'pt-large'}
              checked={enrolled}
              disabled={enrollDisabled}
              onChange={this.toggleEnrollment}
            />
          </div>
        </CardHeader>
        <CardInnerContent>
          <div className={'pt-text-muted'}>
            {formatMessage(messages.statusCardEnrollLabel)}
          </div>
        </CardInnerContent>
      </Wrapper>
    )
  }
}

export default withRouter(injectIntl(injectState(StatusCardDump)))
