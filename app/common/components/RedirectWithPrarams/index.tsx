import React from 'react'
import pathToRegexp from 'path-to-regexp'
import { Route, Redirect } from 'react-router-dom'

interface IProps {
  exact: boolean
  from: string
  to: string
  push: boolean
}

class RedirectWithParams extends React.PureComponent<IProps, {}> {
  render() {
    const { exact, from } = this.props
    return (
      <Route exact={exact} path={from} component={this.getRedirectComponent} />
    )
  }

  getRedirectComponent = (props: { match: { params: any } }) => {
    const { push, to } = this.props
    const pathTo = pathToRegexp.compile(to)
    return <Redirect to={pathTo(props.match.params)} push={push} />
  }
}

export default RedirectWithParams
