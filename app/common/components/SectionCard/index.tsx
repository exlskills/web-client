import * as React from 'react'
import SelectionPopover from './SelectionPopover'
import CodeEditor from 'common/components/CodeEditor'
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
  parseContent() {
    let text = this.props.card.content.content
    let firstPart = ''
    let lastPart = ''
    let rawCode: any = []
    let code: any = []

    // #!CG-B# <==> #!CG-E#
    // #!C-B:filename# <==> #!C-E#
    // #!Q-B# <==> #!Q-E#
    // #!QH-B# <==> #!QH-E#
    // #!QT-B# <==> #!QT-E#
    const beginGroupIdx = text.indexOf('#!CG-B#')
    const endGroupIdx = text.lastIndexOf('#!CG-E#')
    if (beginGroupIdx != -1 && endGroupIdx != -1) {
      firstPart = text.substring(0, beginGroupIdx)
      lastPart = text.substring(endGroupIdx + 7)
      const codeGroup = text.substring(beginGroupIdx + 8, endGroupIdx)
      rawCode = codeGroup.split(/\s*#!C-E#\s*/)
    } else {
      const beginCodeIdx = text.indexOf('#!C-B:')
      const endCodeIdx = text.lastIndexOf('#!C-E#')

      if (beginCodeIdx == -1 || endCodeIdx == -1) {
        return {
          id: this.props.card.content.id,
          firstPart: text,
          code: code,
          lastPart: ''
        }
      }

      firstPart = text.substring(0, beginCodeIdx)
      lastPart = text.substring(endCodeIdx + 6)
      rawCode = [text.substring(beginCodeIdx, endCodeIdx)]
    }

    for (let codeText of rawCode) {
      const beginIdx = codeText.indexOf('#!C-B:')
      // const endIdx = codeText.lastIndexOf('#!C-E#')
      if (beginIdx == -1) {
        // TODO
        continue
      }

      let content = codeText.substring(beginIdx).trim()
      let settings: any = {}

      // #!C-SL:(JVSL|PYSL)#
      // #!C-SF:(...TBD...)#
      // #!C-BI:(EE)#
      // #!Q-T:(MCSA|MCMA|WSCQ...)#
      let match
      for (let item of configInfo) {
        match = content.match(item.regex)
        if (match && match[1]) {
          settings[item.fieldname] = match[1]
          content = content.substring(item.tagLength + match[1].length).trim()
        }
      }
      code.push({ content, settings })
    }

    return {
      id: this.props.card.content.id,
      firstPart,
      code,
      lastPart
    }
  }

  highlight(text: string, highlightText: string) {
    var regex = new RegExp(`(${highlightText})`, 'i')
    return text.replace(regex, '<mark>$1</mark>')
  }

  renderContent() {
    let { id, firstPart, code, lastPart } = this.parseContent()
    const { highlightText } = this.props

    if (highlightText) {
      firstPart = this.highlight(firstPart, highlightText)
      lastPart = this.highlight(lastPart, highlightText)
    }

    let files = code.map((item: any) => ({
      name: item.settings.fileName,
      content: item.content
    }))

    return (
      <div>
        {firstPart && <Markdown options={{ html: true }} source={firstPart} />}
        {code &&
          code.length > 0 &&
          <LazyLoad>
            <CodeEditor id={id} files={files} />
          </LazyLoad>}
        {code && <div style={{ marginBottom: '10px' }} />}
        {lastPart && <Markdown options={{ html: true }} source={lastPart} />}
      </div>
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
