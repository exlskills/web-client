import * as React from 'react'
import { injectIntl } from 'react-intl';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import messages from "./messages";
import { ERASE_MY_DATA_FORM_URL, PRIVACY_POLICY_AND_TOS_URL } from "../../../../common/constants";
import { Icon } from "@blueprintjs/core";

interface IProps {}

class SettingsPrivacy extends React.Component<IProps & InjectedIntlProps, {}> {
  render() {
    const { formatMessage } = this.props.intl

    return (<div>
      <h3>{formatMessage(messages.pageTitle)}</h3>
      <br />
      <p>{formatMessage(messages.headline)}</p>
      <p>{formatMessage(messages.privacyPolicyAndTOSBeforeLink)} <a target={"_blank"} rel={"noopener"} href={PRIVACY_POLICY_AND_TOS_URL}>{formatMessage(messages.privacyPolicyAndTOSLinkText)} <Icon iconSize={"inherit"} iconName={"share"}/></a></p>
      <p>{formatMessage(messages.eraseMyDataBeforeLink)} <a target={"_blank"} rel={"noopener"} href={ERASE_MY_DATA_FORM_URL}>{formatMessage(messages.eraseMyDataFormLink)} <Icon iconSize={"inherit"} iconName={"share"}/></a></p>
      <small>{formatMessage(messages.remarks)}</small>
    </div>)
  }
}

export default injectIntl(SettingsPrivacy)
