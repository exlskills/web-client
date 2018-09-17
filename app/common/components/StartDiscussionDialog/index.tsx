import { Button, Dialog, Intent } from '@blueprintjs/core'
import { ConfirmDialog } from 'common/components/loaders'
import Input from 'common/components/forms/inputs/Input'
import TagInput from 'common/components/forms/inputs/TagInput'
import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import messages from './messages'

export interface IProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { title: string; comment: string; tags: string[] }) => void
  highlightedText?: string
  defaultTitle?: string
  defaultComment?: string
  defaultTags?: string[]
}
interface IStates {
  cancelDiscussionOpen: boolean
  discussionTitle: string
  discussionComment: string
  discussionTags: string[]
}

class StartDiscussionDialog extends React.PureComponent<
  IProps & InjectedIntlProps,
  any
> {
  constructor(props: IProps & InjectedIntlProps) {
    super(props)
    this.state = {
      cancelDiscussionOpen: false,
      discussionTitle: props.defaultTitle || '',
      discussionComment: props.defaultComment || '',
      discussionTags: props.defaultTags || []
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.defaultTags != nextProps.defaultTags) {
      this.setState({
        discussionTags: nextProps.defaultTags
      })
    }
    if (!this.props.isOpen != nextProps.isOpen) {
      this.setState({
        cancelDiscussionOpen: false,
        discussionTitle: this.props.defaultTitle || '',
        discussionComment: this.props.defaultComment || '',
        discussionTags: this.props.defaultTags || []
      })
    }
  }

  handleTitleChange = (text: string) => {
    this.setState({ discussionTitle: text })
  }

  handleCommentChange = (text: string) => {
    this.setState({ discussionComment: text })
  }

  handleTagsChange = (tags: string[]) => {
    this.setState({ discussionTags: tags })
  }
  handleSubmitDiscussion = () => {
    let { discussionTitle, discussionComment, discussionTags } = this.state
    this.props.onSubmit({
      title: discussionTitle,
      comment: discussionComment,
      tags: discussionTags
    })
  }

  toggleStartDiscussionDialog = () => {
    this.setState(
      {
        cancelDiscussionOpen: false,
        discussionTitle: this.props.defaultTitle || '',
        discussionComment: this.props.defaultComment || '',
        discussionTags: this.props.defaultTags || []
      },
      () => {
        this.props.onClose()
      }
    )
  }

  toggleCancelDiscussionDialog = () => {
    if (
      this.state.discussionTitle != '' ||
      this.state.discussionComment != '' ||
      this.state.discussionTags != ''
    ) {
      this.setState({
        cancelDiscussionOpen: !this.state.cancelDiscussionOpen
      })
    } else {
      this.toggleStartDiscussionDialog()
    }
  }

  render() {
    const { formatMessage } = this.props.intl
    const { highlightedText, isOpen } = this.props

    return (
      <Dialog
        style={{ minWidth: '600px' }}
        title={formatMessage(messages.lbStartDiscussion)}
        isOpen={isOpen}
        onClose={this.toggleStartDiscussionDialog}
      >
        <div className="pt-dialog-body">
          {highlightedText &&
            <p>
              {formatMessage(messages.txtSelectedText)}
            </p>}
          {highlightedText &&
            <blockquote>
              {highlightedText}
            </blockquote>}
          <Input
            label={formatMessage(messages.txtStartDiscussionTitle)}
            value={this.state.discussionTitle}
            onValueChange={this.handleTitleChange}
          />
          <Input
            label={formatMessage(messages.txtStartDiscussionComment)}
            textarea={true}
            value={this.state.discussionComment}
            onValueChange={this.handleCommentChange}
          />
          <TagInput
            label={formatMessage(messages.txtStartDiscussionTags)}
            values={this.state.discussionTags}
            onChange={this.handleTagsChange}
          />
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button
              intent={Intent.PRIMARY}
              text={formatMessage(messages.btnStartDiscussionSave)}
              onClick={this.handleSubmitDiscussion}
            />
            <Button
              text={formatMessage(messages.btnStartDiscussionCancel)}
              onClick={this.toggleCancelDiscussionDialog}
            />
            <ConfirmDialog
              onSubmit={this.toggleStartDiscussionDialog}
              onCancel={this.toggleCancelDiscussionDialog}
              showDialog={this.state.cancelDiscussionOpen}
              messageText={{
                text: formatMessage(messages.txtCancelDiscussionText),
                title: formatMessage(messages.txtCancelDiscussionTitle),
                submit: formatMessage(messages.btnCancelDiscussionSubmit),
                cancel: formatMessage(messages.btnCancelDiscussionCancel)
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default injectIntl<IProps & InjectedIntlProps>(StartDiscussionDialog)
