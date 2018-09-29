import * as React from 'react'
import { ContentWrapper } from 'common/components/styledComponents'
import { IFreactalProps } from '../../index'
import { RouteComponentProps, withRouter } from 'react-router'
import { injectState } from 'freactal'
import messages from './messages'
import { injectIntl } from 'react-intl'
import InjectedIntlProps = ReactIntl.InjectedIntlProps
import Helmet from 'react-helmet'
const Markdown = require('react-remarkable')
import MarkdownStyleWrapper from 'common/components/MarkdownStyleWrapper'
import {
  SessionNote,
  AlreadyPurchasedWrapper,
  InstructorsWrapper,
  SessionRowWrapper,
  PriceWrapper,
  StartDateSessionsMobileBr,
  RunStartSessionsCount,
  RunStartDate,
  RegisterButton,
  ContentCard,
  LiveRunsWrapper,
  LiveRunCollapse,
  LiveRunWrapper,
  LiveRunRow,
  ToggleIcon,
  InstructorItemWrapper,
  LiveSessionWrapper,
  LiveRunRowLeft,
  LiveRunRowRight,
  InstructorAvatar
} from './styledComponents'
import { Icon } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { ICheckoutItem } from '../../../../common/store/reducer'
import {
  setCheckoutItem,
  setShowBillingDialog
} from '../../../../common/store/actions'
import { createStructuredSelector } from 'reselect'
import {
  selectCheckoutItem,
  selectShowBillingDialog
} from '../../../../common/store/selectors'
import { bindActionCreators, Dispatch } from 'redux'

interface IInstructor {
  avatar_url: string
  username: string
  full_name: string
  headline: string
  biography: string
}

interface IProps {
  course: {
    id: string
    title: string
    headline: string
    description: string
    logo_url: string
    info_md: string
    verified_cert_cost: string
  }
  schedule: {
    _id: string
    delivery_structure: string
    delivery_methods: string[]
    course_notes: string
    course_duration: {
      months: number
      weeks: number
      days: number
      hours: number
      minutes: number
    }
    session_info: {
      session_seq: number
      headline: string
      desc: string
      session_notes: string
    }[]
    instructors: { [key: string]: IInstructor }
    scheduled_runs: {
      _id: string
      offered_at_price: {
        amount: number
      }
      seat_purchased: boolean
      run_start_date: string
      run_sessions: {
        _id: string
        session_seq: number
        headline: string
        desc: string
        session_notes: string
        session_duration_hrs: number
        session_duration: {
          months: number
          weeks: number
          days: number
          hours: number
          minutes: number
        }
        session_start_date: string
        session_run_notes: string
        instructors: IInstructor[]
      }[]
    }[]
  }
}

interface IState {
  liveRunCollapseMap: { [key: number]: boolean }
}

interface IStateToProps {
  showBillingDialog: boolean
  checkoutItem: ICheckoutItem
}

interface IDispatchToProps {
  setShowBillingDialog: typeof setShowBillingDialog
  setCheckoutItem: typeof setCheckoutItem
}

const mapStateToProps = createStructuredSelector({
  showBillingDialog: selectShowBillingDialog(),
  checkoutItem: selectCheckoutItem()
})

const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setShowBillingDialog,
      setCheckoutItem
    },
    dispatch
  )
})

type IMergedProps = IProps &
  IFreactalProps &
  InjectedIntlProps &
  RouteComponentProps<any> &
  IDispatchToProps &
  IStateToProps

class CourseLiveDump extends React.Component<IMergedProps, IState> {
  static defaultProps = {}

  state = {
    liveRunCollapseMap: {
      0: true
    } as { [key: number]: boolean }
  }
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  parseContent(text: string) {
    return (
      <MarkdownStyleWrapper>
        <Markdown options={{ html: true }} source={text || ''} />
      </MarkdownStyleWrapper>
    )
  }

