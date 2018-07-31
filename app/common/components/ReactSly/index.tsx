import * as $ from 'jquery'
import * as _ from 'lodash'
const Sly = require('sly')
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  ScrollbarWrapper,
  Scrollbar,
  Handle,
  Wrapper
} from './styledComponents'

const defaultOptions: any = {
  horizontal: 1,
  itemNav: 'centered',
  smart: 1,
  scrollBy: 1,
  mouseDragging: 1,
  touchDragging: 1,
  elasticBounds: 1,
  releaseSwing: 1,
  speed: 300
}

interface IProps {
  slyOptions?: {
    [key: string]: any
  }
  onInit?: (frame: any) => void
}
interface IStates {}

class ReactSly extends React.PureComponent<IProps, IStates> {
  static defaultProps: IProps = {
    slyOptions: {}
  }

  private frame: any
  private resizeHandler: any
  private sly: any

  constructor(props: IProps) {
    super(props)
    this.resizeHandler = _.debounce(() => {
      this.frame.reload()
    }, 100)
  }

  attachSlyRef = (elem: any) => {
    this.sly = elem
  }

  componentDidUpdate(prevProps: IProps, prevState: IStates) {
    if (
      this.frame &&
      prevProps.slyOptions.startAt != this.props.slyOptions.startAt
    ) {
      this.frame.toCenter(this.props.slyOptions.startAt)
    }
  }

  componentDidMount() {
    if (!this.frame) {
      let options = Object.assign({}, defaultOptions, this.props.slyOptions)
      let thisDom: any
      if (options.defaultScrollBar) {
        thisDom = ReactDOM.findDOMNode(this)
        options.scrollBar = thisDom.querySelector('.scrollbar')
      }
      this.frame = new Sly(this.sly, options).init()
      if (options.scrollBar && options.autoHideScrollBar) {
        const thisWidth = thisDom.offsetWidth
        const handle = options.scrollBar.querySelector('.handle')
        const handleWidth = handle.offsetWidth
        if (handleWidth + 10 >= thisWidth) {
          options.scrollBar.style.display = 'none'
        }
      }
      if (this.props.onInit) {
        this.props.onInit(this.frame)
      }
    } else {
      this.frame.reload()
    }
    window.addEventListener('resize', this.resizeHandler, true)
  }

  componentWillUnmount() {
    this.frame.destroy()
    window.removeEventListener('resize', this.resizeHandler)
  }

  render() {
    const { props } = this
    const { scrollBarStyle } = props.slyOptions
    const propsToPass = _.omit(props, 'children', 'slyOptions', 'onInit')

    return (
      <Wrapper>
        <ScrollbarWrapper style={scrollBarStyle}>
          <Scrollbar>
            <Handle />
          </Scrollbar>
        </ScrollbarWrapper>
        <div
          ref={this.attachSlyRef}
          {...propsToPass}
          className="frame"
          style={{ padding: 4, margin: -4 }}
        >
          <div
            className="slidee"
            style={{
              display: 'flex'
            }}
          >
            {props.children}
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default ReactSly
