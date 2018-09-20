import { getPathLocale } from './cookies'

export const getPathLocaleFromURL = () => {
  if (window.location.pathname.split('/').length < 1) {
    return ''
  }
  const firstPart = window.location.pathname.split('/')[1]
  if (firstPart) {
    const baseSplit = firstPart.split('-', 3)
    if (baseSplit.length < 2) {
      return ''
    }
    if (baseSplit.length === 2) {
      return baseSplit[1]
    }
    if (baseSplit.length === 3) {
      return `${baseSplit[1]}-${baseSplit[2]}`
    }
  }
  return ''
}

export const getCurrentPathWithLocale = (l: string) => {
  let pathSplit = window.location.pathname.split('/')
  if (pathSplit.length < 2) {
    return `/learn-${l}`
  }
  if (pathSplit[1].startsWith('learn')) {
    pathSplit[1] = `learn-${l}`
  } else {
    pathSplit[0] = `learn-${l}`
    pathSplit = ['', ...pathSplit]
  }
  return `${pathSplit.join('/')}${window.location.search}`
}

export const redirectForLocaleIfNecessary = () => {
  if (
    `${window.location.pathname}${window.location.search}` !==
    getCurrentPathWithLocale(getPathLocale())
  ) {
    window.location.href = getCurrentPathWithLocale(getPathLocale())
  }
}
