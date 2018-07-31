import styled from 'styled-components'

export const Wrapper = styled.div``

const getOptionWrapperColor = (props: OptionWrapperProps) =>
  props.correct === true
    ? '#0d8050'
    : props.correct === false ? '#c23030' : 'transparent'

const getOptionWrapperIcon = (props: OptionWrapperProps) =>
  props.correct === true ? '""' : props.correct === false ? '""' : ''

interface OptionWrapperProps {
  correct?: boolean
}
export const OptionWrapper = styled.div`
  padding: 5px;
  border: 1px solid transparent;
  border-radius: 3px;
  margin-bottom: 5px;
  padding-right: 50px;
  position: relative;
  border-color: ${getOptionWrapperColor};

  // override default styles
  .pt-control {
    margin-bottom: 0;
    min-height: auto;
  }

  &::after {
    line-height: 1;
    font-family: "Icons20", sans-serif;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    color: ${getOptionWrapperColor};
    content: ${getOptionWrapperIcon};
  }
`
