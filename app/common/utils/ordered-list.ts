export const indexToLetter = (i: number): string => {
  return (
    (i >= 26 ? indexToLetter(((i / 26) >> 0) - 1) : '') +
    'abcdefghijklmnopqrstuvwxyz'[(i % 26) >> 0]
  )
}
