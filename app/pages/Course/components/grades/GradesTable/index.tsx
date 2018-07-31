import * as React from 'react'
import { CardWrapper } from 'pages/Course/components/styledComponents'
import { Table } from './styledComponents'
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import messages from './messages'
import { Icon } from 'common/components/styledComponents'

interface IProps {
  examItems: {
    id: string
    unit: string
    attempts: number
    attemptsLeft: number
    lastAttempt: Date
    weight: number
    passed: boolean
    grade: number
  }[]
  onClick: (id: string, idx: number) => void
}

class GradesTable extends React.Component<IProps, {}> {
  handleClick = (id: string, idx: number) => () => {
    this.props.onClick(id, idx)
  }

  render() {
    const { examItems } = this.props
    let symbolStyle = {
      margin: 'auto',
      width: '60%'
    }
    let styleCenterText = {
      textAlign: 'center'
    }
    return (
      <CardWrapper style={{ marginTop: '1.5rem' }}>
        <Table>
          <thead>
            <tr>
              <th>
                <FormattedMessage {...messages.unitHeading} />
              </th>
              <th>
                <FormattedMessage {...messages.attemptsHeading} />
              </th>
              <th style={styleCenterText}>
                <FormattedMessage {...messages.attemptsLeftHeading} />
              </th>
              <th>
                <FormattedMessage {...messages.lastAttemptHeading} />
              </th>
              <th>
                <FormattedMessage {...messages.weightHeading} />
              </th>
              <th>
                <FormattedMessage {...messages.passedHeading} />
              </th>
              <th>
                <FormattedMessage {...messages.gradeHeading} />
              </th>
            </tr>
          </thead>
          <tbody>
            {examItems.map((item, idx) =>
              <tr key={item.id} onClick={this.handleClick(item.id, idx)}>
                <td>
                  {item.unit}
                </td>
                <td>
                  {item.attempts}
                </td>
                <td style={styleCenterText}>
                  {item.attemptsLeft}
                </td>
                <td>
                  {item.lastAttempt != null
                    ? <FormattedDate value={item.lastAttempt} />
                    : <p style={symbolStyle}>-</p>}
                </td>
                <td>
                  <FormattedNumber
                    style="percent"
                    value={item.weight ? item.weight / 100 : 0}
                  />
                </td>
                <td>
                  {item.passed
                    ? <Icon
                        iconName="tick"
                        style={{
                          display: 'block',
                          margin: 'auto',
                          width: '70%'
                        }}
                      />
                    : item.lastAttempt != null
                      ? <Icon
                          style={{
                            display: 'block',
                            margin: 'auto',
                            width: '75%'
                          }}
                          iconName="cross"
                        />
                      : <p style={symbolStyle}>-</p>}
                </td>
                <td>
                  {item.grade != null && item.lastAttempt != null
                    ? <FormattedNumber
                        style="percent"
                        value={item.grade / 100}
                      />
                    : item.grade == null
                      ? <FormattedNumber style="percent" value={0} />
                      : <p style={symbolStyle}>-</p>}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </CardWrapper>
    )
  }
}

export default GradesTable
