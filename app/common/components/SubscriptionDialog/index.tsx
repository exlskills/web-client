import { ConfirmDialog } from 'common/components/loaders'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as React from 'react'
import {
  Wrapper,
  DialogContent,
  Header,
  SubHeaderText,
  PricingFlexWrapper,
  PricingCol,
  PricingTopGradient,
  PricingPreHeader,
  PricingHeader,
  PricingDescription,
  PricingFeature,
  PricingColInner,
  PricingCheckedIcon,
  PricingExcludedIcon
} from './styledComponents'
//import * as SplitPane from 'react-split-pane'
import messages from './messages'
//import { Prompt } from 'react-router'
//import { Icon } from "@blueprintjs/core";
interface IProps {
  isOpen: boolean
}

interface IStates {
  showConfirmDialog: boolean
}
type MergedProps = IProps & InjectedIntlProps

// TODO Finish the subscription dialog, in a rush right now so can't complete it, redirecting to markeitng site !
class SubscriptionDialog extends React.PureComponent<MergedProps, IStates> {
  state: IStates = {
    showConfirmDialog: false
  }

  plans = {
    essentials: {
      level: 3000,
      annual: {
        planCode: 'EXLskills-008',
        usd: 8
      },
      monthly: {
        planCode: 'EXLskills-009',
        usd: 80
      }
    },
    professional: {
      level: 5000,
      annual: {
        planCode: 'EXLskills-010',
        usd: 30
      },
      monthly: {
        planCode: 'EXLskills-011',
        usd: 300
      }
    },
    business: {
      level: 7000,
      annual: {
        planCode: 'EXLskills-012',
        usd: 200
      },
      monthly: {
        planCode: 'EXLskills-015',
        usd: 2000
      }
    }
  }

  handleClose = () => {
    // TODO something?
  }

  handleCloseConfirm = () => {
    // TODO something?
  }

  handleCloseCancel = () => {
    this.setState({ showConfirmDialog: false })
  }
  componentDidMount() {
    //  alert("dasdas")
    //document.getElementsByClassName("pt-dialog-close-button pt-icon-small-cross")[0].innerHTML = "<span>Finsh Quiz</span>"
  }

  componentWillUnmount() {
    window.onbeforeunload = null
  }

  render() {
    const { isOpen } = this.props
    const { formatMessage } = this.props.intl

    let promptMessage = {
      title: formatMessage(messages.txtConfirmLeaveQuizTitle),
      text: formatMessage(messages.txtConfirmLeaveQuizMessage),
      submit: formatMessage(messages.btnConfirmLeaveQuizYes),
      cancel: formatMessage(messages.btnConfirmLeaveQuizNo)
    }
    return (
      <Wrapper
        className={localStorage.getItem('theme')}
        isOpen={isOpen}
        title={
          <Header>
            {'Title'}
            <SubHeaderText>
              {'headline'}
            </SubHeaderText>
          </Header>
        }
        onClose={this.handleCloseConfirm}
        canOutsideClickClose={true}
      >
        <DialogContent>
          <PricingFlexWrapper>
            <PricingCol>
              <PricingTopGradient
                backgroundGradient={
                  'linear-gradient(90deg, #0F61DF 0%, #4362CE 50%)'
                }
              />
              <PricingColInner>
                <PricingPreHeader>EXLskills</PricingPreHeader>
                <PricingHeader>Free</PricingHeader>
                <PricingDescription>Description</PricingDescription>
                <PricingFeature>
                  <PricingCheckedIcon icon={'tick'} />
                  <span>Feature</span>
                </PricingFeature>
                <PricingFeature>
                  <PricingExcludedIcon icon={'cross'} />
                  <span>Feature</span>
                </PricingFeature>
              </PricingColInner>
            </PricingCol>
          </PricingFlexWrapper>
        </DialogContent>
        <ConfirmDialog
          onSubmit={this.handleClose}
          onCancel={this.handleCloseCancel}
          showDialog={this.state.showConfirmDialog}
          swapButtons={true}
          messageText={promptMessage}
        />
        {/*<Prompt*/}
        {/*message={JSON.stringify(promptMessage)}*/}
        {/*when={!!this.props.state.examQuestion}*/}
        {/*/>*/}
      </Wrapper>
    )
  }
}
export default injectIntl(SubscriptionDialog)
