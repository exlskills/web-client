declare module 'grid-styled' {
  import { Component } from 'react'

  module 'grid-styled' {
    interface FlexProps {}
    interface BoxProps {}
    interface GridProps {}

    export class Flex extends Component<any, {}> {}
    export class Box extends Component<any, {}> {}
    export class Grid extends Component<any, {}> {}
  }
}
