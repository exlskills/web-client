import { IWorkspace } from './wsenv'
export = server
export as namespace server

declare namespace server {
  interface IUserResp {
    id: string
    fullName: string
    username: string
    avatarUrl: string
  }

  interface IForkParentResp {
    id: string
    name: string
  }

  interface IWorkspaceFile {
    name: string
    isDir: boolean
    isTmplFile: boolean
    isImmutable: boolean
    isHidden: boolean
    contents: string
    children: { [fileName: string]: IWorkspaceFile }
  }

  interface IUserWorkspaceData {
    workspace: Partial<IWorkspace>
  }

  interface IBasicUserWorkspaceResp {
    id: string
    name: string
    user: IUserResp
    isPublic: boolean
    isStarred: boolean
    starCount: number
    forkParent: IForkParentResp
    forkCount: number
    createdAt: string
    updatedAt: string
  }

  interface IUserWorkspaceResp {
    id: string
    name: string
    user: IUserResp
    forkParent: IForkParentResp
    forkCount: number
    starCount: number
    isStarred: boolean
    isPublic: boolean
    isOwner: boolean
    isAdmin: boolean
    canEdit: boolean
    environmentKey: string
    data: IUserWorkspaceData
    createdAt: Date
    updatedAt: Date
  }

  interface CreateUserWorkspaceReq {
    name: string
    environmentKey: string
    isPublic: boolean
  }

  interface DetailedExamResp {
    id: string
    locale: string
    isLocaleAvailable: boolean
    tagIds: string[]
    availableLocales: string[]
    questionTypes: number[]
    questionCategories: number[]
    showExplanations: boolean
    ideTestMode: boolean
    isComplete: boolean
    showTimer: boolean
    questionCount: number
    createdAt: string
    updatedAt: string
  }

  interface TagResp {
    id: string
    tag: string
    category: number
  }

  interface BasicCourseResp {
    id: string
    title: string
    description: string
  }

  interface DetailedQuestionAttemptResp {
    id: string
    response: { [key: string]: any }
    score: number
    secondsSpent: number
    createdAt: string
  }

  interface UpdateUserWorkspaceMetaReq {
    name?: string
    isPublic?: boolean
  }

  interface ELSPDiagnosticsNotification {
    workspaceId: string
    providerId: string
    uri: string
    diagnostics: langserver.Diagnostic[]
  }
}
