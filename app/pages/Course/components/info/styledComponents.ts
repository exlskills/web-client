import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 16px 34px !important;
  width: inherit !important;
`

export const ContentCard = styled.div.attrs({
  className: 'pt-card'
})`
  width: 100%;
`

export const Card = styled.div.attrs({
  className: 'pt-card'
})`
  min-height: 300px;
  width: 100%;
  margin-bottom: 2rem;
`

export const CardContent = styled.pre`
  word-break: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
`
