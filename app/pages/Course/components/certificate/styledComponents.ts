import styled from 'styled-components'
import { MenuDivider } from '@blueprintjs/core'
import { mobileBPCSS, mobileBreakPoint } from '../../../../common/utils/screen'

export const ContentCard = styled.div.attrs({
  className: 'pt-card'
})`
  width: 100%;
`

export const ContentHeadingWrapper = styled.div.attrs({})`
  display: flex;
  @media only screen and (max-width: ${mobileBPCSS}) {
      flex-direction: column;
  }
  padding: 22px;
  background: rgb(238, 240, 245);
  .pt-dark & {
    background: rgb(47, 52, 62);
  }
`

export const ContentImgWrapper = styled.div`
  width: 200px;
  padding-right: 20px;
  @media only screen and (max-width: ${mobileBPCSS}) {
    width: 100%;
    margin-bottom: 20px;
    padding-right: 0;
  }
`

export const ContentTitleDescWrapper = styled.div`
  width: 600px;
  padding-right: 40px;
  @media only screen and (max-width: ${mobileBPCSS}) {
    width: 100%;
    margin-bottom: 20px;
    padding-right: 0;
  }
`

export const ContentPurchaseWrapper = styled.div`
  width: 200px;
  @media only screen and (max-width: ${mobileBPCSS}) {
    width: 100%;
  }
`

export const DialogDivider = styled(MenuDivider)`
  margin: 16px 0;
`
