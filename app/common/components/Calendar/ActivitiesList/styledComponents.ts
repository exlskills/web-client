import { Flex, FlexProps, Box, BoxProps } from 'grid-styled'
import styled from 'styled-components'

export const ContentWrapper = styled.div``

export const EventWrapper = styled.div`
  font-size: 14px;
  padding: 10px 0 10px 40px;
  border-top: 1px solid rgba(204, 204, 204, 0.7);
  position: relative;
  cursor: pointer;
  &:first-child {
    border-top: none;
  }
`
export const EventTime = styled.div`
  float: right;
  line-height: 22px;
`
export const EventIcon = styled.div`
  font-size: 20px;
  position: absolute;
  left: 0;
  top: 14px;
`
export const EventTitle = styled.div`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  white-space: nowrap;
  max-width: calc(100% - 174px);
  font-weight: 600;
`
export const EventAuthor = styled.span``
export const EventBody = styled.div`margin-right: 174px;`
export const EventBodyList = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
`
export const EventBodyItem = styled.li`
  background: transparent;
  padding: 0;
  border: none;
  & > div,
  & > span {
    font-size: 14px;
  }
  &::after {
    content: " ";
    display: table;
    clear: both;
  }
`
export const List = styled.ul`
  display: 'block';
  list-style: none;
  padding-left: 32px;
  margin: 0;
  margin: 0;
`
export const Listitem = styled.li`
  position: relative;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 1rem;
`

export const EmptyText = styled.div`font-size: 1rem;`
