import Loading from 'common/components/Loading'
import SectionCard from 'common/components/SectionCard'
import MarkdownStyleWrapper from 'common/components/MarkdownStyleWrapper'

import { injectState } from 'freactal'
import * as React from 'react'
import { QueryRenderer } from 'react-relay'
import environment from 'relayEnvironment'

import { IFreactalProps } from 'pages/Course'
import { ConceptMesssage } from './styledComponents'
import { WS_EVENTS } from 'common/ws/constants'
import wsclient from 'common/ws/client'
import { handleQueryRender } from 'common/utils/relay'

import InjectedIntlProps = ReactIntl.InjectedIntlProps
let Markdown = require('react-remarkable')
const { graphql } = require('react-relay/compat')
const rootQuery = graphql`
  query CardDialogContentQuery($question_id: String!) {
    card: cardByQuestion(question_id: $question_id) {
      title
      headline
      content {
        id
        content
      }
    }
  }
`

interface IProps {}
interface IStates {}

class CardDialogContent extends React.Component<
  IProps & IFreactalProps,
  IStates
> {
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  parseContent(content: { content: string }) {
    let text = content.content
    return (
      <MarkdownStyleWrapper>
        <Markdown options={{ html: true }} source={text || ''} />
      </MarkdownStyleWrapper>
    )
  }
  queryRender = handleQueryRender(({ props }: { props: any }) => {
    return (
      <ConceptMesssage>
        <SectionCard card={props.card} />
      </ConceptMesssage>
    )
  })
  render() {
    const {
      examQuestion,
      course,
      examUnit,
      examSection,
      examType
    } = this.props.state
    if (!examQuestion || !examQuestion.id) {
      return <div />
    }
    wsclient.sendEvent(WS_EVENTS.cardAction, {
      course_id: course.id,
      unit_id: examUnit.id,
      section_id: examType == 'section' ? examSection.id : null,
      card_id: examQuestion.card_id,
      user_id: this.context.viewer.user_id,
      action: 'view_fq'
    })
    return (
      <QueryRenderer
        query={rootQuery}
        variables={{
          question_id: examQuestion.id
        }}
        environment={environment} // RelayEnvironments
        render={this.queryRender}
      />
    )
  }
}

export default injectState<IProps>(CardDialogContent)
