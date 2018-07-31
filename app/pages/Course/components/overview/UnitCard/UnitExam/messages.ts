import { defineMessages } from 'react-intl'

export default defineMessages({
  remainingAttempts: {
    id: 'pages.Course.UnitCard.UnitExam.remainingAttemptsText',
    defaultMessage:
      '{attempts, plural, =0 {No attempts} one {# attempt} other {# attempts}} remaining today'
  },
  takeExam: {
    id: 'pages.Course.UnitCard.UnitExam.takeExam',
    defaultMessage: 'Take Exam'
  },
  continueExam: {
    id: 'pages.Course.UnitCard.UnitExam.continueExam',
    defaultMessage: 'Continue Exam'
  },
  lbUnitExamDescription: {
    id: 'pages.Course.UnitCard.UnitExam.lbUnitExamDescription',
    defaultMessage: 'Put your new skills to the test!'
  },
  lbUnitExam: {
    id: 'pages.Course.UnitCard.UnitExam.lbUnitExam',
    defaultMessage: 'Take the exam for this unit'
  }
})