  toggleRow = (idx: number) => () => {
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState.liveRunCollapseMap = Object.assign(
        {},
        prevState.liveRunCollapseMap
      )
      newState.liveRunCollapseMap[idx] = !newState.liveRunCollapseMap[idx]
      return newState
    })
  }

  onRegisterClick = (
    dispCost: number,
    dispName: string,
    runId: string
  ) => () => {
    this.props.setCheckoutItem({
      category: 'course_run',
      quantity: 1,
      options: {
        certificate_type: 'verified'
      },
      refs: {
        cd_sched_id: this.props.schedule._id,
        cd_run_id: runId
      },
      displayUnitCost: dispCost,
      displayName: dispName,
      refreshPageAfterCheckout: true
    })
    this.props.setShowBillingDialog(true)
  }

  render() {
    const { formatMessage } = this.props.intl
    const { scheduled_runs, instructors } = this.props.schedule

    return (
      <ContentWrapper responsive={true}>
        <Helmet
          title={formatMessage(messages.pageTitle, {
            course: this.props.course.title
          })}
          meta={[
            {
              name: 'description',
              content: formatMessage(messages.pageDescription, {
                description: this.props.course.description
              })
            }
          ]}
        />
        <br />
        <h3>
          {formatMessage(messages.pageHeading)}
        </h3>
        <br />
        <ContentCard>
          <h3>
            {this.props.course.title} - LIVE With EXLskills!
          </h3>
          <br />
          <p>
            {this.props.schedule.course_notes}
          </p>
          <br />
          <h3>Schedule</h3>
          <br />
          {(!scheduled_runs || scheduled_runs.length < 1) &&
            <div>
              {formatMessage(messages.noUpcomingSessions)}
            </div>}
          {scheduled_runs &&
            scheduled_runs.length > 0 &&
            <LiveRunsWrapper>
              {scheduled_runs.map((run, runIdx) => {
                return (
                  <LiveRunWrapper key={runIdx}>
                    <LiveRunRow>
                      <ToggleIcon
                        onClick={this.toggleRow(runIdx)}
                        open={this.state.liveRunCollapseMap[runIdx]}
                      />
                      <LiveRunRowLeft onClick={this.toggleRow(runIdx)}>
                        <RunStartDate>
                          {run.run_start_date}
                        </RunStartDate>
                        <StartDateSessionsMobileBr />
                        <RunStartSessionsCount>
                          {run.run_sessions.length}{' '}
                          {run.run_sessions.length > 1
                            ? formatMessage(messages.sessions)
                            : formatMessage(messages.session)}
                        </RunStartSessionsCount>
                      </LiveRunRowLeft>
                      <LiveRunRowRight>
                        {run.seat_purchased
                          ? <AlreadyPurchasedWrapper>
                              {formatMessage(messages.alreadyPurchasedNote)}
                            </AlreadyPurchasedWrapper>
                          : <span>
                              <PriceWrapper>
                                <span>
                                  {formatMessage(messages.pricePrefix)}{' '}
                                  <strong>
                                    ${run.offered_at_price.amount}
                                  </strong>
                                </span>
                              </PriceWrapper>
                              <RegisterButton
                                onClick={this.onRegisterClick(
                                  run.offered_at_price.amount,
                                  formatMessage(messages.checkoutDisplayName, {
                                    sessions: run.run_sessions.length,
                                    course: this.props.course.title,
                                    start: run.run_start_date
                                  }),
                                  run._id
                                )}
                              >
                                {formatMessage(messages.registerBtn)}
                              </RegisterButton>
                            </span>}
                      </LiveRunRowRight>
                    </LiveRunRow>
                    <LiveRunCollapse
                      isOpen={this.state.liveRunCollapseMap[runIdx]}
                    >
                      <ul>
                        {run.run_sessions.map((sess, sessIdx) => {
                          return (
                            <SessionRowWrapper key={sessIdx}>
                              {formatMessage(messages.sessionRow, {
                                number: sess.session_seq,
                                date: sess.session_start_date,
                                hrs: sess.session_duration_hrs
                              })}
                              {sess.session_notes &&
                                sess.session_notes.length > 0 &&
                                <div>
                                  <SessionNote>
                                    <Icon iconName={'pt-icon-dot'} />
                                    {sess.session_notes}
                                  </SessionNote>
                                </div>}
                            </SessionRowWrapper>
                          )
                        })}
                      </ul>
                    </LiveRunCollapse>
                  </LiveRunWrapper>
                )
              })}
            </LiveRunsWrapper>}
          {instructors &&
            <InstructorsWrapper>
              <h3>About the Instructors</h3>
              <br />
              {Object.keys(instructors).map((username, i) => {
                return (
                  <InstructorItemWrapper key={i}>
                    <InstructorAvatar
                      size={120}
                      name={instructors[username].full_name}
                      src={instructors[username].avatar_url}
                    />
                    <div>
                      <br />
                      <h4>
                        {instructors[username].full_name}
                      </h4>
                      <br />
                      <div>
                        {instructors[username].headline}
                      </div>
                      <p>
                        {instructors[username].biography}
                      </p>
                    </div>
                  </InstructorItemWrapper>
                )
              })}
            </InstructorsWrapper>}
        </ContentCard>
      </ContentWrapper>
    )
  }
}

export default connect<IStateToProps, IDispatchToProps, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(injectState(CourseLiveDump))))
