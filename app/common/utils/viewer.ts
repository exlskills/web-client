import { getUserDataCookie } from './cookies'

export const setViewer = (user: any) => {
  if (user) {
    console.log('have user')
    if (!user.user_id) {
      console.log('dont have id')
      user = JSON.parse(
        window.atob(getUserDataCookie().replace('-', '+').replace('_', '/'))
      )
      console.log('now got', user)
    }
    let viewer = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      first_name: user.full_name.split(' ')[0],
      locale: user.locale || 'en',
      avatar_url: user.avatar_url || 'https://goo.gl/D9V985',
      has_completed_first_tutorial: user.has_completed_first_tutorial,
      is_verified: user.is_verified,
      is_demo: user.is_demo,
      subscription: user.subscription
    }
    localStorage.setItem('viewer', JSON.stringify(viewer))
  } else {
    if (!getUserDataCookie()) {
      return
    }
    user = JSON.parse(
      window.atob(getUserDataCookie().replace('-', '+').replace('_', '/'))
    )

    let viewer = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      first_name: user.full_name.split(' ')[0],
      locale: user.locale || 'en',
      avatar_url: user.avatar_url,
      has_completed_first_tutorial: user.has_completed_first_tutorial,
      is_demo: user.is_demo,
      is_verified: user.is_verified,
      subscription: user.subscription
    }
    localStorage.setItem('viewer', JSON.stringify(viewer))
  }
}

export const clearViewer = () => {
  localStorage.removeItem('viewer')
}

export const getViewer = (field: string | null = null) => {
  if (!localStorage.getItem('viewer')) {
    setViewer(null)
  }
  let viewer: any = localStorage.getItem('viewer') || '{}'
  viewer = JSON.parse(viewer)
  if (field) {
    return viewer ? viewer[field] : null
  }
  return viewer
}

export const isViewerPremium = () => {
  const subsArr = getViewer('subscription') as [{ level: number }]
  if (!subsArr) {
    return false
  }
  let hasPremium = false
  subsArr.forEach(item => {
    if (item.level > 999) {
      hasPremium = true
    }
  })
  return hasPremium
}
