import styled from 'styled-components'
import { Text } from '@blueprintjs/core'
import { Flex } from 'grid-styled'

interface WrapperProps {
  backgroundColor?: string
  borderBottom: string
  isNextStep?: boolean
  isComplete?: boolean
}

export const Wrapper = styled(Flex).attrs<WrapperProps>({
  className: 'exl-card-row',
  justify: 'space-between',
  width: 1,
  align: 'center'
})`
  padding: 12px 16px;
  ${(props: WrapperProps) => props.isNextStep && `padding: 12px 16px 12px 6px;`}
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  ${(props: WrapperProps) =>
    props.backgroundColor && `background-color: ${props.backgroundColor}`}
    
  .pt-dark & {
    ${(props: WrapperProps) =>
      props.isNextStep &&
      `background-color: #2B4564;border-left: 10px solid #4379BB;`}
    ${(props: WrapperProps) => props.isComplete && `background-color: #285654`}
  }
  .pt-light & {
    ${(props: WrapperProps) =>
      props.isNextStep &&
      `background-color: rgb(241, 248, 255);border-left: 10px solid rgb(48, 101, 173);`}
    ${(props: WrapperProps) =>
      props.isComplete && `background-color: rgb(246, 255, 235)`}
  }
`

interface LeftProps {
  onClick?: () => void
}

export const Left = styled(Flex).attrs({
  column: true,
  align: 'flex-start',
  justify: 'space-between',
  flex: 1,
  width: 3 / 5
})`
  ${(props: LeftProps) => props.onClick && 'cursor: pointer;'}
`

export const Title = styled.span`
  font-size: 1.1rem;
  ${(props: LeftProps) =>
    props.onClick && 'cursor: pointer;&:hover {text-decoration: underline;}'};
`

export const Headline = styled.div.attrs({
  className: 'pt-text-muted'
})`
  ${(props: LeftProps) => props.onClick && 'cursor: pointer;'}
`

export const ListKeyTitle = styled(Title)`
  font-size: 1.1rem;
  align-self: baseline;
  margin-left: 38px;
  margin-right: 16px;
`
