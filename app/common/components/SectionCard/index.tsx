import * as React from 'react'
import SelectionPopover from './SelectionPopover'
import CodeEditor from 'common/components/CodeEditor'
import MarkdownStyleWrapper from 'common/components/MarkdownStyleWrapper'
const LazyLoad = require('react-lazyload').default
let Markdown = require('react-remarkable')

const configInfo = [
  {
    fieldname: 'fileName',
    regex: /#!C-B:(.*?)#/,
    tagLength: 8
  },
  {
    fieldname: 'blockInfo',
    regex: /#!C-BI:(.*)#/,
    tagLength: 9
  },
  {
    fieldname: 'sysLang',
    regex: /#!C-SL:(.*?)#/,
    tagLength: 9
  }
]

interface IProps {
  card: any
  highlightText?: string
  selection?: boolean
  // eventTypes: string | string[]
  onTextSelect?: (text: string) => void
  onTextDeselect?: () => void
  showPopover?: boolean // TODO remove this
  popoverContent?: JSX.Element
}

export default class SectionCard extends React.PureComponent<IProps, any> {
  highlight(text: string, highlightText: string) {
    var regex = new RegExp(`(${highlightText})`, 'i')
    return text.replace(regex, '<mark>$1</mark>')
  }

  renderContent() {
    let text = this.props.card.content.content
    const { highlightText } = this.props

    if (highlightText) {
      text = this.highlight(text, highlightText)
    }

    return (
      <MarkdownStyleWrapper>
        {text && <Markdown options={{ html: true }} source={text} />}
      </MarkdownStyleWrapper>
    )
  }

  render() {
    const {
      card,
      selection,
      onTextSelect,
      onTextDeselect,
      showPopover,
      popoverContent
    } = this.props

    return (
      <div>
        {card.title &&
          <h2>
            {card.title}
          </h2>}
        <div style={{ position: 'relative' }}>
          <div data-selectable={card.id}>
            {this.renderContent()}
          </div>
          {selection &&
            <SelectionPopover
              selectableId={card.id}
              showPopover={showPopover}
              onSelect={onTextSelect}
              onDeselect={onTextDeselect}
            >
              {popoverContent}
            </SelectionPopover>}
        </div>
      </div>
    )
  }
}
