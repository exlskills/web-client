import * as React from 'react'
import environment from 'relayEnvironment'
import { MutationConfig, commitMutation } from 'react-relay'

export interface RendererProps<T = any> {
  error: Error
  props: T
}

export const handleQueryRender = (
  Component: new () => React.Component<any, any>
) => {
  return ({ error, props }: { error: Error; props: any }) => {
    if (error) {
      return (
        <div>
          {error.message}
        </div>
      )
    } else if (props) {
      return Component ? <Component viewer={props.viewer} /> : null
    }
    return <div>Loading</div>
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
