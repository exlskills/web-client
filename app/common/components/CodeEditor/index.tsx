import * as React from 'react'
import {
  EDITOR_URL,
  EDITOR_DEFAULT_NAME,
  EDITOR_DEFAULT_CONTENT,
  EDITOR_DEFAULT_FILENAME,
  EDITOR_DEFAULT_ENV,
  EDITOR_DEFAULT_HEIGHT
} from 'common/constants'

export interface EditorFileProps {
  content: string
  name?: string
}

interface IProps {
  id?: string
  name?: string
  environment?: string
  height?: string
  files?: object
  embedded?: boolean
  disableAction?: boolean
  onWorkspaceUpdated?: (wspc: object) => void
}
interface IStates {
  iframeMsgHandler?: (evt: any) => void
}

export default class CodeEditor extends React.PureComponent<IProps, IStates> {
  static defaultProps: Partial<IProps> = {
    name: EDITOR_DEFAULT_NAME,
    environment: EDITOR_DEFAULT_ENV,
    height: EDITOR_DEFAULT_HEIGHT,
    embedded: true
  }

  handleIFrameMsg = (self: any) => (evt: any) => {
    const { event, payload } = JSON.parse(evt.data)
    if (event === 'workspace.changed' && self.props.onWorkspaceUpdated) {
      self.props.onWorkspaceUpdated(payload)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.state.iframeMsgHandler)
  }

  componentWillMount() {
    const evtHandler = this.handleIFrameMsg(this)
    this.setState({ iframeMsgHandler: evtHandler })
    window.addEventListener('message', evtHandler)
  }

  generateWorkspace() {
    const { id, name, files, environment } = this.props

    return {
      files: files,
      name: name,
      id: id,
      environmentKey: environment
    }
  }

  generateEditorUrl() {
    const workspace = JSON.stringify(this.generateWorkspace())
    const embedded = this.props.embedded ? 'embedded=true&' : ''
    const disableAction = this.props.disableAction ? '&disableAction=true' : ''
    const encodedWorkspacee = encodeURIComponent(workspace)
    return `${EDITOR_URL}/?${embedded}workspace=${encodedWorkspacee}${disableAction}`
  }

  render() {
    return (
      <iframe
        src={this.generateEditorUrl()}
        frameBorder="0"
        width={'100%'}
        height={this.props.height}
        style={{
          width: '100%',
          height: this.props.height,
          border: 'none'
        }}
      />
    )
  }
}
