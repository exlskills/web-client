export default class RedirectException extends Error {
  location = ''
  constructor(location: string) {
    super('')
    Object.setPrototypeOf(this, RedirectException.prototype)
    this.location = location
  }
}
