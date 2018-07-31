require('shelljs/global')

const result = find('app/')
  .filter(file => file.match(/\.tsx?$/) && !file.match(/\.d\.ts$/) )
  .map(file => file.replace(/\.tsx?$/, '.js*'))

rm(result)
