import * as React from 'react'
import { BILLING_CONSOLE_URL } from "../../../../common/constants";
import { isViewerPremium } from "../../../../common/utils/viewer";
import { Icon } from "@blueprintjs/core";
import { injectIntl } from 'react-intl';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import messages from "./messages";

interface IProps {}

class SettingsBilling extends React.Component<IProps & InjectedIntlProps, {}> {
  render() {
    const { formatMessage } = this.props.intl

    return (<div>
      <h3>{formatMessage(messages.pageTitle)}</h3>
      <br />
      {isViewerPremium() ? <span>
          <p>{formatMessage(messages.manageYourPrefsBeforeLink)} <a target={"_blank"} rel={"noopener"} href={BILLING_CONSOLE_URL}>{formatMessage(messages.manageYourPrefsLinkText)} <Icon iconSize={"inherit"} iconName={"share"}/></a></p>
          <small>{formatMessage(messages.paymentSystemRemarks)}</small>
        </span> : <p>{formatMessage(messages.upgradeToAccess)}</p>}
    </div>)
  }
}


export default injectIntl(SettingsBilling)
