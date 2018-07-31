///<reference path="../../../../node_modules/@types/react-router/index.d.ts"/>
import * as React from 'react'

import { connect } from 'react-redux'
import { setTheme, logout } from 'common/store/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import {
  selectTheme,
  selectAuthLevel,
  selectMobileSidebarData
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
import { IMobileSidebarData } from '../../store/reducer'
import { isMobile } from '../../utils/screen'
import { getKeycloakLoginUrl } from '../../http/auth'
import UpgradeButton from './UpgradeButton'

type MergedProps = IProps &
  IDispatchToProps &
  IStateToProps &
  RouteComponentProps<any>

interface IProps {
  topNavItems: ITopNavItem[]
  mobile: boolean
}

interface IStateToProps {
  theme: string
  authLevel: number
  locale: SupportedLocales
  mobileSidebarData: IMobileSidebarData
}

interface IDispatchToProps {
  setTheme: typeof setTheme
  logout: typeof logout
  changeLocale: (locale: string) => void
}

interface IStates {}

const mapStateToProps = createStructuredSelector({
  theme: selectTheme(),
  authLevel: selectAuthLevel(),
  locale: selectLocale(),
  mobileSidebarData: selectMobileSidebarData()
})
const mapDispatchToProps = (dispatch: Dispatch<string>) => ({
  ...bindActionCreators(
    {
      setTheme,
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
    // this.props.logout(null)
    clearViewer()
    this.props.history.push('/')
  }

  handleLoginClick = () => {
    window.location.assign(getKeycloakLoginUrl(window.location.href))
  }

  renderDesktop = () => {
    const { theme, authLevel, locale } = this.props
    const themeStr = theme === THEMES.dark ? 'pt-dark' : 'pt-light'
    return (
      <div className="pt-navbar-group pt-align-right">
        <UpgradeButton onUpgradeClick={() => console.log('upgrade')} />
        <button
          className={`pt-button pt-minimal ${theme === THEMES.dark
            ? 'pt-icon-flash'
            : 'pt-icon-moon'}`}
          onClick={this.handleThemeClick}
        />
        <span className="pt-navbar-divider" />
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
    const { theme, authLevel, locale } = this.props
    const themeStr = theme === THEMES.dark ? 'pt-dark' : 'pt-light'
    return (
      <div className="pt-navbar-group pt-align-right">
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
    console.log(this.props)
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
