import * as React from 'react'
// import InjectedIntlProps = ReactIntl.InjectedIntlProps
// import Sidebar from './components/common/Sidebar'
import { Wrapper, SplitPane } from './components/styledComponents'
import { Switch, Route } from 'react-router-dom'
import * as Loadable from 'react-loadable'
import Loading from 'common/components/Loading'
import { Redirect, RouteComponentProps } from 'react-router'
import { update, provideState } from 'freactal'
// injectState,
import requireAuthentication from 'routes/requireAuthentication'
// import { isMobile } from 'common/utils/screen'
import { AnswerProps } from '../../common/components/ExamQuestion'

const DELAY_INTERVAL = 500

export const ProgressHeader = Loadable({
  loader: () => System.import('pages/Course/components/common/ProgressHeader'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
const CourseGrades = Loadable({
  loader: () => System.import('pages/Course/components/grades'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const GradesTable = Loadable({
  loader: () => System.import('pages/Course/components/grades/GradesTable'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
const CourseOverview = Loadable({
  loader: () => System.import('pages/Course/components/overview'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
const CourseContent = Loadable({
  loader: () => System.import('pages/Course/components/overview'),
  loading: Loading,
  delay: DELAY_INTERVAL
})

export const ExamDialog = Loadable({
  loader: () => System.import('pages/Course/components/overview/ExamDialog'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const Header = Loadable({
  loader: () => System.import('pages/Course/components/overview/Header'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const ProgressCells = Loadable({
  loader: () => System.import('pages/Course/components/overview/ProgressCells'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const StatusCard = Loadable({
  loader: () => System.import('pages/Course/components/overview/StatusCard'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
export const UnitCard = Loadable({
  loader: () => System.import('pages/Course/components/overview/UnitCard'),
  loading: Loading,
  delay: DELAY_INTERVAL
})

const CourseInfo = Loadable({
  loader: () => System.import('pages/Course/components/info'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
const CourseCertificate = Loadable({
  loader: () => System.import('pages/Course/components/certificate'),
  loading: Loading,
  delay: DELAY_INTERVAL
})
const CourseLive = Loadable({
  loader: () => System.import('pages/Course/components/live'),
  loading: Loading,
  delay: DELAY_INTERVAL
})

const Sidebar = Loadable({
  loader: () => System.import('pages/Course/components/common/Sidebar'),
  loading: Loading,
  delay: DELAY_INTERVAL
})

export interface IFreactalStates {
  course?: {
    id?: string
    title?: string
    headline?: string
    description?: string
    logo_url?: string
    primary_topic?: string
    last_accessed_unit?: string
    last_accessed_section?: string
    last_accessed_card?: string
    delivery_methods: string[]
  }
  examModalOpen?: boolean
  examAllUnits?: {
    courseComplete: boolean
    unitIds: string[]
    unitsById: {
      [id: string]: any
    }
  }
  examUnit?: any
  examUnitId?: any
  examSection?: any
  examSectionId?: any
  examType?: string
  examQuestion?: any
  examQuestionCursor?: string
  examAnswer?: AnswerProps
  examQuizId?: string
  examExplanation?: string
  examCardOpen?: boolean
}

export interface IFreactalProps {
  state?: IFreactalStates
  effects?: {
    massiveUpdate: (data: IFreactalStates) => Promise<any>
    setExamModalOpen: (open: boolean) => void
    setExamAllUnits: (units: any) => void
    setExamUnit: (unit: any) => void
    setExamSection: (section: any) => void
    setExamType: (exam_type: string) => void
    setExamQuestion: (question: any) => void
    setExamQuestionCursor: (cursor: string) => void
    setExamAnswer: (answer: AnswerProps) => Promise<any>
    setExamQuizId: (quiz_id: string) => void
    setExamExplanation: (explain: any) => void
    setExamCardOpen: (cardOpen: boolean) => void
  }
}

interface IProps {}

type Mergedprops = IProps & IFreactalProps & RouteComponentProps<any>

@requireAuthentication(1)
class CoursePage extends React.Component<Mergedprops, {}> {
  render() {
    return (
      <Wrapper>
        <SplitPane
          defaultSize={240}
          pane2Style={{ overflowY: 'overlay' as any }}
        >
          <Sidebar />
          <Switch>
            <Route
              exact={true}
              path="/courses/:courseId"
              component={CourseOverview}
            />
            <Route
              exact={true}
              path="/courses/:courseId/info"
              component={CourseInfo}
            />
            <Route
              exact={true}
              path="/courses/:courseId/certificate"
              component={CourseCertificate}
            />
            <Route
              exact={true}
              path="/courses/:courseId/content"
              component={CourseContent}
            />
            <Route
              exact={true}
              path="/courses/:courseId/units/:unitId"
              component={CourseOverview}
            />
            <Route
              exact={true}
              path="/courses/:courseId/grades"
              component={CourseGrades}
            />
            <Route
              exact={true}
              path="/courses/:courseId/live"
              component={CourseLive}
            />
            <Redirect to="/404" />
          </Switch>
        </SplitPane>
      </Wrapper>
    )
  }
}

export const wrapComponentWithState = provideState<
  IFreactalStates,
  IProps & RouteComponentProps<any>
>({
  initialState: () => ({
    course: { delivery_methods: [] },
    examModalOpen: false,
    examType: '',
    examAllUnits: { unitIds: [], unitsById: {}, courseComplete: false },
    examUnit: {},
    examSection: {},
    examQuestion: {},
    examQuestionCursor: null,
    examAnswer: null,
    examQuizId: '',
    examExplanation: '',
    examCardOpen: false
  }),
  effects: {
    massiveUpdate: update(
      (state: IFreactalStates, data: IFreactalStates) => data
    ),
    setExamModalOpen: update((state: IFreactalStates, open: boolean) => {
      let updateStates: Partial<IFreactalStates> = {
        examModalOpen: open
      }
      if (!open) {
        updateStates.examType = ''
        updateStates.examUnit = {}
        updateStates.examSection = {}
        updateStates.examQuestion = {}
        updateStates.examQuestionCursor = null
        updateStates.examAnswer = null
        updateStates.examQuizId = ''
        updateStates.examExplanation = ''
        updateStates.examCardOpen = false
      }
      return updateStates
    }),
    setExamAllUnits: update((state: IFreactalStates, units: any) => ({
      examAllUnits: units
    })),
    setExamUnit: update((state: IFreactalStates, unit: any) => ({
      examUnit: unit,
      examUnitId: unit.id
    })),
    setExamSection: update((state: IFreactalStates, section: any) => ({
      examSection: section,
      examSectionId: section.id
    })),
    setExamType: update((state: IFreactalStates, exam_type: string) => ({
      examType: exam_type
    })),
    setExamQuestion: update((state: IFreactalStates, question: any) => ({
      examQuestion: question
    })),
    setExamQuestionCursor: update((state: IFreactalStates, cursor: any) => ({
      examQuestionCursor: cursor
    })),
    setExamAnswer: update((state: IFreactalStates, answer: AnswerProps) => ({
      examAnswer: answer
    })),
    setExamQuizId: update((state: IFreactalStates, quiz_id: string) => ({
      examQuizId: quiz_id
    })),
    setExamExplanation: update((state: IFreactalStates, explain: any) => ({
      examExplanation: explain
    })),
    setExamCardOpen: update((state: IFreactalStates, cardOpen: boolean) => ({
      examCardOpen: cardOpen
    }))
  }
})

export default wrapComponentWithState(CoursePage)
