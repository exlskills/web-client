import {
  Range,
  TextDocumentItem,
  Position,
  CompletionItem,
  CodeActionContext,
  ReferenceContext,
  TextDocumentIdentifier
} from './vscode-lang/index'
export = wsenv
export as namespace wsenv

declare namespace wsenv {
  import FormattingOptions = monaco.languages.FormattingOptions

  // File Requests
  interface IGenericFileReq {
    workspaceId: string
    filePath: string
    isDir: boolean
    environmentKey: string
    contents: string
  }

  interface IMoveFileReq {
    workspaceId: string
    oldFilePath: string
    newFilePath: string
    environmentKey: string
  }

  interface IPatchFileReq {
    workspaceId: string
    environmentKey: string
    filePath: string
    isDir: boolean
    patch: string
  }

  // LSP Requests
  interface IGenericLSPReq {
    workspaceId: string
    providerId: string
    document: TextDocumentIdentifier
    position?: Position
  }

  interface ICompleteResolveReq {
    workspaceId: string
    providerId: string
    completionItem: CompletionItem
  }

  interface IFileLSPCloseReq {
    workspaceId: string
    providerId: string
    document: TextDocumentIdentifier
  }

  interface IFileLSPOpenReq {
    workspaceId: string
    providerId: string
    document: TextDocumentItem
  }

  interface IFormattingReq {
    workspaceId: string
    providerId: string
    document: TextDocumentIdentifier
    options: FormattingOptions
  }

  interface ICodeActionReq {
    workspaceId: string
    providerId: string
    document: TextDocumentIdentifier
    range: Range
    context: CodeActionContext
  }

  interface IReferencesReq {
    workspaceId: string
    providerId: string
    document: TextDocumentIdentifier
    position: Position
    context: ReferenceContext
  }

  // Events
  interface ITTYEventResp {
    instanceId: string
    body: string
  }

  // Other
  interface IWorkspace {
    id?: string
    configExtras?: { [key: string]: string }
    name: string
    environmentKey: string
    files: WorkspaceFileRoot
  }
  type WorkspaceFileRoot = { [key: string]: IWorkspaceFile }
  type WorkspaceFile = IWorkspaceFile
  interface IWorkspaceFile {
    name: string
    isDir?: boolean
    isTmplFile?: boolean
    isImmutable?: boolean
    isHidden?: false
    contents?: string
    children?: WorkspaceFileRoot
  }
}
