///<reference path="../../../../node_modules/@types/react-router/index.d.ts"/>
import * as React from 'react'

import { connect } from 'react-redux'
import { setTheme, logout, setShowBillingDialog } from 'common/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import {
  selectTheme,
  selectAuthLevel,
  selectMobileSidebarData,
  selectCredits,
  selectShowBillingDialog
} from 'common/store/selectors'
import { THEMES } from 'common/constants'
import SettingsDropdown from './SettingsDropdown'
import LanguageDropdown from './LanguageDropdown'
import NotificationsDropdown from './Notifications'
import { SupportedLocales } from 'typings/client'
import { changeLocale } from 'store/LanguageProvider/actions'
import { selectLocale } from 'store/LanguageProvider/selectors'
import { RouteComponentProps, withRouter } from 'react-router'
import { clearViewer, getViewer } from 'common/utils/viewer'
import { ITopNavItem } from './index'
import MobileSidebar from './MobileSidebar'
import CreditsBalance from './CreditsBalance'
import { IMobileSidebarData } from '../../store/reducer'
import { isMobile } from '../../utils/screen'
import { getKeycloakLoginUrl } from '../../http/auth'
import UpgradeButton from './UpgradeButton'
import { HideXS } from './styledComponents'
import { COMPLETE_LOGOUT_URL } from 'common/constants'

type MergedProps = IProps &
  IDispatchToProps &
  IStateToProps &
  RouteComponentProps<any>

interface IProps {
  topNavItems: ITopNavItem[]
  mobile: boolean
}

interface IStateToProps {
  credits: number
  theme: string
  authLevel: number
  locale: SupportedLocales
  mobileSidebarData: IMobileSidebarData
  showBillingDialog: boolean
}

interface IDispatchToProps {
  setTheme: typeof setTheme
  setShowBillingDialog: typeof setShowBillingDialog
  logout: typeof logout
  changeLocale: (locale: string) => void
}

interface IStates {}

const mapStateToProps = createStructuredSelector({
  credits: selectCredits(),
  showBillingDialog: selectShowBillingDialog(),
  theme: selectTheme(),
  authLevel: selectAuthLevel(),
  locale: selectLocale(),
  mobileSidebarData: selectMobileSidebarData()
})
const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setTheme,
      setShowBillingDialog,
      logout,
      changeLocale
    },
    dispatch
  )
})

class NavbarRight extends React.Component<MergedProps, IStates> {
  handleThemeClick = () => {
    let nextTheme =
      this.props.theme === THEMES.dark ? THEMES.light : THEMES.dark
    this.props.setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  handleSettingsClick = () => {
    this.props.history.push('/settings')
  }

  handleLocaleClick = (locale: SupportedLocales) => {
    this.props.changeLocale(locale)
  }

  handleLogoutClick = () => {
    this.props.logout(null)
    clearViewer()
    window.location.assign(COMPLETE_LOGOUT_URL)
  }

  handleLoginClick = () => {
    window.location.assign(getKeycloakLoginUrl(window.location.href))
  }

  openBillingDialog = () => {
    this.props.setShowBillingDialog(true)
  }

  renderDesktop = () => {
    const { theme, credits, authLevel, locale } = this.props
    const themeStr = theme === THEMES.dark ? 'pt-dark' : 'pt-light'
    return (
      <div className="pt-navbar-group pt-align-right">
        <CreditsBalance credits={credits} onClick={this.openBillingDialog} />
        <span className="pt-navbar-divider" />
        <button
          className={`pt-button pt-minimal ${theme === THEMES.dark
            ? 'pt-icon-flash'
            : 'pt-icon-moon'}`}
          onClick={this.handleThemeClick}
        />
        <NotificationsDropdown theme={themeStr} />
        <LanguageDropdown
          locale={locale}
          onClick={this.handleLocaleClick}
          theme={themeStr}
        />
        <SettingsDropdown
          isDemoUser={getViewer().is_demo}
          onSettingsClick={this.handleSettingsClick}
          onLogoutClick={this.handleLogoutClick}
          onLoginClick={this.handleLoginClick}
        />
      </div>
    )
  }

  renderMobile = () => {
    const { theme, credits, authLevel, locale } = this.props
    const themeStr = theme === THEMES.dark ? 'pt-dark' : 'pt-light'
    return (
      <div className="pt-navbar-group pt-align-right">
        <CreditsBalance credits={credits} onClick={this.openBillingDialog} />
        <button
          className={`pt-button pt-minimal ${theme === THEMES.dark
            ? 'pt-icon-flash'
            : 'pt-icon-moon'}`}
          onClick={this.handleThemeClick}
        />

        <NotificationsDropdown theme={themeStr} />
        <LanguageDropdown
          locale={locale}
          onClick={this.handleLocaleClick}
          theme={themeStr}
        />
        <HideXS>
          <SettingsDropdown
            isDemoUser={getViewer().is_demo}
            onSettingsClick={this.handleSettingsClick}
            onLogoutClick={this.handleLogoutClick}
            onLoginClick={this.handleLoginClick}
          />
        </HideXS>
        <MobileSidebar
          pathExt={this.props.mobileSidebarData.pathExt}
          basePath={this.props.mobileSidebarData.basePath}
          topNavItems={this.props.topNavItems}
          mobileSidebarItems={this.props.mobileSidebarData.items}
        />
      </div>
    )
  }

  render() {
    if (!this.props.mobile) {
      return this.renderDesktop()
    }
    return this.renderMobile()
  }
}

export default connect<IStateToProps, IDispatchToProps, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarRight))
