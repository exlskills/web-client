import styled from 'styled-components'

interface GroupWrapperProps {
  error?: string
  inline?: boolean
  disabled?: boolean
}
export const GroupWrapper = styled.div.attrs<GroupWrapperProps>({
  className: (props: GroupWrapperProps) =>
    `pt-form-group
    ${props.error ? 'pt-intent-danger' : ''}
    ${props.inline ? 'pt-inline' : ''}
    ${props.disabled ? 'pt-disabled' : ''}`
})``

interface LabelWrapper {
  labelFor?: string
  required?: boolean
}
export const LabelWrapper = styled.label.attrs<LabelWrapper>({
  className: 'pt-label',
  htmlFor: (props: LabelWrapper) => props.labelFor
})`
  ${(props: LabelWrapper) =>
    props.required
      ? `:after {
          color: red;
          content: "*";
          padding-left: 2px;
        }`
      : ''};
`

export const InputWrapper = styled.div.attrs({
  className: 'pt-form-content'
})``

export const ErrorWrapper = styled.div.attrs({
  className: 'pt-form-helper-text'
})`
  font-size: 14px !important;
`
