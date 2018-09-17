declare module 'grid-styled' {
  import { Component } from 'react'

  module 'grid-styled' {
    export interface FlexProps {}
    export interface BoxProps {}
    export interface GridProps {}

    export class Flex extends Component<any, {}> {}
    export class Box extends Component<any, {}> {}
    export class Grid extends Component<any, {}> {}
  }
}
