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
        session_duration: {
          months: number
          weeks: number
          days: number
          hours: number
          minutes: number
        }
        session_start_date: string
        session_run_notes: string
        instructors: {
          username: string
          full_name: string
        }[]
      }[]
    }[]
  }
}

interface IState {}

class CourseLiveDump extends React.Component<
  IProps & IFreactalProps & InjectedIntlProps & RouteComponentProps<any>,
  IState
> {
  static defaultProps = {}

  state = {}
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

  render() {
    const { formatMessage } = this.props.intl

    return (
      <ContentWrapper>
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
        {JSON.stringify(this.props.schedule)}
      </ContentWrapper>
    )
  }
}

export default withRouter(injectIntl(injectState(CourseLiveDump)))
