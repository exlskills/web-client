import * as React from 'react'
import Input from 'common/components/forms/inputs/Input'
import CodeEditor from 'common/components/CodeEditor'

export interface FreeAnswerProps {
  id: string
  code: string
  environment_key: string
}

interface IProps {
  editorData: FreeAnswerProps
}

class FreeResponse extends React.PureComponent<IProps, any> {
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
        files={[{ content: editorData.code }]}
        environment={editorData.environment_key}
        disableAction={true}
      />
    )
  }
}

export default FreeResponse
