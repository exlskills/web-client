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
  id: string
  name?: string
  environment?: string
  height?: string
  files?: EditorFileProps[]
  embedded?: boolean
  disableAction?: boolean
}
interface IStates {}

export default class CodeEditor extends React.PureComponent<IProps, IStates> {
  static defaultProps: Partial<IProps> = {
    name: EDITOR_DEFAULT_NAME,
    environment: EDITOR_DEFAULT_ENV,
    height: EDITOR_DEFAULT_HEIGHT,
    embedded: true
  }

  generateFile({ name, content }: EditorFileProps = { name: '', content: '' }) {
    return {
      isDir: false,
      isHidden: false,
      isImmutable: false,
      isTmplFile: false,
      name: name ? name : EDITOR_DEFAULT_FILENAME,
      contents: content ? content : EDITOR_DEFAULT_CONTENT
    }
  }

  generateWorkspace() {
    const { id, name, files, environment } = this.props

    let filesRoot: any
    if (files) {
      let filesObject: any = {}
      for (let file of files) {
        const filename = file.name ? file.name : EDITOR_DEFAULT_FILENAME
        filesObject[filename] = this.generateFile(file)
      }
      filesRoot = {
        src: {
          name: 'src',
          isDir: true,
          children: {
            main: {
              name: 'main',
              isDir: true,
              children: {
                java: {
                  name: 'java',
                  isDir: true,
                  children: {
                    exlcode: {
                      name: 'exlcode',
                      isDir: true,
                      children: filesObject
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      filesRoot = null
      // filesObject[EDITOR_DEFAULT_FILENAME] = this.generateFile()
    }

    return {
      documentId: id,
      files: filesRoot,
      name: name,
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
          border: '1px solid #ccc'
        }}
      />
    )
  }
}
