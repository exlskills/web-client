import { CenterContainer } from 'common/components/styledComponents'
import styled from 'styled-components'
import { Dialog, Icon, IDialogProps } from "@blueprintjs/core";
import { Flex } from 'grid-styled'

export const Wrapper = styled(Dialog)`
  max-width: 1300px;
  width: 85%;
  min-height: 650px;
  padding-bottom: 0;
`

export const DialogContent = styled.div.attrs({
  className: 'pt-dialog-body'
})`
  position: relative;
  margin: 0;
  height: 100%;
`

export const Header = styled(Flex).attrs({
  column: true,
  justify: 'space-between',
  align: 'flex-start'
})`
  margin-top: 0.4rem;
`
export const ConceptMesssage = styled.div`
  position: relative;
  font-size: 1em;
  padding: 20px;
`

export const SubHeaderText = styled.div.attrs({
  className: 'pt-text-muted'
})`
  margin-top: 0.3rem;
  font-weight: 400;
  font-size: 0.8rem;
  margin-bottom: 8px;
`

export const ResultWrapper = CenterContainer.extend`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 6rem;
  height: auto;
  h3 {
    color: #333;
    margin-bottom: 15px;
  }
  .pt-icon {
    margin-right: 10px;
  }
`

export const PricingFlexWrapper = styled(Flex)`
  margin: 20px;
`

export const PricingCol = styled.div`
  width: 25%;
`

export const PricingColInner = styled.div`
  background-color: rgb(250, 250, 250);
  min-width: 200px;
  height: 400px;
  padding: 20px;
`

export const PricingTopGradient = styled.div.attrs<{ backgroundGradient?: string }>({})`
  background: ${props => {return props.backgroundGradient}};
  width: 100%;
  height: 1.25em;
`

export const PricingPreHeader = styled.div`
  font-size: 16px;
  font-weight: 100;
  line-height: 18px;
`

export const PricingHeader = styled.div`
  font-size: 46px;
  font-weight: 700;
  line-height: 52px;
  margin-left: -2px;
  margin-bottom: 6px;
`

export const PricingDescription = styled.div.attrs({
  className: 'pt-text-muted'
})`
  margin-bottom: 15px;
`

export const PricingFeature = styled.div.attrs({
  className: 'pt-text-muted'
})`
  
`

export const PricingExcludedIcon = styled(Icon).attrs({
})`
  color: red;
  margin-right: 4px;
`

export const PricingCheckedIcon = styled(Icon).attrs({
})`
  color: green;
  margin-right: 4px;
`

export const PricingTopCard = styled.div`

`
