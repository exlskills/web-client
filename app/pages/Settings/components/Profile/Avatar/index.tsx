import * as React from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import messages from './messages'

import {
  UploaderButton,
  UploaderInput,
  UploaderWrapper,
  Wrapper
} from './styledComponents'

export interface AvatarProps {
  imageUrl: string
  size?: number | string
  showUploader?: boolean
  onFileChange?: (files: FileList) => void
}

class Avatar extends React.PureComponent<AvatarProps & InjectedIntlProps, any> {
  static defaultProps: Partial<AvatarProps> = {
    size: 200,
    showUploader: false
  }

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onFileChange) {
      this.props.onFileChange(e.target.files)
    }
  }

  render() {
    const { imageUrl, size, showUploader } = this.props
    const { formatMessage } = this.props.intl
    return (
      <Wrapper>
        <img src={imageUrl} width={size} height={size} />
        {showUploader &&
          <UploaderWrapper>
            <UploaderInput onChange={this.handleFileChange} />
            <UploaderButton>
              {formatMessage(messages.btnUploadAvatar)}
            </UploaderButton>
          </UploaderWrapper>}
      </Wrapper>
    )
  }
}

export default injectIntl(Avatar)
