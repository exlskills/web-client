export const removeTrailingSlash = (path: string) => path.replace(/\/+$/, '')

export const replacePathSuffix = (basePath: string, suffix: string) => {
  basePath = removeTrailingSlash(basePath)
  if (suffix && suffix.startsWith('/')) return `${basePath}${suffix}`
  if (suffix) return `${basePath}/${suffix}`
  return basePath
}

export const getFirstPath = (path: string) =>
  path.split('/').filter(section => !!section)[0] || ''
