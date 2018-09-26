import styled from 'styled-components'

export const BackToDashboardLink = styled.a`
  font-size: 20px;
  margin-top: 40px;
`

export interface ISageImageProps {
  errorKey: string
}

export const SageImage = styled.img.attrs<ISageImageProps>({
  src: (props: ISageImageProps) => {
    let type = ''
    switch (props.errorKey) {
      case '403':
        type = 'keys'
        break
      case '400':
        type = 'expl'
        break
      case '500':
        type = 'meh'
        break
      case '404':
      default:
        type = 'question'
    }
    return `https://s3-us-west-2.amazonaws.com/exlskills-error-images/sage-${type}.png`
  }
})`
  height: auto;
  width: 400px;
  margin: 0 auto;
  margin-top: 80px;
`

export const ErrorPageMessageWrapper = styled.div`
  margin: 0 auto;
  marginTop: 30px;
`
