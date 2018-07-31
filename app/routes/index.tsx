import * as React from 'react'
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as PropTypes from 'prop-types'

import { selectLocation } from 'common/store/selectors'
import { Store } from 'redux'
import { Location } from 'history'
import { Record } from 'immutable'

// Load course page statically statically
import Course from 'pages/Course'
import SettingProfile from 'pages/SettingProfile/components/ProfileSpecific'
import * as loaders from './loaders'
interface IProps {
  location: Record.Instance<Location>
}

class Routes extends React.PureComponent<IProps, void> {
  // eslint-disable-line react/prefer-stateless-function

  context: {
    store: Store<string>
  }

  static contextTypes = {
    store: PropTypes.object
  }

  render() {
    return (
      <Switch location={this.props.location.toJS()}>
        <Route exact={true} path="/" component={loaders.Landing} />
        <Route
          exact={true}
          path="/exams/:courseId/:unitId"
          component={loaders.Exam}
        />
        <Route
          exact={true}
          path="/exams/:courseId/:unitId/exam/:examId"
          component={loaders.Exam}
        />
        <Route
          exact={true}
          path="/pre-exams/:courseId/:unitId"
          component={loaders.PreExam}
        />
        <Route
          exact={true}
          path="/pre-exams/:courseId/:unitId/exam/:examId"
          component={loaders.PreExam}
        />
        <Route
          exact={true}
          path="/courses/:courseId/units/:unitId/sections/:sectionId"
          component={loaders.Section}
        />
        <Route
          exact={true}
          path="/courses/:courseId/units/:unitId/sections/:sectionId/card/:cardId"
          component={loaders.Section}
        />
        <Route path="/users/:userId" component={SettingProfile} />
        <Route
          exact={true}
          path="/courses/explore"
          component={loaders.CourseListing}
        />
        <Route
          exact={true}
          path="/courses/enrolled"
          component={loaders.CourseListing}
        />
        <Route path="/courses/:courseId" component={Course} />
        <Route exact={true} path="/courses" component={loaders.CourseListing} />
        <Route exact={true} path="/dashboard" component={loaders.Dashboard} />
        <Route path="/settings" component={loaders.Settings} />
        <Route
          exact={true}
          path="/notifications"
          component={loaders.Notifications}
        />
        <Route exact={true} path="" component={loaders.NotFound} />
      </Switch>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  location: selectLocation()
})

export default connect(mapStateToProps)(Routes)
