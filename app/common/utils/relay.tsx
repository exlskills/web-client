import * as React from 'react'
import environment from 'relayEnvironment'
import { MutationConfig, commitMutation } from 'react-relay'
import { Redirect } from 'react-router'

import Loading from 'common/components/Loading'
import RedirectException from 'common/utils/redirect-exception'

export interface RendererProps<T = any> {
  error: Error
  props: T
}

export const handleQueryRender = (fn: Function) => {
  return ({ error, props }: { error: Error; props: any }) => {
    if (error) {
      if (error instanceof RedirectException) {
        return <Redirect to={error.location} />
      }

      return (
        <div>
          {error.message}
        </div>
      )
    } else if (props) {
      console.log('[GQL] ', props)
      return fn ? fn({ props }) : null
    }
    return <Loading />
  }
}

export function commit<T>(config: MutationConfig<T>) {
  return new Promise((resolve, reject) => {
    commitMutation<T>(environment, {
      onCompleted: (response: T) => resolve(response),
      onError: (error: Error) => reject(error),
      ...config
    })
  })
}
