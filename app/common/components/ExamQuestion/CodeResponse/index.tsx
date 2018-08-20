import * as React from 'react'
import Input from 'common/components/forms/inputs/Input'
import CodeEditor from 'common/components/CodeEditor'

export interface ICodeResponseProps {
  id: string
  tmpl_files: string
  src_files: string
  environment_key: string
}

interface IProps {
  editorData: ICodeResponseProps
  onChange: (wspc: object) => void
}

class CodeResponse extends React.PureComponent<IProps, any> {
  static contextTypes = {
    viewer: React.PropTypes.object
  }
  context: any

  render() {
    const { editorData } = this.props
    const userId = this.context.viewer.user_id
    return (
      <CodeEditor
        id={`${userId}-${editorData.id}`}
        files={JSON.parse(editorData.tmpl_files)}
        environment={editorData.environment_key}
        // environment={'java_default_free'}
        disableAction={true}
        onWorkspaceUpdated={this.props.onChange}
      />
    )
  }
}

export default CodeResponse
