import * as React from 'react'

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

class Avatar extends React.PureComponent<AvatarProps, any> {
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
    return (
      <Wrapper>
        <img
          src={imageUrl}
          width={size}
          height={size}
          style={{ borderRadius: '5%' }}
        />
      </Wrapper>
    )
  }
}

export default Avatar
