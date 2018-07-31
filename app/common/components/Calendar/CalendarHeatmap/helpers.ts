// returns a new date shifted a certain number of days (can be negative)
export function shiftDate(date: Date, numDays: number): Date {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

export function getBeginningTimeForDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// obj can be a parseable string, a millisecond timestamp, or a Date object
export function convertToDate(obj: string | number | Date): Date {
  return obj instanceof Date ? obj : new Date(<string>obj)
}

// TODO: replace with moment.js
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const day = `0${date.getDate()}`.slice(-2)
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const year = `${date.getFullYear()}`

  return `${year}-${month}-${day}`
}
