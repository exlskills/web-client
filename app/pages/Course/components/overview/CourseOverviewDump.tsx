import { ContentWrapper } from 'common/components/styledComponents'
import { ExamDialog, Header, IFreactalProps, UnitCard } from 'pages/Course'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { injectState } from 'freactal'
import Helmet from 'react-helmet'

import * as React from 'react'
import messages from './messages'

interface IProps {
  showHeader?: boolean
  showStatus?: boolean
  userId: string
}

interface IStates {}

class CourseOverviewDump extends React.PureComponent<
  IProps & IFreactalProps & InjectedIntlProps,
  IStates
> {
  render() {
    const { showHeader, showStatus } = this.props
    const { unitIds, unitsById } = this.props.state.examAllUnits
    const { last_accessed_unit } = this.props.state.course
    const defaultOpen = !last_accessed_unit
    // We open up all units when being indexed for SEO
    const isCrawler = navigator.userAgent.startsWith('bot-exlpre-')
    const { formatMessage } = this.props.intl

    return (
      <ContentWrapper>
        <Helmet
          title={formatMessage(messages.pageTitle, {
            course: this.props.state.course.title
          })}
          meta={[
            {
              name: 'description',
              content: formatMessage(messages.pageDescription, {
                description: this.props.state.course.description
              })
            }
          ]}
        />
        {showHeader && <Header showStatus={showStatus} />}
        <div style={{ marginTop: showHeader || showStatus ? '0px' : '-24px' }}>
          {unitIds.map((unitId: string, idx: number) => {
            const unit = unitsById[unitId]
            return (
              <UnitCard
                key={unit.id}
                unit={unit}
                defaultOpen={
                  (idx == 0 && defaultOpen) ||
                  unit.id == last_accessed_unit ||
                  unit.suggestedUnit ||
                  isCrawler
                }
              />
            )
          })}
        </div>
        <ExamDialog isOpen={this.props.state.examModalOpen} />
      </ContentWrapper>
    )
  }
}

export default injectState(injectIntl(CourseOverviewDump))
