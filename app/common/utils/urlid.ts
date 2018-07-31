import { fromGlobalId, toGlobalId } from './graphql'

const string_to_slug = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  var to = 'aaaaeeeeiiiioooouuuunc------'

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}

export const toUrlId = (text: string, id: string): string => {
  return `${string_to_slug(text)}-${fromGlobalId(id).id}`
}

export function fromUrlId(type: string, urlId: string): string {
  const lastIndexOfDash = urlId.lastIndexOf('-')
  return toGlobalId(type, urlId.substr(lastIndexOfDash + 1))
}

export const SchemaType = {
  User: 'User',
  Course: 'Course',
  CourseUnit: 'CourseUnit',
  UnitSection: 'UnitSection',
  SectionCard: 'SectionCard'
}
